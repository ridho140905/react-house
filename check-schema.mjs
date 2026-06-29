import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ldjlujubthlehyhruqfp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkamx1anVidGhsZWh5aHJ1cWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MTg0NDgsImV4cCI6MjA5Njk5NDQ0OH0.xT4UGkJu20VkdxxONYF7cFttpQ44u0Rk4QNOOW3-7Vs';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Columns:", Object.keys(data[0] || {}));
    console.log("Data:", data[0]);
  }
}

checkSchema();
