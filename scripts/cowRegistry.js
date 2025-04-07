const { ethers } = require("hardhat");
const { createClient } = require('@supabase/supabase-js');
const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Local IPFS configuration
const ipfs = create({
  host: 'localhost',
  port: 5001,
  protocol: 'http'
});

// Verify IPFS connection
async function checkIPFSConnection() {
  try {
    const version = await ipfs.version();
    console.log("Connected to IPFS node, version:", version.version);
    return true;
  } catch (error) {
    console.error("Could not connect to IPFS node:", error.message);
    return false;
  }
}

async function getMaticToInrRate() {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=inr");
    return response.data["matic-network"].inr;
  } catch (error) {
    console.error("Failed to fetch MATIC price, using fallback rate");
    return 55; // Fallback rate (1 MATIC = ₹55)
  }
}

async function convertInrToMatic(inrAmount) {
  const maticToInr = await getMaticToInrRate();
  const maticAmount = inrAmount / maticToInr;
  return {
    maticAmount: maticAmount,
    maticInWei: ethers.parseEther(maticAmount.toString()),
    exchangeRate: maticToInr
  };
}

async function uploadToIPFS(filePath, cowData) {
  try {
    // Verify IPFS connection first
    if (!await checkIPFSConnection()) {
      throw new Error("IPFS node not available");
    }

    console.log("Uploading image to IPFS...");
    const fileContent = fs.readFileSync(filePath);
    const imageResult = await ipfs.add(fileContent);
    const imageCID = imageResult.cid.toString();
    console.log("Image uploaded to IPFS with CID:", imageCID);

    console.log("Creating and uploading metadata...");
    const metadata = {
      name: `Cow ${cowData.breed}`,
      description: "Registered livestock information",
      image: `ipfs://${imageCID}`,
      attributes: [
        { trait_type: "Breed", value: cowData.breed },
        { trait_type: "Birth Date", value: new Date(cowData.birthDate * 1000).toISOString() },
        { trait_type: "Health Status", value: cowData.healthStatus }
      ]
    };

    const metadataResult = await ipfs.add(JSON.stringify(metadata));
    const metadataCID = metadataResult.cid.toString();
    console.log("Metadata uploaded to IPFS with CID:", metadataCID);

    return {
      imageCID,
      metadataCID
    };
  } catch (error) {
    console.error("IPFS upload failed:", error.message);
    throw error;
  }
}

async function registerCow() {
  try {
    // Verify IPFS node is running
    if (!await checkIPFSConnection()) {
      throw new Error("Please ensure your local IPFS node is running");
    }

    const contractAddress = "0x21dF544947ba3E8b3c32561399E88B52Dc8b2823";
    const [farmer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);

    const inrAmount = 100; // ₹100
    const { maticAmount, maticInWei, exchangeRate } = await convertInrToMatic(inrAmount);

    // Prepare cow data
    const cowData = {
      breed: "Noida Desi",
      birthDate: Math.floor(Date.now() / 1000),
      healthStatus: "Healthy",
      farmerTransactionId: `TX-${Date.now()}`,
      price: maticInWei,
      adopter: farmer.address,
      inrAmount: inrAmount,
      maticAmount: maticAmount,
      exchangeRate: exchangeRate
    };

    console.log("\n=== Price Conversion ===");
    console.log(`INR Amount: ₹${inrAmount}`);
    console.log(`Exchange Rate: ₹${exchangeRate}/MATIC`);
    console.log(`MATIC Amount: ${maticAmount}`);
    console.log(`MATIC in Wei: ${maticInWei.toString()}`);

    console.log("\n=== Starting Cow Registration ===");
    console.log("1. Uploading cow data to IPFS...");
    const ipfsResult = await uploadToIPFS("./cow.jpg", cowData);

    console.log("\n2. Registering cow on blockchain...");
    const tx = await contract.registerCow(
      cowData.breed,
      cowData.birthDate,
      cowData.healthStatus,
      ipfsResult.metadataCID,
      ipfsResult.imageCID,
      cowData.farmerTransactionId,
      cowData.price,
      cowData.adopter
    );
    const receipt = await tx.wait();

    console.log("\n3. Parsing transaction events...");
    const event = receipt.logs.find(log => {
      try {
        const parsed = contract.interface.parseLog(log);
        return parsed && parsed.name === "AdoptionRequested";
      } catch {
        return false;
      }
    });

    if (!event) throw new Error("Could not find AdoptionRequested event");

    const cowId = event.args.cowId.toString();
    console.log("Cow ID from blockchain:", cowId);

    console.log("\n4. Saving to Supabase...");
    const { data, error } = await supabase
      .from('cows')
      .insert({
        cow_id: cowId,
        breed: cowData.breed,
        birth_date: new Date(cowData.birthDate * 1000).toISOString(),
        health_status: cowData.healthStatus,
        ipfs_hash_metadata: ipfsResult.metadataCID,
        ipfs_images: ipfsResult.imageCID,
        farmer_address: farmer.address,
        adopter_address: cowData.adopter,
        farmer_transaction_id: cowData.farmerTransactionId,
        price: cowData.inrAmount.toString(), // Only storing INR amount as text
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select();

    if (error) throw error;

    console.log(`
    🎉 Cow Registered Successfully!
    =============================
    Cow ID: ${cowId}
    Farmer: ${farmer.address}
    Price: ₹${cowData.inrAmount} (${ethers.formatEther(cowData.price)} MATIC)
    IPFS Metadata: ipfs://${ipfsResult.metadataCID}
    IPFS Image: ipfs://${ipfsResult.imageCID}
    Transaction: https://mumbai.polygonscan.com/tx/${receipt.hash}
    `);
    
    return cowId;
  } catch (error) {
    console.error("\n❌ Registration Failed:", error.message);
    if (error.response) {
      console.error("Error details:", error.response.data);
    }
    process.exit(1);
  }
}

// Run the registration
registerCow();