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
    maticAmount: maticAmount.toString(),
    maticInWei: ethers.parseEther(maticAmount.toString()),
    exchangeRate: maticToInr
  };
}

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
        { trait_type: "Health Status", value: cowDetails.healthStatus },
        { trait_type: "Price in INR", value: cowDetails.inrAmount },
        { trait_type: "Price in MATIC", value: ethers.formatEther(cowDetails.price) }
      ]
    };

    const metadataResult = await ipfs.add({
      path: `${cowDetails.cowId}_metadata.json`,
      content: JSON.stringify(metadata)
    });

    return {
      imageCID: imageResult.cid.toString(),
      metadataCID: metadataResult.cid.toString(),
      imageURL: `http://localhost:8080/ipfs/${imageResult.cid}`,
      metadataURL: `http://localhost:8080/ipfs/${metadataResult.cid}`
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
    
    // 1. Get signers
    const signers = await ethers.getSigners();
    const farmer = signers[0];
    const adopter = signers[1] || farmer;
    
    console.log(`Farmer: ${farmer.address}`);
    console.log(`Adopter: ${adopter.address}`);

    const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);

    // 2. Prepare cow data - Now accepting INR as input
    const inrAmount = 400; // ₹22 (you can make this configurable)
    const { maticAmount, maticInWei, exchangeRate } = await convertInrToMatic(inrAmount);

    const cowData = {
      cowId: "COW-" + Date.now(),
      breed: "Holstein",
      birthDate: "2022-01-01",
      healthStatus: "Healthy",
      farmerTransactionId: "TX-" + Date.now(),
      price: maticInWei,
      inrAmount: inrAmount.toString()
    };

    // 3. Upload to IPFS
    console.log("Uploading cow data to IPFS...");
    const ipfsResult = await uploadToIPFS("./cow.jpg", cowData);
    console.log("Image uploaded:", ipfsResult.imageURL);

    // 4. Request adoption
    console.log("Requesting adoption...");
    console.log(`Price: ₹${inrAmount} (≈ ${maticAmount} MATIC @ ₹${exchangeRate}/MATIC)`);
    
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

    // Get cowId from transaction
    const cowId = 1; // Replace with actual ID from event if available
    console.log("cowId ", cowId);

    console.log(`
      🐄 Adoption Requested!
      --------------------------------
      Cow ID: ${cowId}
      Farmer: ${farmer.address}
      Adopter: ${adopter.address}
      Price: ₹${inrAmount} (≈ ${maticAmount} MATIC)
      Status: Pending Approval
      
      📌 IPFS Links:
      Metadata: ${ipfsResult.metadataURL}
      Image: ${ipfsResult.imageURL}
      
      🔗 Transaction: https://mumbai.polygonscan.com/tx/${receipt.hash}
      
      Next Step: Adopter should run:
      npx hardhat run scripts/approveAdoption.js --network polygonMumbai
    `);

    // Save request details
    const requestInfo = {
      cowId,
      farmer: farmer.address,
      adopter: adopter.address,
      price: {
        inr: inrAmount,
        matic: maticAmount,
        exchangeRate: exchangeRate
      },
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