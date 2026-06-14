import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, MessageSquareText, Bell, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mengimpor foto profil dari folder assets
import ProfilePhoto from '../assets/foto.jpeg';

const Navigation = () => {
  const navigate = useNavigate();
  const EXACT_THEME_COLOR = "#4F45B6";

  // Inisialisasi awal di-set ke null agar tidak bocor data default
  const [userData, setUserData] = useState(null);

  // PROTEKSI ROUTE: Ambil data session saat komponen dimuat
  useEffect(() => {
    const session = localStorage.getItem("user");
    if (!session) {
      // JIKA SESSION KOSONG, TENDANG LANGSUNG KE LOGIN (Anti tembak URL)
      navigate("/login");
    } else {
      try {
        setUserData(JSON.parse(session));
      } catch (e) {
        console.error("Gagal membaca session data", e);
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  }, [navigate]);

  // Fungsi untuk Logout (Dibersihkan total)
  const handleLogout = () => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin logout?");
    if (konfirmasi) {
      // 1. Hapus dari penyimpanan browser
      localStorage.removeItem("user");
      
      // 2. Hapus dari state React (Biar hantu session-nya hilang)
      setUserData(null);
      
      // 3. Pindah ke login
      navigate("/login");
    }
  };

  // Jika userData belum siap/null, tampilkan loading kosong atau jangan render dulu demi keamanan
  if (!userData) {
    return <div className="h-16 bg-white border-b border-gray-100 w-full animate-pulse"></div>;
  }

  return (
    <nav className="flex items-center justify-between w-full px-8 py-4 bg-white font-['Cairo'] border-b border-gray-100 shrink-0 relative z-50">
      
      {/* Kiri: Search Bar */}
      <div className="flex items-center bg-[#F4F2FF] rounded-full px-4 py-2 w-80">
        <Search className="w-5 h-5 mr-3" style={{ color: EXACT_THEME_COLOR }} strokeWidth={2.5} />
        <input 
          type="text" 
          placeholder="Search here..." 
          className="bg-transparent border-none outline-none text-sm text-gray-600 font-semibold w-full placeholder:text-gray-400 placeholder:font-normal"
        />
      </div>

      {/* Kanan: Actions & Profile */}
      <div className="flex items-center gap-8">
        
        {/* Tombol Logout di samping negara */}
        <button 
          onClick={handleLogout}
          title="Logout Akun"
          className="flex items-center gap-1.5 text-red-500 hover:text-red-700 transition-colors font-semibold text-sm group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
          <span className="hidden sm:inline">Logout</span>
        </button>

        {/* Language Selector */}
        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors">
          <img 
            src="https://flagcdn.com/w20/us.png" 
            alt="US Flag" 
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-900">English (US)</span>
          <ChevronDown className="w-4 h-4 text-gray-400" strokeWidth={2} />
        </button>

        {/* Notification Icons */}
        <div className="flex items-center gap-6">
          {/* Messages */}
          <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
            <MessageSquareText className="w-6 h-6" strokeWidth={2} />
            <span 
              className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-white text-[10px] font-bold rounded-full border-2 border-white box-content"
              style={{ backgroundColor: EXACT_THEME_COLOR }}
            >
              2
            </span>
          </button>
          
          {/* Bell */}
          <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-6 h-6" strokeWidth={2} />
            <span 
              className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-white text-[10px] font-bold rounded-full border-2 border-white box-content"
              style={{ backgroundColor: EXACT_THEME_COLOR }}
            >
              2
            </span>
          </button>
          
          {/* Settings */}
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-8 bg-gray-200 shrink-0"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img 
              src={ProfilePhoto} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 leading-tight">{userData.name}</span>
            <span className="text-xs text-gray-400 font-semibold leading-tight mt-0.5">{userData.role}</span>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;