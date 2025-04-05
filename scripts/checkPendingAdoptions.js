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

async function checkPendingAdoptions() {
    try {
        const contractAddress = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
        const [adopter] = await ethers.getSigners();
        const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);
        
        // Get current MATIC to INR rate
        const maticToInr = await getMaticToInrRate();
        console.log(`Current MATIC to INR rate: ₹${maticToInr} per MATIC`);
        
        const pendingIds = await contract.getPendingAdoptions(adopter.address);
        console.log("\nPending adoption IDs:", pendingIds);
        
        // Get details for each pending cow
        const pendingCows = [];
        for (const id of pendingIds) {
            const cow = await contract.getCowDetails(id);
            const priceInMatic = ethers.formatEther(cow.price);
            const priceInInr = (parseFloat(priceInMatic) * maticToInr).toFixed(2);
            
            pendingCows.push({
                id: id.toString(),
                breed: cow.breed,
                healthStatus: cow.healthStatus,
                ipfsHash: cow.ipfsHash,
                price: `₹${priceInInr}`,
                status: getStatusName(cow.status)
            });
        }
        
        console.log("\nPending adoptions details:");
        console.table(pendingCows);
        
        return pendingCows;
    } catch (error) {
        console.error("Error checking pending adoptions:", error);
        throw error;
    }
}

function getStatusName(statusCode) {
    const statusMap = ["Pending", "Approved", "Rejected", "Registered"];
    return statusMap[Number(statusCode)] || "Unknown";
}

// Run the function if this script is called directly
if (require.main === module) {
    checkPendingAdoptions()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}

module.exports = { checkPendingAdoptions };