const { ethers } = require("hardhat");
const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Initialize IPFS client
const ipfs = create({
  host: 'localhost',
  port: 5001,
  protocol: 'http'
});

async function uploadToIPFS(filePath, cowDetails) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const imageResult = await ipfs.add({
      path: path.basename(filePath),
      content: fileContent
    });

    const metadata = {
      name: `Cow ${cowDetails.cowId}`,
      description: "Registered livestock information",
      image: `ipfs://${imageResult.cid}`,
      attributes: [
        { trait_type: "Breed", value: cowDetails.breed },
        { trait_type: "Birth Date", value: cowDetails.birthDate },
        { trait_type: "Health Status", value: cowDetails.healthStatus }
      ]
    };

    const metadataResult = await ipfs.add({
      path: `${cowDetails.cowId}_metadata.json`,
      content: JSON.stringify(metadata)
    });

    return {
      imageCID: imageResult.cid.toString(),
      metadataCID: metadataResult.cid.toString(),
      imageURL: `https://ipfs.io/ipfs/${imageResult.cid}`,
      metadataURL: `https://ipfs.io/ipfs/${metadataResult.cid}`
      
    };
  } catch (error) {
    console.error('IPFS upload failed:', error);
    throw error;
  }
}

function getStatusName(statusCode) {
  const statusMap = ["Pending", "Approved", "Rejected", "Registered"];
  return statusMap[statusCode] || "Unknown";
}

async function main() {
  try {
    const contractAddress = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
    
    // 1. Get signers - ensure you have at least 2 accounts in hardhat config
    const signers = await ethers.getSigners();
    const farmer = signers[0];
    const adopter = signers[1] || farmer; // Fallback to farmer if no second account
    
    console.log(`Farmer: ${farmer.address}`);
    console.log(`Adopter: ${adopter.address}`);

    const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);

    // 2. Prepare cow data
    const cowData = {
      cowId: "COW-" + Date.now(),
      breed: "Holstein",
      birthDate: "2022-01-01",
      healthStatus: "Healthy",
      farmerTransactionId: "TX-" + Date.now(),
      price: ethers.parseEther("0.4")
    };

    // 3. Upload to IPFS
    console.log("Uploading cow data to IPFS...");
    const ipfsResult = await uploadToIPFS("./cow.jpg", cowData);
    console.log("Image uploaded:", ipfsResult.imageURL);

    // 4. Request adoption
    console.log("Requesting adoption...");
    const tx = await contract.connect(farmer).requestAdoption(
      cowData.breed,
      Math.floor(new Date(cowData.birthDate)/1000),
      cowData.healthStatus,
      ipfsResult.metadataCID,
      cowData.farmerTransactionId,
      cowData.price,
      adopter.address
    );
    const receipt = await tx.wait();

    // 5. Get cowId from event
    // const event = receipt.events?.find(e => e.event === "AdoptionRequested");
    // const cowId = event?.args?.cowId?.toNumber();
    cowId = 1;
    console.log("cowId ", cowId);
    
    if (!cowId) throw new Error("Could not get cow ID from transaction");

    console.log(`
      🐄 Adoption Requested!
      --------------------------------
      Cow ID: ${cowId}
      Farmer: ${farmer.address}
      Adopter: ${adopter.address}
      Status: Pending Approval
      
      📌 IPFS Links:
      Metadata: ${ipfsResult.metadataURL}
      Image: ${ipfsResult.imageURL}
      
      🔗 Transaction: https://mumbai.polygonscan.com/tx/${receipt.hash}
      
      Next Step: Adopter should run:
      npx hardhat run scripts/approveAdoption.js --network polygonMumbai
    `);

    // 6. Save request details
    const requestInfo = {
      cowId,
      farmer: farmer.address,
      adopter: adopter.address,
      ipfs: ipfsResult,
      transactionHash: receipt.hash
    };
    fs.writeFileSync(`adoption-request-${cowId}.json`, JSON.stringify(requestInfo, null, 2));

  } catch (error) {
    console.error("Adoption request failed:", error.message);
    process.exit(1);
  }
}

main().then(() => process.exit(0));