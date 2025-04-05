async function checkPendingAdoptions() {
    const contractAddress = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
    const [adopter] = await ethers.getSigners();
    const contract = await ethers.getContractAt("FarmerCowRegistry", contractAddress);
    
    const pending = await contract.getPendingAdoptions(adopter.address);
    console.log("Pending adoptions:", pending);
    
    return pending;
  }
  
  // Run this in your script or console
  await checkPendingAdoptions();