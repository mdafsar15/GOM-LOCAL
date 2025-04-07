const { createClient } = require('@supabase/supabase-js');
const { ethers } = require("hardhat");

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Contract address from your deployment
const CONTRACT_ADDRESS = "0x21dF544947ba3E8b3c32561399E88B52Dc8b2823";

async function main() {
  // 1. Connect to the deployed contract
  const FarmerCowRegistry = await ethers.getContractFactory("FarmerCowRegistry");
  const registry = await FarmerCowRegistry.attach(CONTRACT_ADDRESS);
  
  console.log("Connected to contract at:", CONTRACT_ADDRESS);

  // 2. Sync pending cows to Supabase
  await syncPendingCows(registry);
}

async function syncPendingCows(registry) {
  try {
    console.log("Fetching pending cows from contract...");
    const pendingCows = await registry.getCowsByStatus(0); // 0 = Pending
    
    console.log(`Found ${pendingCows.length} pending cows`);
    
    for (const cow of pendingCows) {
      console.log(`Syncing cow ID: ${cow.cowId}`);
      
      const { data, error } = await supabase
        .from('cows')
        .upsert({
          cow_id: cow.cowId.toString(),
          breed: cow.breed,
          birth_date: new Date(cow.birthDate * 1000).toISOString(),
          health_status: cow.healthStatus,
          ipfs_hash_metadata: cow.ipfsHashMetaData,
          ipfs_images: cow.ipfsImages,
          farmer_address: cow.farmerAddress,
          adopter_address: cow.adopterAddress,
          farmer_transaction_id: cow.farmerTransactionId,
          price: cow.price.toString(),
          status: 'pending',
          created_at: new Date().toISOString()
        }, { onConflict: 'cow_id' });
      
      if (error) {
        console.error('Error syncing cow:', cow.cowId, error);
      } else {
        console.log('Successfully synced cow:', cow.cowId);
      }
    }
  } catch (error) {
    console.error("Error in syncPendingCows:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });