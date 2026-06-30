import React from 'react';
import { FaTag, FaStar, FaCreditCard } from 'react-icons/fa';

const CheckoutCard = ({ subtotal, discountAmount, profile, finalTotal, pointsEarned, cartLength, handleCheckout }) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-[#4F45B6]/5 border border-gray-100 sticky top-8">
        <h2 className="text-xl font-black text-gray-900 mb-6">Ringkasan Belanja</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-gray-500 font-medium">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString()}</span>
          </div>
          
          {discountAmount > 0 ? (
            <div className="flex justify-between text-green-600 font-bold bg-green-50 p-4 rounded-xl border border-green-100">
              <span className="flex items-center gap-2"><FaTag /> Diskon ({profile?.tier || 'Member'})</span>
              <span>- Rp {discountAmount.toLocaleString()}</span>
            </div>
          ) : (
            <div className="flex justify-between text-gray-400 font-medium text-sm">
              <span className="flex items-center gap-2"><FaTag /> Diskon</span>
              <span>Rp 0 (Upgrade tier!)</span>
            </div>
          )}
          
          <div className="border-t border-gray-100 pt-4 mt-2">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Total Pembayaran</span>
              </div>
              <span className="text-3xl font-black text-gray-900">Rp {finalTotal.toLocaleString()}</span>
            </div>
            
            {pointsEarned > 0 && (
              <div className="mt-3 bg-yellow-50 text-yellow-700 p-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm border border-yellow-200">
                <FaStar className="text-yellow-500" />
                YAY! Anda mendapat +{pointsEarned} Poin
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={handleCheckout}
          disabled={cartLength === 0}
          className={`w-full py-4 font-black text-lg rounded-2xl transition-all flex items-center justify-center gap-2 ${
            cartLength === 0 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-[#4F45B6] hover:bg-[#3c348f] text-white shadow-lg shadow-[#4F45B6]/30 hover:-translate-y-1'
          }`}
        >
          <FaCreditCard /> Proses Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutCard;
