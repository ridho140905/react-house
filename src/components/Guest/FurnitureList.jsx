import React from 'react';
import FurnitureCard from './FurnitureCard';

const dummyData = [
  {
    id: 1,
    name: "Nordic Minimalist Sofa",
    description: "Sofa 3 dudukan dengan kain linen premium dan kaki kayu solid oak.",
    price: "Rp 4.500.000",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Ergo Lounge Chair",
    description: "Kursi santai ergonomis dengan bantalan busa memori tebal.",
    price: "Rp 2.100.000",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Modern Oak Dining Table",
    description: "Meja makan kayu ek solid untuk 6 orang, desain elegan dan kokoh.",
    price: "Rp 5.200.000",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Aesthetic TV Cabinet",
    description: "Rak TV minimalis dengan kompartemen penyimpanan luas.",
    price: "Rp 1.850.000",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const FurnitureList = () => {
  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Koleksi Terbaru</h2>
          <p className="text-gray-500 mt-1">Temukan furniture impian untuk rumah Anda.</p>
        </div>
        <button className="text-[#4F45B6] font-semibold hover:text-[#3c348f] text-sm">Lihat Semua</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {dummyData.map((item) => (
          <FurnitureCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FurnitureList;
