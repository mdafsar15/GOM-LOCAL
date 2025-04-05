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

async function storeCowInSupabase(cowData) {
  const payload = {
    id: cowData.id,
    breed: cowData.breed,
    health_status: cowData.healthStatus,
    ipfs_image: cowData.ipfsImage,
    ipfs_metadata: cowData.ipfsMetadata,
    price_inr: cowData.priceInr,
    price_matic: cowData.priceMatic,
    status: cowData.status,
    farmer_address: cowData.farmerAddress,
    adopter_address: cowData.adopterAddress,
    transaction_hash: cowData.transactionHash,
    image_url: `${LOCAL_IPFS_GATEWAY}${cowData.ipfsImage}`,
    metadata_url: `${LOCAL_IPFS_GATEWAY}${cowData.ipfsMetadata}`
  };

  try {
    const { data, error } = await supabase
      .from('cow_registrations')
      .upsert(payload, {
        onConflict: 'id'
      });

    if (error) throw error;
    console.log('✅ Data stored in Supabase');
    return data;
  } catch (error) {
    console.error('❌ Supabase Error:', error.message);
    throw error;
  }
}

async function approveAdoption(cowId) {
  try {
    console.log('\n=== Starting Adoption Approval ===');
    const contractAddress = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
    const [adopter] = await ethers.getSigners();
    const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);

    // 1. Get cow details
    const cow = await contract.getCowDetails(cowId);
    const maticToInr = await getMaticToInrRate();
    const priceInMatic = parseFloat(ethers.formatEther(cow.price));
    const priceInInr = (priceInMatic * maticToInr).toFixed(2);

    console.log(`
    🐄 Cow #${cowId}
    Breed: ${cow.breed}
    Health: ${cow.healthStatus}
    Price: ${priceInMatic} MATIC (₹${priceInInr})`);

    // 2. Check balance
    let balance = await contract.getGominiBalance(adopter.address);
    console.log(`   Balance: ${ethers.formatEther(balance)} MATIC`);

    // 3. Handle deposit if needed
    if (balance < cow.price) {
      const shortBy = cow.price - balance;
      console.log(`   ❗ Need ${ethers.formatEther(shortBy)} more MATIC`);
      await depositToGominiWallet(contract, adopter, shortBy);
      balance = await contract.getGominiBalance(adopter.address);
      console.log(`   ✅ New Balance: ${ethers.formatEther(balance)} MATIC`);
    }

    // 4. Approve adoption
    console.log('\n✍️ Approving on blockchain...');
    const tx = await contract.connect(adopter).approveAdoption(cowId);
    const receipt = await tx.wait();
    console.log(`   ✅ Tx Hash: ${receipt.hash}`);

    // 5. Get IPFS data
    console.log('\n📦 Fetching IPFS metadata...');
    const metadata = await fetchIpfsMetadata(cow.ipfsHash);
    const ipfsImage = metadata?.image?.replace('ipfs://', '') || cow.ipfsHash;
    console.log(`   Used gateway: ${metadata.gatewayUsed}`);

    // 6. Prepare data for Supabase
    const cowData = {
      id: cowId,
      breed: cow.breed,
      healthStatus: cow.healthStatus,
      ipfsImage: ipfsImage,
      ipfsMetadata: cow.ipfsHash,
      priceInr: priceInInr,
      priceMatic: priceInMatic,
      status: "Registered",
      farmerAddress: cow.farmerAddress,
      adopterAddress: cow.adopterAddress,
      transactionHash: receipt.hash
    };

    // 7. Store in Supabase
    console.log('\n💾 Saving to database...');
    await storeCowInSupabase(cowData);

    // 8. Final output
    console.log(`
    🎉 Adoption Approved!
    ====================
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