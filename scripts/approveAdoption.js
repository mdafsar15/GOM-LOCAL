const { ethers } = require("hardhat");
const axios = require("axios");

async function getMaticToInrRate() {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=inr");
    return response.data["matic-network"].inr;
  } catch (error) {
    console.error("Failed to fetch MATIC price, using fallback rate of ₹55 per MATIC");
    return 55; // Fallback rate
  }
}

async function depositRequiredAmount(contract, adopter, requiredMatic) {
  const depositAmount = requiredMatic; // Already in MATIC (wei)
  console.log(`Depositing ${ethers.formatEther(depositAmount)} MATIC to Gomini wallet...`);
  
  const tx = await contract.connect(adopter).depositToGominiWallet({
    value: depositAmount
  });
  await tx.wait();
  
  console.log("Deposit successful");
  return await contract.getGominiBalance(adopter.address);
}

async function approveAdoption(cowId) {
    try {
        const contractAddress = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
        const [adopter] = await ethers.getSigners();
        const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);

        // Check cow details before approving
        const cow = await contract.getCowDetails(cowId);
        const maticToInr = await getMaticToInrRate();
        const priceInInr = (parseFloat(ethers.formatEther(cow.price)) * maticToInr).toFixed(2);
        
        console.log(`Approving adoption for cow ${cowId} (${cow.breed})...`);
        console.log(`Price: ${ethers.formatEther(cow.price)} MATIC (₹${priceInInr})`);

        // Check and handle Gomini wallet balance
        let balance = await contract.getGominiBalance(adopter.address);
        console.log(`Current Gomini balance: ${ethers.formatEther(balance)} MATIC`);

        if (balance < cow.price) {
            const shortBy = cow.price - balance;
            console.log(`Insufficient balance. Need additional ${ethers.formatEther(shortBy)} MATIC`);
            
            // Automatically deposit the required amount
            balance = await depositRequiredAmount(contract, adopter, shortBy);
            console.log(`New Gomini balance: ${ethers.formatEther(balance)} MATIC`);
        }

        console.log(`Approving adoption...`);
        const tx = await contract.connect(adopter).approveAdoption(cowId);
        const receipt = await tx.wait();

        console.log(`
            🎉 Adoption approved!
            --------------------------------
            Cow ID: ${cowId}
            Breed: ${cow.breed}
            Price: ₹${priceInInr} (${ethers.formatEther(cow.price)} MATIC)
            Status: Registered
            
            🔗 Transaction: https://mumbai.polygonscan.com/tx/${receipt.hash}
        `);

        return receipt;
    } catch (error) {
        console.error("Error approving adoption:", error.message);
        throw error;
    }
}

// Usage: npx hardhat run scripts/approveAdoption.js --network polygonMumbai <cowId>
const cowId = process.argv[2] || 14; // Get cowId from command line or default to 13
approveAdoption(cowId)
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

module.exports = { approveAdoption };