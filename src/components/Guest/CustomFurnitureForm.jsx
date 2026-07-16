import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { FiCheckCircle, FiTool, FiBox, FiDroplet } from 'react-icons/fi';

const CustomFurnitureForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Sofa',
    material: 'Kayu Jati',
    color: 'Oatmeal',
    details: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Mohon lengkapi Nama dan Email Anda.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from('custom_furniture').insert([
        {
          name: formData.name,
          email: formData.email,
          category: formData.category,
          material: formData.material,
          color: formData.color,
          details: formData.details
        }
      ]);

      if (error) throw error;
      
      setIsSuccess(true);
      setFormData({
        name: '', email: '', category: 'Sofa', material: 'Kayu Jati', color: 'Oatmeal', details: ''
      });
      
      // Auto close success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      alert("Gagal mengirim pesanan: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto my-16">
      <div className="text-center mb-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#F4F2FF] text-[#4F45B6] text-xs font-bold uppercase tracking-wider mb-2">
          Layanan Eksklusif
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-3">Custom Furniture Configurator</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Wujudkan furnitur impian Anda! Pilih kategori, material, dan warna, lalu tim desain kami akan memproduksi karya eksklusif khusus untuk ruangan Anda.
        </p>
      </div>

      {isSuccess && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3 text-green-700 animate-in fade-in">
          <FiCheckCircle className="w-6 h-6 flex-shrink-0" />
          <p className="text-sm font-medium">Permintaan Custom Furniture berhasil dikirim! Tim kami akan segera meninjau dan menghubungi Anda via Email.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kolom Kiri: Info Pelanggan & Kategori */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
            <FiTool className="text-[#4F45B6]" /> 1. Detail Pemesanan
          </h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Budi Santoso"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4F45B6] focus:ring-1 focus:ring-[#4F45B6] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Untuk Notifikasi)</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@contoh.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4F45B6] focus:ring-1 focus:ring-[#4F45B6] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori Furnitur</label>
            <div className="relative">
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4F45B6] focus:ring-1 focus:ring-[#4F45B6] transition-all cursor-pointer"
              >
                <option value="Sofa">Sofa & Kursi Lesehan</option>
                <option value="Meja">Meja Kerja & Makan</option>
                <option value="Lemari">Lemari Pakaian & Kabinet</option>
                <option value="Tempat Tidur">Ranjang & Tempat Tidur</option>
              </select>
              <FiBox className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Spesifikasi */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
            <FiDroplet className="text-[#4F45B6]" /> 2. Spesifikasi Desain
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
              <select 
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4F45B6] cursor-pointer"
              >
                <option value="Kayu Jati">Kayu Jati Premium</option>
                <option value="Mahoni">Kayu Mahoni</option>
                <option value="Fabric">Kain Fabric (Sofa)</option>
                <option value="Leather">Kulit Sintetis (Sofa)</option>
                <option value="Besi">Rangka Besi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Warna Utama</label>
              <select 
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4F45B6] cursor-pointer"
              >
                <option value="Oatmeal">Oatmeal / Cream</option>
                <option value="Charcoal">Charcoal / Abu Tua</option>
                <option value="Walnut">Walnut Brown</option>
                <option value="Natural">Natural Wood</option>
                <option value="Matte Black">Matte Black</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Catatan Khusus (Dimensi, dll)</label>
            <textarea 
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="4" 
              placeholder="Contoh: Saya ingin ukuran panjang 2 meter x lebar 1 meter. Tanpa pelitur mengkilap."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4F45B6] focus:ring-1 focus:ring-[#4F45B6] transition-all resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-md transition-all mt-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:opacity-90'}`}
            style={{ backgroundColor: '#4F45B6' }}
          >
            {isLoading ? 'Memproses Request...' : 'Ajukan Pesanan Custom'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomFurnitureForm;
