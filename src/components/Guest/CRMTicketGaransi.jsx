import React, { useState, useRef } from 'react';
import { FiTool, FiUploadCloud, FiCheckCircle, FiX, FiImage } from 'react-icons/fi';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';

const CRMTicketGaransi = () => {
  const { profile, user } = useAuth();
  
  const [trxId, setTrxId] = useState('');
  const [issue, setIssue] = useState('');
  const [customerName, setCustomerName] = useState(profile?.full_name || user?.email?.split('@')[0] || '');
  const [photoBase64, setPhotoBase64] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal adalah 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      if (!trxId || !issue || !customerName) {
        throw new Error("Mohon lengkapi semua data form (termasuk Nama Pelanggan).");
      }

      const { data, error } = await supabase
        .from('warranty_claims')
        .insert([
          {
            trx_id: trxId,
            customer_name: customerName,
            issue: issue,
            user_id: user?.id || null,
            photo_url: photoBase64
          }
        ]);

      if (error) throw error;

      setSuccess(true);
      setTrxId('');
      setIssue('');
      setPhotoBase64(null);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-50 shrink-0">
        <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
          <FiTool className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">Klaim Garansi & After-Sales</h2>
          <p className="text-sm text-gray-500">Ajukan perbaikan atau klaim garansi produk Anda.</p>
        </div>
      </div>

      {success ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <FiCheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Tiket Berhasil Dikirim!</h3>
          <p className="text-gray-500 text-sm mb-6">
            Tim teknisi kami akan segera memeriksa klaim Anda dan menghubungi Anda dalam 2x24 jam.
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
          >
            Kirim Tiket Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Pelanggan</label>
            <input 
              type="text" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Contoh: Budi Santoso" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">No. Pesanan / Transaksi</label>
            <input 
              type="text" 
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              placeholder="Contoh: TRX-88291" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Detail Masalah / Kerusakan</label>
            <textarea 
              rows="3" 
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Jelaskan masalah pada produk yang Anda terima..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all resize-none"
              required
            ></textarea>
          </div>

          <div className="mb-auto">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Bukti Foto</label>
            <input 
              type="file" 
              accept="image/*"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {!photoBase64 ? (
              <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#4F45B6] transition-all cursor-pointer"
              >
                <FiUploadCloud className="w-8 h-8 mb-2 text-[#4F45B6]" />
                <span className="text-sm font-medium">Klik untuk upload foto (Max 5MB)</span>
                <span className="text-xs text-gray-400 mt-1">Format: JPG, PNG</span>
              </div>
            ) : (
              <div className="relative border border-gray-200 rounded-xl p-2 h-32 w-full flex items-center justify-center bg-gray-50">
                <img src={photoBase64} alt="Bukti" className="h-full object-contain rounded-lg" />
                <button 
                  type="button"
                  onClick={() => setPhotoBase64(null)}
                  className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-red-500 hover:bg-red-50 transition-all shadow-sm"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            style={{ backgroundColor: '#4F45B6' }}
          >
            {loading ? 'Mengirim...' : 'Kirim Tiket Garansi'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CRMTicketGaransi;
