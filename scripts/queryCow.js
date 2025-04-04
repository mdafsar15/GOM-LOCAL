const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE";
  const tokenId = 3; // Your first registered cow
  
  const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);
  const cow = await contract.getCowDetails(tokenId);
  
  // Convert BigInt to Number for the timestamp
  const birthDate = new Date(Number(cow.birthDate) * 1000);
  
  console.log(`
    Cow Details (Token ID: ${tokenId}):
    --------------------------------
    Breed: ${cow.breed}
    Birth Date: ${birthDate.toLocaleString()}
    Health Status: ${cow.healthStatus}
    Owner: ${cow.farmerAddress}
    IPFS Metadata: https://ipfs.io/ipfs/${cow.ipfsHash}
    Registration Timestamp: ${Number(cow.registrationTimestamp)}
    Price: ${ethers.formatEther(cow.price)} MATIC
    Farmer TX ID: ${cow.farmerTransactionId}
  `);
}

main().catch(console.error);