import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiStar, FiAward, FiShield } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { membershipTiers } from '../../data/membershipData';

const MembershipTiers = () => {
  const navigate = useNavigate();
  const [selectedTierId, setSelectedTierId] = useState(null);

  useEffect(() => {
    const savedTier = localStorage.getItem("selectedTier");
    if (savedTier) {
      setSelectedTierId(savedTier);
    }
  }, []);

  const getTierIcon = (id) => {
    switch(id) {
      case 'tier-1': return <FiStar className="w-8 h-8 text-gray-400" />;
      case 'tier-2': return <FiAward className="w-8 h-8 text-yellow-500" />;
      case 'tier-3': return <FiShield className="w-8 h-8 text-purple-600" />;
      default: return <FiStar className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#F4F2FF] text-[#4F45B6] text-xs font-bold uppercase tracking-wider mb-2">
          CRM Loyalty Program
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Pilihan Membership Kami</h2>
        <p className="text-gray-500 text-lg">
          Kumpulkan poin dari setiap pembelian dan nikmati berbagai keuntungan eksklusif yang dirancang khusus untuk mengapresiasi loyalitas Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 items-center">
        {membershipTiers.map((tier) => {
          // Jika user sudah memilih tier, maka highlight tier tersebut
          const isMyTier = selectedTierId === tier.id;

          // Coba ambil styling dari data atau fallback
          let borderClass = 'border-gray-200';
          if (tier.id === 'tier-2') borderClass = 'border-yellow-200 ring-2 ring-yellow-400 shadow-xl';
          if (tier.id === 'tier-3') borderClass = 'border-gray-800';
          
          if (isMyTier) {
            borderClass = 'border-[#4F45B6] ring-4 ring-[#4F45B6] shadow-2xl scale-105 z-10';
          }

          return (
            <div key={tier.id} className={`relative bg-white rounded-3xl border p-8 flex flex-col h-full transition-all duration-300 hover:shadow-lg ${borderClass}`}>
              {isMyTier ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#4F45B6] to-[#3c348f] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  Paket Anda Saat Ini
                </div>
              ) : tier.isPopular ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  Paling Diminati
                </div>
              ) : null}
              
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${tier.color}`}>
                {getTierIcon(tier.id)}
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-1">{tier.name} Tier</h3>
              <p className="text-sm font-bold text-gray-400 mb-8">{tier.pointMultiplier}</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    {benefit.included ? (
                      <FiCheckCircle className="w-5 h-5 text-[#4F45B6] shrink-0 mr-3 mt-0.5" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-200 shrink-0 mr-3 mt-0.5"></div>
                    )}
                    <span className={`text-sm ${benefit.included ? 'text-gray-600 font-medium' : 'text-gray-400'}`}>{benefit.text}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => {
                  if (isMyTier) {
                    navigate('/my-membership');
                  } else {
                    navigate('/membership');
                  }
                }}
                className={`w-full py-3 rounded-xl font-bold transition-colors mt-auto ${
                  isMyTier ? 'bg-[#4F45B6] text-white hover:bg-[#3c348f]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isMyTier ? 'Lihat Benefit Saya' : 'Pelajari Lebih Lanjut'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MembershipTiers;
