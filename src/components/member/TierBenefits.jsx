import React from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';

const TierBenefits = ({ profile, currentPoints, getTierBenefits }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
       <div className="flex items-center gap-3 mb-6">
         <div className="w-12 h-12 rounded-xl bg-[#F4F2FF] text-[#4F45B6] flex items-center justify-center">
           <FaStar className="w-6 h-6" />
         </div>
         <div>
           <h3 className="text-xl font-black text-gray-900">Benefit {profile?.tier || 'Member'} Anda</h3>
           <p className="text-sm text-gray-500 font-medium">Keuntungan khusus tier Anda saat ini</p>
         </div>
       </div>
       <div className="space-y-4">
         {getTierBenefits(profile?.tier).map((benefit, idx) => (
           <div key={idx} className="flex items-center gap-3">
             <FaCheckCircle className="text-green-500 text-lg shrink-0" />
             <span className="font-bold text-gray-700">{benefit}</span>
           </div>
         ))}
       </div>
       
       {/* Progress Bar (Reward Ready) */}
       <div className="mt-8">
          <p className="text-sm font-bold text-gray-900 mb-2">Reward Ready</p>
          <div className="w-full h-3 bg-[#F4F2FF] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#4F45B6] rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((currentPoints / 500) * 100, 100)}%` }}
            ></div>
          </div>
       </div>
    </div>
  );
};

export default TierBenefits;
