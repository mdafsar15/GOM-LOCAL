const { createClient } = require('@supabase/supabase-js');
const { ethers } = require("hardhat");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function checkPendingRequests() {
  try {
    const [adopter] = await ethers.getSigners();
    
    // Get pending requests from Supabase
    const { data, error } = await supabase
      .from('cows')
      .select('*')
      .eq('adopter_address', adopter.address)
      .eq('status', 'Pending');

    if (error) throw error;

    console.log("Pending adoption requests:");
    console.table(data);
    return data;
  } catch (error) {
    console.error("Error checking pending requests:", error);
    throw error;
  }
}

module.exports = { checkPendingRequests };