import React from 'react';
import LogoImage from '../../assets/logoproject.png';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const GuestFooter = () => {
  return (
    <footer className="bg-[#1a1b2e] text-white pt-16 pb-8 mt-20 border-t-4 border-[#4F45B6]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Kolom 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={LogoImage} alt="Logo" className="w-10 h-10 rounded-lg object-cover bg-white" />
              <span className="text-2xl font-black tracking-tight">FurnitureKu</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Solusi interior modern untuk rumah impian Anda. Kami menyediakan berbagai pilihan furniture berkualitas tinggi dengan layanan Membership eksklusif.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4F45B6] hover:text-white transition-all">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4F45B6] hover:text-white transition-all">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4F45B6] hover:text-white transition-all">
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Tautan Cepat
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#4F45B6] rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white hover:translate-x-2 transition-all">Beranda</button></li>
              <li><button onClick={() => document.getElementById('profil')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white hover:translate-x-2 transition-all">Profil Perusahaan</button></li>
              <li><button onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white hover:translate-x-2 transition-all">Program Membership</button></li>
              <li><button onClick={() => document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white hover:translate-x-2 transition-all">Katalog Produk</button></li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Kami */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Layanan Pelanggan
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#4F45B6] rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><button onClick={() => document.getElementById('garansi')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white hover:translate-x-2 transition-all">Klaim Garansi</button></li>
              <li><a href="#" className="hover:text-white hover:translate-x-2 transition-all">Pusat Bantuan (FAQ)</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-2 transition-all">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-2 transition-all">Kebijakan Privasi</a></li>
            </ul>
          </div>

          {/* Kolom 4: Hubungi Kami */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Hubungi Kami
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#4F45B6] rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-[#4F45B6] shrink-0 mt-0.5" />
                <span>Jl. Soekarno Hatta No. 236, Pekanbaru, Riau</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-[#4F45B6] shrink-0" />
                <span>(021) 1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-[#4F45B6] shrink-0" />
                <span>cs@furnitureku.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} FurnitureKu - Antigravity. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span className="hover:text-white cursor-pointer transition-colors">Dibuat oleh Ridho Prasetyo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GuestFooter;
