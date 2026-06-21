import React, { useState } from 'react';
import PageHeader from "../components/Page.Header";
import { FiEdit2, FiSave, FiPlus, FiTrash2, FiStar, FiAward, FiShield } from 'react-icons/fi';
import { membershipTiers } from '../data/membershipData';

export default function MembershipAdmin() {
  // Gunakan state untuk menduplikasi data master agar bisa diedit di UI (simulasi)
  const [tiers, setTiers] = useState(membershipTiers);
  const [editingTierId, setEditingTierId] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleBenefitChange = (tierId, benefitIndex, newText) => {
    setTiers(prev => prev.map(tier => {
      if (tier.id === tierId) {
        const newBenefits = [...tier.benefits];
        newBenefits[benefitIndex].text = newText;
        return { ...tier, benefits: newBenefits };
      }
      return tier;
    }));
  };

  const handleBenefitToggle = (tierId, benefitIndex) => {
    setTiers(prev => prev.map(tier => {
      if (tier.id === tierId) {
        const newBenefits = [...tier.benefits];
        newBenefits[benefitIndex].included = !newBenefits[benefitIndex].included;
        return { ...tier, benefits: newBenefits };
      }
      return tier;
    }));
  };

  const handlePointChange = (tierId, newPoints) => {
    setTiers(prev => prev.map(tier => 
      tier.id === tierId ? { ...tier, pointMultiplier: newPoints } : tier
    ));
  };

  const handleSave = (tierId) => {
    setEditingTierId(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    // Di real app, di sini akan ada API Call (misal axios.put('/api/membership/tierId', data))
  };

  const getTierIcon = (id) => {
    switch(id) {
      case 'tier-1': return <FiStar className="w-6 h-6 text-gray-500" />;
      case 'tier-2': return <FiAward className="w-6 h-6 text-yellow-500" />;
      case 'tier-3': return <FiShield className="w-6 h-6 text-purple-500" />;
      default: return <FiStar className="w-6 h-6" />;
    }
  };

  return (
    <div className="pb-10">
      <PageHeader title="Kelola Membership" breadcrumb={["Master Data", "Membership"]} />

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Program Loyalitas CRM</h2>
        <p className="text-gray-500 text-sm mt-1">Konfigurasi tier, syarat poin, dan benefit untuk pelanggan.</p>
      </div>

      {saveSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
          Berhasil menyimpan konfigurasi ke database!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const isEditing = editingTierId === tier.id;

          return (
            <div key={tier.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-50 bg-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                    {getTierIcon(tier.id)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg uppercase tracking-wide">{tier.name} TIER</h3>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={tier.pointMultiplier}
                        onChange={(e) => handlePointChange(tier.id, e.target.value)}
                        className="text-xs font-bold bg-white border border-gray-300 rounded px-2 py-1 mt-1 text-[#4F45B6] w-full focus:outline-none focus:border-purple-500"
                      />
                    ) : (
                      <p className="text-xs font-bold text-[#4F45B6] mt-0.5">{tier.pointMultiplier}</p>
                    )}
                  </div>
                </div>
                
                {isEditing ? (
                  <button onClick={() => handleSave(tier.id)} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm" title="Simpan">
                    <FiSave />
                  </button>
                ) : (
                  <button onClick={() => setEditingTierId(tier.id)} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-[#4F45B6] hover:text-white transition-colors" title="Edit">
                    <FiEdit2 />
                  </button>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center justify-between">
                  Daftar Benefit
                  {isEditing && (
                    <button className="text-xs text-[#4F45B6] flex items-center gap-1 hover:underline">
                      <FiPlus /> Tambah
                    </button>
                  )}
                </h4>
                
                <ul className="space-y-3 flex-1">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {isEditing ? (
                        <>
                          <input 
                            type="checkbox" 
                            checked={benefit.included}
                            onChange={() => handleBenefitToggle(tier.id, idx)}
                            className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500 cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={benefit.text}
                            onChange={(e) => handleBenefitChange(tier.id, idx, e.target.value)}
                            className={`flex-1 text-sm border-b focus:outline-none focus:border-purple-500 px-1 py-0.5 ${benefit.included ? 'text-gray-800 border-gray-200 bg-gray-50' : 'text-gray-400 border-gray-100 line-through bg-gray-50'}`}
                          />
                          <button className="text-red-400 hover:text-red-600 p-1">
                            <FiTrash2 size={14}/>
                          </button>
                        </>
                      ) : (
                        <>
                          <div className={`mt-0.5 w-5 h-5 rounded-full shrink-0 flex items-center justify-center ${benefit.included ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
                            {benefit.included ? '✓' : '✗'}
                          </div>
                          <span className={`text-sm ${benefit.included ? 'text-gray-700 font-medium' : 'text-gray-400 line-through'}`}>
                            {benefit.text}
                          </span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
