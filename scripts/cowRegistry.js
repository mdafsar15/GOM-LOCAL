// const { ethers } = require("hardhat");
// const { uploadToIPFS } = require("./uploadToIPFS");
// const fs = require("fs");

// async function main() {
//   // 1. Connect to deployed contract
//   const contractAddress = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE"; // Your contract address
//   const FarmerCowRegistry = await ethers.getContractFactory("FarmerCowRegistry");
//   const contract = await FarmerCowRegistry.attach(contractAddress);
  
//   // 2. Prepare cow data
//   const cowData = {
//     breed: "Gomini",
//     birthDate: "2022-01-01", // Will convert to timestamp
//     healthStatus: "Healthy",
//     farmerTransactionId: "TX-001",
//     price: ethers.parseEther("1000") // 0.05 MATIC
//   };

//   // 3. Upload to IPFS
//   console.log("Uploading cow image and metadata to IPFS...");
//   const imagePath = "./cow.jpg"; // Path to your cow image
//   const ipfsResult = await uploadToIPFS(imagePath);
  
//   console.log(`
//     IPFS Upload Results:
//     Image CID: ${ipfsResult.imageCID}
//     Metadata CID: ${ipfsResult.metadataCID}
//     Image URL: http://localhost:8080/ipfs/${ipfsResult.imageCID}
//     Metadata URL: http://localhost:8080/ipfs/${ipfsResult.metadataCID}
//   `);

//   // 4. Register cow on blockchain
//   console.log("Registering cow on blockchain...");
//   const tx = await contract.registerCow(
//     cowData.breed,
//     Math.floor(new Date(cowData.birthDate)/1000), // Convert to UNIX timestamp
//     cowData.healthStatus,
//     ipfsResult.metadataCID, // Using metadata CID from IPFS
//     cowData.farmerTransactionId,
//     cowData.price
//   );
  
//   const receipt = await tx.wait();
//   console.log(`
//     Cow registered successfully!
//     Transaction hash: ${receipt.hash}
//     View on Polygonscan: https://mumbai.polygonscan.com/tx/${receipt.hash}
//   `);

//   // 5. Save deployment info
//   const deploymentInfo = {
//     contractAddress,
//     ipfs: {
//       imageCID: ipfsResult.imageCID,
//       metadataCID: ipfsResult.metadataCID,
//       imageURL: `https://ipfs.io/ipfs/${ipfsResult.imageCID}`,
//       metadataURL: `https://ipfs.io/ipfs/${ipfsResult.metadataCID}`
//     },
//     transactionHash: receipt.hash
//   };

//   fs.writeFileSync("deployment-info.json", JSON.stringify(deploymentInfo, null, 2));
//   console.log("Deployment details saved to deployment-info.json");
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

const { ethers } = require("hardhat");
const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');

// Initialize IPFS client
const ipfs = create({
  host: 'localhost',
  port: 5001,
  protocol: 'http'
});

async function uploadToIPFS(filePath, cowDetails) {
  try {
    // 1. Upload Image
    const fileContent = fs.readFileSync(filePath);
    const imageResult = await ipfs.add({
      path: path.basename(filePath),
      content: fileContent
    });

    // 2. Create Metadata
    const metadata = {
      name: `Cow ${cowDetails.cowId || path.basename(filePath).split('.')[0]}`,
      description: "Registered livestock information",
      image: `ipfs://${imageResult.cid}`,
      attributes: [
        { trait_type: "Breed", value: cowDetails.breed },
        { trait_type: "Birth Date", value: cowDetails.birthDate },
        { trait_type: "Health Status", value: cowDetails.healthStatus }
      ]
    };

    // 3. Upload Metadata
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

async function main() {
  // 1. Connect to contract
  const contractAddress = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE";
  const [deployer] = await ethers.getSigners();
  const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);
  
  // 2. Check current Gomini balance
  const currentBalance = await contract.getGominiBalance(deployer.address);
  console.log(`Current Gomini balance: ${ethers.formatEther(currentBalance)} MATIC`);

  // 3. Prepare cow data (400 Rs ≈ 0.4 MATIC at current rates)
  const cowData = {
    cowId: "COW-001",
    breed: "Holstein",
    birthDate: "2022-01-01",
    healthStatus: "Healthy",
    farmerTransactionId: "TX-001",
    price: ethers.parseEther("10") // 0.4 MATIC (~400 Rs)
  };

  // 4. Deposit funds if needed (10 MATIC example)
  const depositAmount = ethers.parseEther("10");
  if (currentBalance < depositAmount) {
    console.log(`Depositing ${ethers.formatEther(depositAmount)} MATIC to Gomini wallet...`);
    const depositTx = await contract.depositToGominiWallet({ value: depositAmount });
    await depositTx.wait();
    console.log("Deposit successful!");
  }

  // 5. Upload to IPFS
  console.log("Uploading cow data to IPFS...");
  const ipfsResult = await uploadToIPFS("./cow.jpg", cowData);
  console.log(`
    IPFS Upload Results:
    Image CID: ${ipfsResult.imageCID}
    Metadata CID: ${ipfsResult.metadataCID}
    Image URL: ${ipfsResult.imageURL}
    Metadata URL: ${ipfsResult.metadataURL}
  `);

  // 6. Register cow
  console.log("Registering cow on blockchain...");
  const tx = await contract.registerCow(
    cowData.breed,
    Math.floor(new Date(cowData.birthDate)/1000),
    cowData.healthStatus,
    ipfsResult.metadataCID,
    cowData.farmerTransactionId,
    cowData.price
  );
  const receipt = await tx.wait();
  
  console.log(`
    Cow registered successfully!
    Transaction hash: ${receipt.hash}
    View on Polygonscan: https://mumbai.polygonscan.com/tx/${receipt.hash}
  `);

  // 7. Verify new balance
  const newBalance = await contract.getGominiBalance(deployer.address);
  console.log(`Remaining Gomini balance: ${ethers.formatEther(newBalance)} MATIC`);

  // 8. Save deployment info
  const deploymentInfo = {
    contractAddress,
    tokenId: 1,
    ipfs: ipfsResult,
    transactionHash: receipt.hash,
    remainingBalance: ethers.formatEther(newBalance)
  };
  fs.writeFileSync("deployment-info.json", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });