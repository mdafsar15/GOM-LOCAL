const { ethers } = require("hardhat");

async function approveAdoption(cowId) {
    try {
        const contractAddress = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
        const [adopter] = await ethers.getSigners();
        const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);

        // Check cow details before approving
        const cow = await contract.getCowDetails(cowId);
        console.log(`Approving adoption for cow ${cowId} (${cow.breed})...`);
        console.log(`Price: ${ethers.formatEther(cow.price)} MATIC`);

        // Make sure adopter has enough balance in Gomini wallet
        const balance = await contract.getGominiBalance(adopter.address);
        if (balance < cow.price) {
            console.log(`Adopter needs to deposit at least ${ethers.formatEther(cow.price)} MATIC`);
            console.log("Use depositToGominiWallet() function first");
            return;
        }

        console.log(`Approving adoption...`);
        const tx = await contract.connect(adopter).approveAdoption(cowId);
        const receipt = await tx.wait();

        console.log(`
            🎉 Adoption approved!
            --------------------------------
            Cow ID: ${cowId}
            Breed: ${cow.breed}
            Status: Registered
            
            🔗 Transaction: https://mumbai.polygonscan.com/tx/${receipt.hash}
        `);

        return receipt;
    } catch (error) {
        console.error("Error approving adoption:", error.message);
        throw error;
    }
}

// Usage: npx hardhat run scripts/approveAdoption.js --network polygonMumbai
const cowId = 5; // Change this to the cow ID you want to approve
approveAdoption(cowId)
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

module.exports = { approveAdoption };