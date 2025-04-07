const { ethers } = require("hardhat");
const axios = require("axios");
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Local IPFS configuration
const LOCAL_IPFS_GATEWAY = 'http://localhost:8080/ipfs/';
const IPFS_FALLBACK_GATEWAY = 'https://cloudflare-ipfs.com/ipfs/';

async function getMaticToInrRate() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=inr",
      { timeout: 5000 }
    );
    return response.data["matic-network"].inr;
  } catch (error) {
    console.error("Using fallback rate of ₹55 per MATIC");
    return 55;
  }
}

async function depositToGominiWallet(contract, adopter, amount) {
  console.log(`Depositing ${ethers.formatEther(amount)} MATIC...`);
  const tx = await contract.connect(adopter).depositToGominiWallet({
    value: amount
  });
  await tx.wait();
  console.log("✅ Deposit successful");
}

async function fetchIpfsMetadata(ipfsHash) {
  try {
    // Try local gateway first
    const response = await axios.get(`${LOCAL_IPFS_GATEWAY}${ipfsHash}`, { 
      timeout: 3000 
    });
    return {
      ...response.data,
      gatewayUsed: 'local'
    };
  } catch (localError) {
    console.log('Local IPFS gateway failed, trying fallback...');
    try {
      // Fallback to public gateway
      const response = await axios.get(`${IPFS_FALLBACK_GATEWAY}${ipfsHash}`, {
        timeout: 3000
      });
      return {
        ...response.data,
        gatewayUsed: 'fallback'
      };
    } catch (fallbackError) {
      console.error('Both gateways failed');
      return {
        image: `${LOCAL_IPFS_GATEWAY}${ipfsHash}/image`,
        gatewayUsed: 'generated'
      };
    }
  }
}

async function updateSupabaseStatus(cowId, status, transactionHash) {
  const updateData = {
    status: status,
    updated_at: new Date().toISOString()
  };

  if (transactionHash) {
    updateData.transaction_hash = transactionHash;
  }

  try {
    const { data, error } = await supabase
      .from('cow_registrations')
      .update(updateData)
      .eq('id', cowId);

    if (error) throw error;
    console.log(`✅ Supabase status updated to ${status}`);
    return data;
  } catch (error) {
    console.error('❌ Supabase update error:', error.message);
    throw error;
  }
}

async function approveAdoption(cowId) {
  try {
    console.log('\n=== Starting Adoption Approval ===');
    const contractAddress = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
    const [adopter] = await ethers.getSigners();
    const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);

    // 1. First verify cow exists in Supabase with Pending status
    console.log('🔍 Checking Supabase for pending cow...');
    const { data: cowData, error } = await supabase
      .from('cow_registrations')
      .select('*')
      .eq('id', cowId)
      .eq('status', 'Pending')
      .single();

    if (error || !cowData) {
      throw new Error("Cow not found in Supabase or not in Pending status");
    }

    // 2. Get on-chain cow details
    const cow = await contract.getCowDetails(cowId);
    const maticToInr = await getMaticToInrRate();
    const priceInMatic = parseFloat(ethers.formatEther(cow.price));
    const priceInInr = (priceInMatic * maticToInr).toFixed(2);

    console.log(`
    🐄 Cow #${cowId}
    Breed: ${cow.breed}
    Health: ${cow.healthStatus}
    Price: ${priceInMatic} MATIC (₹${priceInInr})`);

    // 3. Check balance
    let balance = await contract.getGominiBalance(adopter.address);
    console.log(`   Balance: ${ethers.formatEther(balance)} MATIC`);

    // 4. Handle deposit if needed
    if (balance < cow.price) {
      const shortBy = cow.price - balance;
      console.log(`   ❗ Need ${ethers.formatEther(shortBy)} more MATIC`);
      await depositToGominiWallet(contract, adopter, shortBy);
      balance = await contract.getGominiBalance(adopter.address);
      console.log(`   ✅ New Balance: ${ethers.formatEther(balance)} MATIC`);
    }

    // 5. First update Supabase status to "Approved"
    await updateSupabaseStatus(cowId, "Approved");

    // 6. Approve adoption on blockchain (will mint NFT)
    console.log('\n✍️ Approving on blockchain...');
    const tx = await contract.connect(adopter).approveAdoption(cowId);
    const receipt = await tx.wait();
    console.log(`   ✅ Tx Hash: ${receipt.hash}`);

    // 7. Get IPFS data
    console.log('\n📦 Fetching IPFS metadata...');
    const metadata = await fetchIpfsMetadata(cow.ipfsHash);
    const ipfsImage = metadata?.image?.replace('ipfs://', '') || cow.ipfsHash;
    console.log(`   Used gateway: ${metadata.gatewayUsed}`);

    // 8. Final update to Supabase with Registered status and transaction hash
    await updateSupabaseStatus(cowId, "Registered", receipt.hash);

    // 9. Final output
    console.log(`
    🎉 Adoption Approved and NFT Minted!
    ==================================
    IPFS Links:
    Image: ${LOCAL_IPFS_GATEWAY}${ipfsImage}
    Metadata: ${LOCAL_IPFS_GATEWAY}${cow.ipfsHash}
    
    Transaction:
    ${receipt.hash}
    `);

    return {
      success: true,
      cowId,
      transactionHash: receipt.hash
    };
  } catch (error) {
    console.error('\n❌ Approval Failed:', error.message);
    
    // If we failed after updating to Approved but before Registered,
    // we should revert the status back to Pending
    try {
      await updateSupabaseStatus(cowId, "Pending");
      console.log('⚠️ Reverted status back to Pending due to failure');
    } catch (revertError) {
      console.error('Failed to revert status:', revertError.message);
    }
    
    throw error;
  }
}

// Execute
const cowId = process.argv[2] || 10;

approveAdoption(cowId)
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });

module.exports = { approveAdoption };