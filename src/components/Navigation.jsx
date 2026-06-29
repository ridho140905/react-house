import React from 'react';
import { Search, ChevronDown, MessageSquareText, Bell, Settings, LogOut, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

// Mengimpor foto profil dari folder assets
import ProfilePhoto from '../assets/foto.jpeg';

const Navigation = () => {
  const navigate = useNavigate();
  const { session, profile, signOut } = useAuth();
  const { cart } = useCart();
  const EXACT_THEME_COLOR = "#4F45B6";

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Fungsi untuk Logout (Dibersihkan total)
  const handleLogout = async () => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin logout?");
    if (konfirmasi) {
      await signOut();
      navigate("/login");
    }
  };

  // Jika belum ada session, tampilkan loading kosong
  if (!session) {
    return <div className="h-16 bg-white border-b border-gray-100 w-full animate-pulse"></div>;
  }

  // Gunakan fallback jika profile null (karena delay sinkronisasi tabel)
  const safeProfile = profile || {
    full_name: session?.user?.user_metadata?.full_name || 'Member',
    role: session?.user?.user_metadata?.role || 'member'
  };

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
          {/* Cart Icon */}
          <button 
            onClick={() => navigate(safeProfile.role === 'admin' ? '/admin-dashboard' : '/member-dashboard')} 
            className="relative text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" strokeWidth={2} style={{ color: totalCartItems > 0 ? EXACT_THEME_COLOR : undefined }} />
            {totalCartItems > 0 && (
              <span 
                className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-white text-[10px] font-bold rounded-full border-2 border-white box-content"
                style={{ backgroundColor: EXACT_THEME_COLOR }}
              >
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Messages */}
          <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
            <MessageSquareText className="w-6 h-6" strokeWidth={2} />
          </button>
          
          {/* Bell */}
          <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-6 h-6" strokeWidth={2} />
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
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-100 flex-shrink-0">
            <img 
              src={ProfilePhoto} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 leading-tight">{safeProfile.full_name}</span>
            <span className="text-xs text-gray-400 font-semibold leading-tight mt-0.5 capitalize">{safeProfile.role}</span>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;