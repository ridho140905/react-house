import React from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const ContactUs = () => {
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
                <span>Jl. Desain Interior No. 124, Kota Kreatif, Indonesia</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <FiPhone className="w-5 h-5 text-[#4F45B6] shrink-0" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <FiMail className="w-5 h-5 text-[#4F45B6] shrink-0" />
                <span>support@furnitureku.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <FiClock className="w-5 h-5 text-[#4F45B6] shrink-0" />
                <span>Buka 09:00 - 20:00 (Setiap Hari)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#F4F2FF] p-8 rounded-3xl border border-[#E0DDF7] flex flex-col items-center justify-center text-center py-12">
             <FiMapPin className="w-8 h-8 text-[#4F45B6] mb-3" />
             <h4 className="font-bold text-[#4F45B6] mb-1">Peta Outlet Pusat</h4>
             <p className="text-sm text-[#4F45B6]/70">Gunakan navigasi Google Maps ke Antigravity</p>
          </div>
        </div>

        {/* Kanan: Form */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Kirim Pesan Langsung</h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
              <input type="text" placeholder="Nama Anda" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input type="email" placeholder="email@contoh.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan / Masukan</label>
              <textarea rows="4" placeholder="Tuliskan pertanyaan Anda di sini..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all resize-none"></textarea>
            </div>
            <button type="button" className="w-full text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:opacity-90 flex justify-center items-center mt-2" style={{ backgroundColor: '#4F45B6' }}>
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
