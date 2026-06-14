import React from 'react';
import { FiCheckCircle, FiStar, FiAward, FiShield } from 'react-icons/fi';

const MembershipTiers = () => {
  const tiers = [
    {
      name: 'Silver',
      pts: '0 - 5.000 Pts',
      icon: <FiStar className="w-8 h-8 text-gray-400" />,
      color: 'bg-gray-100 text-gray-800',
      border: 'border-gray-200',
      perks: [
        'Cashback 2% setiap transaksi',
        'Layanan garansi standar',
        'Akses promo reguler tahunan'
      ]
    },
    {
      name: 'Gold',
      pts: '5.001 - 15.000 Pts',
      icon: <FiAward className="w-8 h-8 text-yellow-500" />,
      color: 'bg-yellow-50 text-yellow-800',
      border: 'border-yellow-200 ring-2 ring-yellow-400 scale-105 shadow-xl z-10',
      isPopular: true,
      perks: [
        'Cashback 5% setiap transaksi',
        'Prioritas pengiriman (H+1)',
        'Gratis 1x Konsultasi Interior/tahun',
        'Akses produk pre-launch'
      ]
    },
    {
      name: 'Platinum',
      pts: '> 15.000 Pts',
      icon: <FiShield className="w-8 h-8 text-purple-600" />,
      color: 'bg-purple-50 text-purple-800',
      border: 'border-purple-200',
      perks: [
        'Cashback 10% setiap transaksi',
        'Gratis Ongkir Nasional',
        'VIP Support 24/7',
        'Konsultasi Interior Unlimited',
        'Hadiah eksklusif ulang tahun'
      ]
    }
  ];

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
        {tiers.map((tier, index) => (
          <div key={index} className={`relative bg-white rounded-3xl border p-8 flex flex-col h-full transition-all duration-300 hover:shadow-lg ${tier.border}`}>
            {tier.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                Paling Diminati
              </div>
            )}
            
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${tier.color}`}>
              {tier.icon}
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 mb-1">{tier.name} Tier</h3>
            <p className="text-sm font-bold text-gray-400 mb-8">{tier.pts}</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {tier.perks.map((perk, i) => (
                <li key={i} className="flex items-start">
                  <FiCheckCircle className="w-5 h-5 text-[#4F45B6] shrink-0 mr-3 mt-0.5" />
                  <span className="text-gray-600 font-medium">{perk}</span>
                </li>
              ))}
            </ul>
            
            <button className={`w-full py-3 rounded-xl font-bold transition-colors mt-auto ${tier.isPopular ? 'bg-[#4F45B6] text-white hover:bg-[#3c348f]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              Pelajari Lebih Lanjut
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipTiers;
