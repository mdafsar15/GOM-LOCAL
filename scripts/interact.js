const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE";
  const [user] = await ethers.getSigners();
  
  const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);

  // Example: Deposit 0.1 MATIC to Gomini wallet
  const depositAmount = ethers.parseEther("0.1");
  console.log("Depositing...");
  await contract.depositToGominiWallet({ value: depositAmount });
  console.log("Deposit successful");

  // Check balance
  const balance = await contract.getGominiBalance(user.address);
  console.log("Gomini wallet balance:", ethers.formatEther(balance), "MATIC");
}

main().catch(console.error);