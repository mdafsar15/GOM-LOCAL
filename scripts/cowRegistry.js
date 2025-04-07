const { ethers } = require("hardhat");
const { createClient } = require('@supabase/supabase-js');
const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const ipfs = create({
  host: 'localhost',
  port: 5001,
  protocol: 'http'
});

async function uploadToIPFS(filePath, cowData) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const imageResult = await ipfs.add({
      path: path.basename(filePath),
      content: fileContent
    });

    const metadata = {
      name: `Cow ${cowData.breed}`,
      description: "Registered livestock information",
      image: `ipfs://${imageResult.cid}`,
      attributes: [
        { trait_type: "Breed", value: cowData.breed },
        { trait_type: "Birth Date", value: cowData.birthDate },
        { trait_type: "Health Status", value: cowData.healthStatus }
      ]
    };

    const metadataResult = await ipfs.add(JSON.stringify(metadata));
    return {
      metadataCID: metadataResult.cid.toString()
    };
  } catch (error) {
    console.error("IPFS upload failed:", error);
    throw error;
  }
}

async function getCowIdFromReceipt(contract, receipt) {
  try {
    // Try to parse the CowRegistered event first
    const event = receipt.logs.map(log => {
      try {
        return contract.interface.parseLog(log);
      } catch {
        return null;
      }
    }).find(e => e?.name === "CowRegistered");

    if (event) return event.args.cowId.toString();

    // Fallback: Check the contract's nextTokenId
    console.log("Event not found, using fallback method");
    return (await contract._nextTokenId()).toString();
  } catch (error) {
    console.error("Failed to get cowId:", error);
    throw error;
  }
}

async function registerCow() {
  try {
    const contractAddress = "0x1fA02b2d6A771842690194Cf62D91bdd92BfE28d";
    const [farmer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);

    // Prepare cow data
    const cowData = {
      breed: "Noida Desi",
      birthDate: Math.floor(Date.now() / 1000),
      healthStatus: "Healthy",
      farmerTransactionId: `TX-${Date.now()}`,
      price: ethers.parseEther("0.1"),
      adopter: farmer.address
    };

    console.log("Uploading cow data to IPFS...");
    const ipfsResult = await uploadToIPFS("./cow.jpg", cowData);

    console.log("Registering cow on blockchain...");
    const tx = await contract.registerCow(
      cowData.breed,
      cowData.birthDate,
      cowData.healthStatus,
      ipfsResult.metadataCID,
      cowData.farmerTransactionId,
      cowData.price,
      cowData.adopter
    );
    const receipt = await tx.wait();

    console.log("Transaction successful, getting cow ID...");
    const cowId = await getCowIdFromReceipt(contract, receipt);

    console.log("Saving to Supabase...");
    const { error } = await supabase.from('cows').insert([{
      id: cowId,
      breed: cowData.breed,
      health_status: cowData.healthStatus,
      ipfs_hash: ipfsResult.metadataCID,
      farmer_address: farmer.address,
      adopter_address: cowData.adopter,
      price: cowData.price.toString(),
      status: 'Pending',
      created_at: new Date().toISOString()
    }]);

    if (error) throw error;

    console.log(`
    🎉 Cow Registered Successfully!
    =============================
    Cow ID: ${cowId}
    Farmer: ${farmer.address}
    IPFS Metadata: ${ipfsResult.metadataCID}
    Transaction: ${receipt.hash}
    `);
    
    return cowId;
  } catch (error) {
    console.error("\n❌ Registration Failed:", error.message);
    process.exit(1);
  }
}

registerCow();