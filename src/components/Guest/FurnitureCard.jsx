import React from 'react';
import { FiStar, FiShoppingCart, FiEye } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const FurnitureCard = ({ item }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(item);
    alert(`${item.name} berhasil ditambahkan ke keranjang!`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col group">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-50 overflow-hidden">
        <img 
          src={item.image_url || item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
          <FiStar className="text-yellow-400 fill-current w-4 h-4" />
          <span className="text-sm font-bold text-gray-700">{item.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Harga</span>
            <span className="text-xl font-extrabold text-[#4F45B6]">Rp {item.price.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate(`/product/${item.id}`)}
              title="Lihat Detail Produk"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-xl transition-colors shadow-sm"
            >
              <FiEye className="w-5 h-5" />
            </button>
            <button 
              onClick={handleAddToCart}
              title="Tambah ke Keranjang"
              className="bg-[#4F45B6] hover:bg-[#3c348f] text-white p-3 rounded-xl transition-colors shadow-sm hover:shadow-indigo-200"
            >
              <FiShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureCard;
