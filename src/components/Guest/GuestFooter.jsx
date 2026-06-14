import React from 'react';
import LogoImage from '../../assets/logoproject.png';

const GuestFooter = () => {
  return (
    <footer className="bg-[#1a1b2e] text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img src={LogoImage} alt="Logo" className="w-8 h-8 rounded-lg object-cover brightness-0 invert" />
          <span className="text-xl font-bold tracking-tight">FurnitureKu</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 font-semibold">
          <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button>
          <button onClick={() => document.getElementById('profil')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Profil</button>
          <button onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Membership</button>
          <button onClick={() => document.getElementById('garansi')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Layanan</button>
          <button onClick={() => document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Kontak</button>
        </div>
        
        <div className="text-sm text-gray-500 text-center md:text-right">
          &copy; 2026 Antigravity. All rights reserved. <br/> Furniture Modern Indonesia.
        </div>
      </div>
    </footer>
  );
};

export default GuestFooter;
