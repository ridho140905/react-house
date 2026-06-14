import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from '../../assets/foto.jpeg'; 
import LogoImage from '../../assets/logoproject.png';

const GuestNavigation = () => {
  const navigate = useNavigate();
  const EXACT_THEME_COLOR = "#4F45B6";
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("user");
    if (!session) {
      navigate("/login");
    } else {
      try {
        setUserData(JSON.parse(session));
      } catch (e) {
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin logout?");
    if (konfirmasi) {
      localStorage.removeItem("user");
      setUserData(null);
      navigate("/login");
    }
  };

  if (!userData) {
    return <div className="h-20 bg-white border-b border-gray-100 w-full animate-pulse"></div>;
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="flex items-center justify-between w-full px-8 py-4 bg-white font-['Cairo'] border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      
      {/* Logo & Brand */}
      <div className="flex items-center gap-3">
        <img src={LogoImage} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
        <span className="text-xl font-black tracking-tight text-gray-800">FurnitureKu</span>
      </div>

      {/* Center Links */}
      <div className="hidden lg:flex items-center gap-8 font-bold text-gray-500 text-sm">
        <button onClick={() => scrollToSection('hero')} className="hover:text-[#4F45B6] transition-colors">Home</button>
        <button onClick={() => scrollToSection('profil')} className="hover:text-[#4F45B6] transition-colors">Profil</button>
        <button onClick={() => scrollToSection('membership')} className="hover:text-[#4F45B6] transition-colors">Membership</button>
        <button onClick={() => scrollToSection('katalog')} className="hover:text-[#4F45B6] transition-colors">Katalog & Pesanan</button>
        <button onClick={() => scrollToSection('garansi')} className="hover:text-[#4F45B6] transition-colors">Layanan</button>
        <button onClick={() => scrollToSection('kontak')} className="hover:text-[#4F45B6] transition-colors">Hubungi</button>
      </div>

      {/* Kanan: Profile & Logout */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 text-right">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 leading-tight">{userData.name}</span>
            <span className="text-xs text-[#4F45B6] font-bold leading-tight mt-0.5 uppercase tracking-wider">Guest</span>
          </div>
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src={ProfilePhoto} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="w-[1px] h-8 bg-gray-200 shrink-0"></div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-bold text-sm"
        >
          <LogOut className="w-4 h-4" strokeWidth={2.5} />
          <span>Keluar</span>
        </button>
      </div>
    </nav>
  );
};

export default GuestNavigation;
