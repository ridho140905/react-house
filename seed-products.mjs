import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ldjlujubthlehyhruqfp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkamx1anVidGhsZWh5aHJ1cWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MTg0NDgsImV4cCI6MjA5Njk5NDQ0OH0.xT4UGkJu20VkdxxONYF7cFttpQ44u0Rk4QNOOW3-7Vs';
const supabase = createClient(supabaseUrl, supabaseKey);

const dataProducts = [
    { title: "Sofa Minimalis 3 Seater", code: "FUR-001", category: "Ruang Tamu", price: 4500000, stock: 12, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop" },
    { title: "Meja Makan Kayu Jati", code: "FUR-002", category: "Ruang Makan", price: 7200000, stock: 5, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop" },
    { title: "Kursi Kerja Ergonomis", code: "FUR-003", category: "Kantor", price: 3500000, stock: 25, image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop" },
    { title: "Lemari Pakaian 2 Pintu", code: "FUR-004", category: "Kamar Tidur", price: 1800000, stock: 15, image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&h=400&fit=crop" },
    { title: "Tempat Tidur Queen Size", code: "FUR-005", category: "Kamar Tidur", price: 12000000, stock: 8, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
    { title: "Rak Buku Kayu Oak", code: "FUR-006", category: "Ruang Belajar", price: 2100000, stock: 30, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=400&fit=crop" },
    { title: "Meja TV Scandinavian", code: "FUR-007", category: "Ruang Tamu", price: 1500000, stock: 20, image: "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=400&h=400&fit=crop" },
    { title: "Kursi Bar Industrial", code: "FUR-008", category: "Dapur", price: 850000, stock: 40, image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop" },
    { title: "Meja Rias Putih", code: "FUR-009", category: "Kamar Tidur", price: 2700000, stock: 10, image: "https://images.unsplash.com/photo-1633505899122-f0468adb9b21?w=400&h=400&fit=crop" },
    { title: "Nordic Minimalist Sofa", code: "FUR-099", category: "Ruang Tamu", price: 4500000, stock: 10, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop" }
];

async function seedData() {
  console.log("Fetching existing products...");
  const { data: existingProducts, error: fetchError } = await supabase.from('products').select('*');
  
  if (fetchError) {
    console.error("Error fetching:", fetchError);
    return;
  }

  console.log("Updating existing products...");
  for (const product of existingProducts) {
    // Find matching product in mock data
    const match = dataProducts.find(dp => 
      dp.title.toLowerCase() === product.name.toLowerCase() || 
      product.name.toLowerCase().includes(dp.title.toLowerCase())
    ) || dataProducts[Math.floor(Math.random() * dataProducts.length)]; // Random fallback
    
    if (match) {
      const { error: updateError } = await supabase
        .from('products')
        .update({
          image: match.image,
          code: match.code,
          category: match.category
        })
        .eq('id', product.id);
        
      if (updateError) {
        console.error(`Failed to update ${product.name}:`, updateError.message);
      } else {
        console.log(`Updated ${product.name}`);
      }
    }
  }

  // Optionally insert missing ones
  console.log("Inserting remaining dummy products...");
  for (const dp of dataProducts) {
    const exists = existingProducts.find(p => p.name.toLowerCase() === dp.title.toLowerCase());
    if (!exists) {
      const { error: insertError } = await supabase.from('products').insert([{
        name: dp.title,
        price: dp.price,
        stock: dp.stock,
        image: dp.image,
        code: dp.code,
        category: dp.category
      }]);
      
      if (!insertError) {
        console.log(`Inserted ${dp.title}`);
      }
    }
  }
  
  console.log("Done seeding!");
}

seedData();
