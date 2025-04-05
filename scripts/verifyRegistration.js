const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
  const cowId = 4;
  
  const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);
  const cow = await contract.getCowDetails(cowId);
  
  // Extract image CID from metadata (remove '/metadata.json' suffix if present)
  const metadataCID = cow.ipfsHash.replace('_metadata.json', '');
  
  console.log(`
    🐄 Cow ${cowId} Details:
    --------------------------------
    Owner: ${cow.farmerAddress}
    Breed: ${cow.breed}
    Health Status: ${cow.healthStatus}
    IPFS Metadata: https://ipfs.io/ipfs/${cow.ipfsHash}
    IPFS Image: https://ipfs.io/ipfs/${metadataCID}/cow.jpg
    Image Preview: ${getImagePreview(metadataCID)}
  `);
}

// Helper function to generate clickable image link
function getImagePreview(cid) {
  return `https://ipfs.io/ipfs/${cid}/cow.jpg`;
  // Alternative gateway if needed:
  // return `https://${cid}.ipfs.dweb.link/cow.jpg`;
}

main().catch(console.error);