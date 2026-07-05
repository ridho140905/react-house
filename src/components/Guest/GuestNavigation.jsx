import React, { useEffect } from 'react';
import { LogOut, LogIn, UserPlus, Gift } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ProfilePhoto from '../../assets/foto.jpeg'; 
import LogoImage from '../../assets/logoproject.png';
import { useAuth } from '../../contexts/AuthContext';

const GuestNavigation = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const EXACT_THEME_COLOR = "#4F45B6";

  const handleLogout = async () => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin logout?");
    if (konfirmasi) {
      await signOut();
      navigate("/guest-dashboard");
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (window.location.pathname !== '/guest-dashboard') {
      // Jika di halaman /membership misalnya, dan mau scroll ke 'katalog', navigasikan dulu ke guest-dashboard
      navigate('/guest-dashboard#' + id);
    }
  };

  return (
    <nav className="flex items-center justify-between w-full px-8 py-4 bg-white font-['Cairo'] border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      
      {/* Logo & Brand */}
      <Link to="/guest-dashboard" className="flex items-center gap-3 cursor-pointer">
        <img src={LogoImage} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
        <span className="text-xl font-black tracking-tight text-gray-800">FurnitureQ</span>
      </Link>

      {/* Center Links */}
      <div className="hidden lg:flex items-center gap-8 font-bold text-gray-500 text-sm">
        <button onClick={() => scrollToSection('hero')} className="hover:text-[#4F45B6] transition-colors">Home</button>
        <button onClick={() => scrollToSection('profil')} className="hover:text-[#4F45B6] transition-colors">Profil</button>
        <Link to="/membership" className="hover:text-[#4F45B6] transition-colors">Membership</Link>
        <button onClick={() => scrollToSection('katalog')} className="hover:text-[#4F45B6] transition-colors">Katalog & Testimoni</button>
        <button onClick={() => scrollToSection('garansi')} className="hover:text-[#4F45B6] transition-colors">Layanan</button>
        <button onClick={() => scrollToSection('kontak')} className="hover:text-[#4F45B6] transition-colors">Hubungi</button>
      </div>

      {/* Kanan: Profile & Logout ATAU Login & Register */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link 
              to={profile?.role === 'admin' ? "/admin-dashboard" : "/member-dashboard"}
              className="flex items-center gap-2 px-4 py-2 bg-[#F4F2FF] text-[#4F45B6] rounded-xl hover:bg-[#EBE9FE] transition-colors font-bold text-sm mr-2"
            >
              <Gift className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden lg:inline">Ke Dashboard</span>
            </Link>

            <div className="flex items-center gap-3 text-right">
              <div className="flex flex-col justify-center">
                <span className="text-sm font-bold text-gray-900 leading-tight">
                  {profile?.full_name || user?.user_metadata?.full_name || "Pengguna"}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <img src={ProfilePhoto} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="w-[1px] h-8 bg-gray-200 shrink-0 mx-2"></div>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-bold text-sm"
            >
              <LogOut className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/member-dashboard"
              className="flex items-center gap-2 px-4 py-2 bg-[#F4F2FF] text-[#4F45B6] rounded-xl hover:bg-[#EBE9FE] transition-colors font-bold text-sm mr-2"
            >
              <Gift className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden lg:inline">Portal Benefit</span>
            </Link>

            <Link 
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-[#4F45B6] font-bold text-sm hover:bg-[#F4F2FF] rounded-xl transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk</span>
            </Link>
            <Link 
              to="/register"
              className="flex items-center gap-2 px-4 py-2 bg-[#4F45B6] text-white font-bold text-sm rounded-xl hover:bg-[#3c348f] transition-colors shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default GuestNavigation;
