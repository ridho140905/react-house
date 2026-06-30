import React from 'react';
import { FaStar } from 'react-icons/fa';

const MemberProfileCard = ({ currentPoints, profile, user }) => {
  return (
    <div className="bg-gradient-to-br from-[#4F45B6] to-[#3c348f] rounded-3xl p-8 text-white shadow-xl shadow-[#4F45B6]/30 relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]">
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
      
      <div className="relative z-10 flex justify-between items-start mb-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider opacity-90 mb-1">Available Points</p>
          <h2 className="text-6xl font-black">{currentPoints}</h2>
        </div>
        <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold border border-white/30">
          <FaStar className="text-yellow-300" /> VERIFIED {profile?.tier?.toUpperCase() || 'MEMBER'}
        </div>
      </div>
      
      <div className="relative z-10 flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold mb-1">{profile?.full_name || user?.user_metadata?.full_name || "Member"}</h3>
          <p className="text-xs uppercase opacity-80 tracking-widest font-bold">Joined 2026</p>
        </div>
        <div className="bg-white text-[#4F45B6] px-4 py-2 rounded-full font-black text-sm shadow-sm flex items-center gap-1">
          <FaStar /> +{currentPoints} POINTS
        </div>
      </div>
    </div>
  );
};

export default MemberProfileCard;
