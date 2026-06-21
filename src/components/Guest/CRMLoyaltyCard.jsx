import React, { useState, useEffect } from 'react';
import { FiAward, FiGift, FiStar, FiShield } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { membershipTiers } from '../../data/membershipData';

const CRMLoyaltyCard = () => {
  const navigate = useNavigate();
  const [activeTierId, setActiveTierId] = useState('tier-1');
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedTier = localStorage.getItem("selectedTier");
    if (savedTier) {
      setActiveTierId(savedTier);
    }
    const savedPoints = localStorage.getItem("membershipPoints");
    if (savedPoints) {
      setPoints(parseInt(savedPoints));
    }
  }, []);

  const activeTier = membershipTiers.find(t => t.id === activeTierId) || membershipTiers[0];

  // Logic simpel untuk target poin
  let nextTier = 'Gold';
  let targetPoints = 5000;
  if (activeTierId === 'tier-2') {
    nextTier = 'Platinum';
    targetPoints = 15000;
  } else if (activeTierId === 'tier-3') {
    nextTier = 'VIP Eksklusif';
    targetPoints = 50000;
  }

  const progress = Math.min((points / targetPoints) * 100, 100);

  const getTierIcon = () => {
    switch(activeTier.id) {
      case 'tier-1': return <FiStar className="w-8 h-8 text-gray-400" />;
      case 'tier-2': return <FiAward className="w-8 h-8 text-yellow-400" />;
      case 'tier-3': return <FiShield className="w-8 h-8 text-white" />;
      default: return <FiStar className="w-8 h-8 text-gray-400" />;
    }
  };

  const getGradient = () => {
    switch(activeTier.id) {
      case 'tier-1': return 'linear-gradient(135deg, #4b5563 0%, #1f2937 100%)';
      case 'tier-2': return 'linear-gradient(135deg, #b45309 0%, #d97706 100%)';
      case 'tier-3': return 'linear-gradient(135deg, #111827 0%, #000000 100%)';
      default: return 'linear-gradient(135deg, #3c348f 0%, #4F45B6 100%)';
    }
  };

  return (
    <div className="rounded-3xl p-6 shadow-xl text-white relative overflow-hidden h-full flex flex-col justify-between" style={{ background: getGradient() }}>
      {/* Background Decor */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
      <div className="absolute right-20 -bottom-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-white/70 text-sm font-medium mb-1">Member Loyalty</p>
            <h2 className="text-2xl font-bold tracking-wide uppercase">{activeTier.name} TIER</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
            {getTierIcon()}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-white/80 mb-2">Total Poin Terkumpul</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black">{points.toLocaleString()}</span>
            <span className="text-white/70 font-semibold text-sm">Pts</span>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>Menuju {nextTier}</span>
              <span>{targetPoints.toLocaleString()} Pts</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-200 h-2 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/my-membership')}
          className="w-full bg-white text-gray-900 hover:bg-gray-50 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center space-x-2 shadow-lg mt-auto"
        >
          <FiGift className="w-4 h-4 text-[#4F45B6]" />
          <span>Tukar Poin & Reward</span>
        </button>
      </div>
    </div>
  );
};

export default CRMLoyaltyCard;
