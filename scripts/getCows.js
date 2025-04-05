const supabase = require('./supabase');

async function getCowsByStatus(status) {
  try {
    const { data, error } = await supabase
      .from('cow_registrations')
      .select('*')
      .eq('status', status);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching cows:', error);
    throw error;
  }
}

// Example usage
getCowsByStatus('Registered')
  .then(cows => console.table(cows))
  .catch(console.error);