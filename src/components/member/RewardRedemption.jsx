import React from 'react';
import { FaGift } from 'react-icons/fa';

const RewardRedemption = ({ rewards, claimedBenefits, currentPoints, handleClaim }) => {
  return (
    <div className="lg:col-span-2">
      <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <FaGift className="text-[#4F45B6]"/> Redeem Rewards
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rewards.map((reward) => {
          const isClaimed = claimedBenefits.includes(reward.id);
          const canAfford = currentPoints >= reward.cost;
          
          return (
            <div key={reward.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-md transition-shadow">
              <div className="h-40 w-full relative overflow-hidden">
                <img src={reward.image} alt={reward.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-black text-gray-900 shadow-sm">
                  {reward.cost} PTS
                </div>
                <div className="absolute top-3 right-3 bg-[#4F45B6] px-3 py-1 rounded-full text-xs font-black text-white shadow-sm">
                  {reward.tag}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{reward.title}</h3>
                <p className="text-xs text-gray-500 mb-4 font-medium">
                  {isClaimed ? "Telah ditukarkan" : canAfford ? "Tersedia untuk ditukar" : `Butuh ${reward.cost - currentPoints} poin lagi`}
                </p>
                <button 
                  onClick={() => handleClaim(reward)}
                  disabled={!canAfford || isClaimed}
                  className={`mt-auto w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                    isClaimed ? "bg-gray-100 text-gray-400 cursor-not-allowed" :
                    canAfford ? "bg-[#F4F2FF] hover:bg-[#EBE9FE] text-[#4F45B6]" : "bg-gray-50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isClaimed ? "REDEEMED" : "REDEEM REWARD"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RewardRedemption;
