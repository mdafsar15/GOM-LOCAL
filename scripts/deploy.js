const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const FarmerCowRegistry = await ethers.getContractFactory("FarmerCowRegistry");
  const contract = await FarmerCowRegistry.deploy();
  
  // Wait for deployment to complete
  await contract.waitForDeployment();
  
  // Get the deployment transaction receipt
  const deploymentTx = contract.deploymentTransaction();
  const contractAddress = await contract.getAddress();

  console.log("Contract deployed to:", contractAddress);
  console.log("Transaction hash:", deploymentTx.hash);

  // Verify on Polygonscan (run separately)
  console.log(`
    To verify:
    npx hardhat verify --network polygonMumbai ${contractAddress}
  `);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });