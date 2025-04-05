const { ethers } = require("hardhat");

async function approveAdoption(cowId) {
  const contractAddress = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
  const [adopter] = await ethers.getSigners();
  const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);

  console.log(`Approving adoption for cow ${cowId}...`);
  const tx = await contract.connect(adopter).approveAdoption(cowId);
  const receipt = await tx.wait();

  console.log(`
    Adoption approved!
    Cow ${cowId} is now officially registered
    Transaction: https://mumbai.polygonscan.com/tx/${receipt.hash}
  `);
}

// Usage: npx hardhat run scripts/approveAdoption.js --network polygonMumbai
approveAdoption(4) // Use the cowId from your request
  .then(() => process.exit(0))
  .catch(console.error);