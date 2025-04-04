const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  const FarmerCowRegistry = await ethers.getContractFactory("FarmerCowRegistry");
  const farmerCowRegistry = await FarmerCowRegistry.deploy();
  
  // Wait for deployment to complete
  await farmerCowRegistry.waitForDeployment();

  console.log("FarmerCowRegistry deployed to:", await farmerCowRegistry.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });