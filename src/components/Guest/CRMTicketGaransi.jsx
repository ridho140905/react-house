import React from 'react';
import { FiTool, FiUploadCloud } from 'react-icons/fi';

const CRMTicketGaransi = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-50">
        <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
          <FiTool className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">Klaim Garansi & After-Sales</h2>
          <p className="text-sm text-gray-500">Ajukan perbaikan atau klaim garansi produk Anda.</p>
        </div>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">No. Pesanan / Transaksi</label>
          <input 
            type="text" 
            placeholder="Contoh: TRX-88291" 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Detail Masalah / Kerusakan</label>
          <textarea 
            rows="3" 
            placeholder="Jelaskan masalah pada produk yang Anda terima..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Bukti Foto</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#4F45B6] transition-all cursor-pointer">
            <FiUploadCloud className="w-8 h-8 mb-2 text-[#4F45B6]" />
            <span className="text-sm font-medium">Klik untuk upload foto (Max 5MB)</span>
            <span className="text-xs text-gray-400 mt-1">Format: JPG, PNG</span>
          </div>
        </div>

        <button type="button" className="w-full text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:opacity-90 flex justify-center items-center mt-2" style={{ backgroundColor: '#4F45B6' }}>
          Kirim Tiket Garansi
        </button>
      </form>
    </div>
  );
};

export default CRMTicketGaransi;
