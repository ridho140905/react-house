import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { supabase } from '../../lib/supabaseClient';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Mohon lengkapi semua data sebelum mengirim.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from('messages').insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          sender: 'user'
        }
      ]);

      if (error) throw error;
      
      // Simpan email ke localStorage agar Chat Widget bisa tersinkronisasi
      localStorage.setItem('guest_chat_email', formData.email);
      window.dispatchEvent(new Event('chatEmailUpdated'));

      alert("Pesan Anda telah berhasil dikirim. Kami akan membalas secepatnya!");
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert("Gagal mengirim pesan: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#F4F2FF] text-[#4F45B6] text-xs font-bold uppercase tracking-wider mb-2">
          Kontak Kami
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Hubungi Kami Sekarang</h2>
        <p className="text-gray-500 text-lg">
          Ada pertanyaan mengenai custom furniture, ketersediaan stok, atau paket garansi? Kami siap melayani Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Kiri: Informasi */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Informasi Outlet</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4 text-gray-600">
                <FiMapPin className="w-6 h-6 text-[#4F45B6] shrink-0 mt-0.5" />
                <span>Jl. Soekarno Hatta No. 236, Pekanbaru, Riau</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <FiPhone className="w-5 h-5 text-[#4F45B6] shrink-0" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <FiMail className="w-5 h-5 text-[#4F45B6] shrink-0" />
                <span>support@furnitureq.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <FiClock className="w-5 h-5 text-[#4F45B6] shrink-0" />
                <span>Buka 09:00 - 20:00 (Setiap Hari)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-3xl border border-gray-200 overflow-hidden h-64 relative">
             <iframe 
                src="https://maps.google.com/maps?q=Informa%20Pekanbaru&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Peta Lokasi Toko"
              ></iframe>
          </div>
        </div>

        {/* Kanan: Form */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Kirim Pesan Langsung</h3>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Anda" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@contoh.com" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan / Masukan</label>
              <textarea 
                rows="4" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tuliskan pertanyaan Anda di sini..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md flex justify-center items-center mt-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:opacity-90'}`} 
              style={{ backgroundColor: '#4F45B6' }}
            >
              {isLoading ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
