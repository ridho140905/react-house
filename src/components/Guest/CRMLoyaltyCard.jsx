import React from 'react';
import { FiAward, FiGift } from 'react-icons/fi';

const CRMLoyaltyCard = () => {
  return (
    <div className="rounded-3xl p-6 shadow-xl text-white relative overflow-hidden h-full flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #3c348f 0%, #4F45B6 100%)' }}>
      {/* Background Decor */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
      <div className="absolute right-20 -bottom-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-white/70 text-sm font-medium mb-1">Member Loyalty</p>
            <h2 className="text-2xl font-bold tracking-wide">GOLD TIER</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
            <FiAward className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-white/80 mb-2">Total Poin Terkumpul</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black">12,450</span>
            <span className="text-white/70 font-semibold text-sm">Pts</span>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>Menuju Platinum</span>
              <span>15,000 Pts</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-200 h-2 rounded-full w-[83%]"></div>
            </div>
          </div>
        </div>

        <button className="w-full bg-white text-[#4F45B6] hover:bg-gray-50 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center space-x-2 shadow-lg mt-auto">
          <FiGift className="w-4 h-4" />
          <span>Tukar Poin & Reward</span>
        </button>
      </div>
    </div>
  );
};

export default CRMLoyaltyCard;
