import React from 'react';
import { FiAward, FiTool } from 'react-icons/fi';

import FurnitureList from '../components/Guest/FurnitureList';
import GuestTestimonial from '../components/Guest/GuestTestimonial';
import CRMLoyaltyCard from '../components/Guest/CRMLoyaltyCard';
import CRMTicketGaransi from '../components/Guest/CRMTicketGaransi';
import CRMChatWidget from '../components/Guest/CRMChatWidget';
import CompanyProfile from '../components/Guest/CompanyProfile';
import MembershipTiers from '../components/Guest/MembershipTiers';
import ContactUs from '../components/Guest/ContactUs';
import GuestFooter from '../components/Guest/GuestFooter';
import HeroCarousel from '../components/Guest/HeroCarousel';

const GuestDashboard = () => {
  return (
    <div className="w-full">
      <HeroCarousel />
      
      {/* HERO SECTION */}
      <section id="hero" className="bg-white py-16 md:py-24 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              Kenyamanan Ekstra <br />
              <span className="text-[#4F45B6]">Di Setiap Sudut Rumah</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
              Temukan koleksi furniture modern terbaik, kumpulkan poin dari setiap transaksi, dan nikmati layanan garansi eksklusif untuk Anda.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button 
                onClick={() => document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#4F45B6] text-white rounded-xl font-bold hover:bg-[#3c348f] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Mulai Belanja
              </button>
              <button 
                onClick={() => document.getElementById('garansi')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-[#4F45B6] hover:text-[#4F45B6] transition-all"
              >
                Klaim Garansi
              </button>
            </div>
          </div>

          {/* Hero Image / Loyalty Card */}
          <div className="relative flex justify-center lg:justify-end mt-10 lg:mt-0">
            <div className="w-full max-w-md transform transition-all hover:scale-105 duration-500 relative z-10">
              <CRMLoyaltyCard />
            </div>
            {/* Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#F4F2FF] to-transparent rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 space-y-32">
        
        {/* SECTION: PROFIL PERUSAHAAN */}
        <section id="profil" className="scroll-mt-32">
          <CompanyProfile />
        </section>

        {/* SECTION: MEMBERSHIP TIERS */}
        <section id="membership" className="scroll-mt-32">
          <MembershipTiers />
        </section>

        {/* SECTION: KATALOG */}
        <section id="katalog" className="scroll-mt-32">
          <FurnitureList />
        </section>

        {/* SECTION: TESTIMONI (PENGGANTI PESANAN SAYA) */}
        <section id="testimoni" className="scroll-mt-32">
          <GuestTestimonial />
        </section>

        {/* SECTION: GARANSI */}
        <section id="garansi" className="scroll-mt-32">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Layanan After-Sales</h2>
            <p className="text-gray-500 text-lg">Kami menjamin kualitas produk kami. Ajukan klaim garansi dengan mudah jika terdapat kendala.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-[#F4F2FF] rounded-3xl p-8 lg:p-10 border border-[#E0DDF7] text-[#4F45B6] h-full flex flex-col justify-center shadow-sm">
              <h3 className="font-black text-2xl mb-8 flex items-center"><FiTool className="mr-3 w-8 h-8"/> Info Layanan Garansi</h3>
              <ul className="space-y-6 text-base">
                <li className="flex items-start"><span className="mr-4 font-black text-xl">•</span> <span>Garansi struktur rangka sofa dan material utama berlaku hingga <strong>5 tahun</strong>.</span></li>
                <li className="flex items-start"><span className="mr-4 font-black text-xl">•</span> <span>Pastikan Anda melampirkan foto kerusakan yang jelas pada form klaim.</span></li>
                <li className="flex items-start"><span className="mr-4 font-black text-xl">•</span> <span>Tim teknisi kami akan merespon tiket Anda maksimal <strong>2x24 jam kerja</strong>.</span></li>
                <li className="flex items-start"><span className="mr-4 font-black text-xl">•</span> <span>Untuk pertanyaan mendesak, silakan gunakan fitur Live Chat yang ada di pojok kanan bawah.</span></li>
              </ul>
            </div>
            <div className="h-full">
              <CRMTicketGaransi />
            </div>
          </div>
        </section>

        {/* SECTION: KONTAK KAMI */}
        <section id="kontak" className="scroll-mt-32">
          <ContactUs />
        </section>

      </div>

      {/* FOOTER */}
      <GuestFooter />

      {/* Floating Chat Widget */}
      <CRMChatWidget />
    </div>
  );
};

export default GuestDashboard;
