const { createClient } = require('@supabase/supabase-js');
const { ethers } = require("hardhat");

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function checkPendingRequests() {
  try {
    const [adopter] = await ethers.getSigners();
    console.log(`Checking pending requests for adopter: ${adopter.address}`);
    
    // Get pending requests from Supabase
    const { data, error } = await supabase
      .from('cows')
      .select('*')
      .eq('adopter_address', adopter.address.toLowerCase()) // Ensure case-insensitive match
      .eq('status', 'pending'); // Use lowercase to match your enum

    if (error) throw error;

    if (data.length === 0) {
      console.log("No pending adoption requests found");
      return [];
    }

    console.log(`Found ${data.length} pending adoption request(s):`);
    console.table(data.map(cow => ({
      id: cow.cow_id,
      breed: cow.breed,
      price: `₹${cow.price}`,
      farmer: cow.farmer_address,
      ipfs_metadata: cow.ipfs_hash_metadata
    })));
    
    return data;
  } catch (error) {
    console.error("\n❌ Error checking pending requests:", error.message);
    if (error.response) console.error("Details:", error.response.data);
    process.exit(1);
  }
}

// Immediately invoke the function when script is run
(async () => {
  await checkPendingRequests();
})();