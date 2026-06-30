import React from 'react';
import { FaShoppingCart, FaUserFriends, FaBirthdayCake, FaArrowRight } from 'react-icons/fa';

const EarnPointsList = () => {
  return (
    <div className="lg:col-span-1">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Ways to Earn</h2>
      <div className="space-y-3">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-[#4F45B6]/30 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F4F2FF] rounded-xl flex items-center justify-center text-[#4F45B6] group-hover:bg-[#4F45B6] group-hover:text-white transition-colors">
              <FaShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Belanja Furniture</h4>
              <p className="text-xs font-medium text-gray-500">Dapat poin dari setiap belanja</p>
            </div>
          </div>
          <FaArrowRight className="text-gray-300 group-hover:text-[#4F45B6] transition-colors" />
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-[#4F45B6]/30 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F4F2FF] rounded-xl flex items-center justify-center text-[#4F45B6] group-hover:bg-[#4F45B6] group-hover:text-white transition-colors">
              <FaUserFriends className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Ajak Teman</h4>
              <p className="text-xs font-medium text-gray-500">Dapatkan 500 poin per referral</p>
            </div>
          </div>
          <FaArrowRight className="text-gray-300 group-hover:text-[#4F45B6] transition-colors" />
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-[#4F45B6]/30 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F4F2FF] rounded-xl flex items-center justify-center text-[#4F45B6] group-hover:bg-[#4F45B6] group-hover:text-white transition-colors">
              <FaBirthdayCake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Bonus Ulang Tahun</h4>
              <p className="text-xs font-medium text-gray-500">2x Poin di bulan ulang tahun</p>
            </div>
          </div>
          <FaArrowRight className="text-gray-300 group-hover:text-[#4F45B6] transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default EarnPointsList;
