const { ethers } = require("hardhat");

async function checkPendingAdoptions() {
    try {
        const contractAddress = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
        const [adopter] = await ethers.getSigners();
        const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);
        
        const pendingIds = await contract.getPendingAdoptions(adopter.address);
        console.log("Pending adoption IDs:", pendingIds);
        
        // Get details for each pending cow
        const pendingCows = [];
        for (const id of pendingIds) {
            const cow = await contract.getCowDetails(id);
            pendingCows.push({
                id: id.toString(),
                breed: cow.breed,
                healthStatus: cow.healthStatus,
                ipfsHash: cow.ipfsHash,
                price: ethers.formatEther(cow.price) + " MATIC",
                status: getStatusName(cow.status)
            });
        }
        
        console.log("Pending adoptions details:");
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