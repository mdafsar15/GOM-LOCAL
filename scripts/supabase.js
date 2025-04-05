// Replace this:
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  
  // With this:
  const supabase = createClient(
    'https://bzymnfyzcsgoyajuybzd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6eW1uZnl6Y3Nnb3lhanV5YnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxOTYyNzksImV4cCI6MjA1Nzc3MjI3OX0.MLfnbt0iQrVO48CevqYooepaRM6TTQ7K6vi6ZBPjKdk'
  );