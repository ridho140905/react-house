import React from 'react';
import { FaShoppingCart, FaBoxOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartList = ({ cart }) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <FaShoppingCart className="text-[#4F45B6]" /> Keranjang Belanja
          </h2>
          <span className="bg-[#F4F2FF] text-[#4F45B6] font-black px-3 py-1 rounded-lg text-sm">
            {cart.length} item
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
               <FaShoppingCart className="text-gray-300 text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Keranjang Anda Kosong</h3>
            <p className="text-gray-500 font-medium max-w-sm mb-6">
              Silakan kembali ke halaman utama untuk mencari dan menambahkan furnitur impian Anda ke keranjang.
            </p>
            <Link 
              to="/guest-dashboard"
              className="bg-[#4F45B6] hover:bg-[#3c348f] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#4F45B6]/30 hover:-translate-y-1"
            >
              Mulai Belanja Sekarang
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map(c => (
              <div key={c.id} className="flex flex-col sm:flex-row justify-between sm:items-center bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#F4F2FF] rounded-xl flex items-center justify-center text-[#4F45B6]">
                    <FaBoxOpen className="w-10 h-10 opacity-50" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-gray-900 mb-1">{c.name}</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                      Harga Satuan: Rp {c.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                  <div className="bg-gray-50 px-4 py-2 rounded-lg font-bold text-gray-700">
                    Qty: {c.quantity}
                  </div>
                  <p className="font-black text-[#4F45B6] text-xl">
                    Rp {(c.price * c.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartList;
