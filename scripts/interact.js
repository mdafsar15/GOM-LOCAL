const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
  const [user] = await ethers.getSigners();
  
  const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);

  // Example: Deposit 0.1 MATIC to Gomini wallet
  const depositAmount = ethers.parseEther("10");
  console.log("Depositing...");
  await contract.depositToGominiWallet({ value: depositAmount });
  console.log("Deposit successful");

  // Check balance
  const balance = await contract.getGominiBalance(user.address);
  console.log("Gomini wallet balance:", ethers.formatEther(balance), "MATIC");
}

main().catch(console.error);