import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Mail, 
  Smartphone,
  Coins,
  LayoutGrid,
  BookMarked,
  BadgeDollarSign,
  CreditCard,
  Sparkles,
  Users,
  ShoppingBag,
  Award,
  Wrench
} from 'lucide-react';

import LogoImage from '../assets/logoproject.png'; 

const EXACT_THEME_COLOR = "#4F45B6";
const ACTIVE_BG_COLOR = "#F4F2FF";
const INACTIVE_COLOR = "#D1D5DB";

// BAGIAN INI YANG KITA SESUAIKAN DENGAN App.jsx KAMU
const menuItems = [
  { icon: Home,            path: '/dashboard' },          
  { icon: ShoppingBag,     path: '/orders' },
  { icon: Users,           path: '/user' },
  { icon: Award,           path: '/membership-admin' },
  { icon: Wrench,          path: '/warranty-admin' },
  { icon: Smartphone,      path: '/product' }, 
  { icon: Mail,            path: '/chat' },      
  { icon: BadgeDollarSign, path: '/review' },    
  { icon: Sparkles,        path: '/fitur-baru' },
];

const Sidebar = () => {
  return (
    <aside className="w-[104px] min-h-screen bg-white border-r border-gray-100 flex flex-col items-center py-8 font-['Cairo'] shrink-0 relative z-10">
      
      {/* Logo */}
      <div className="w-[52px] h-[52px] mb-10">
        <img 
          src={LogoImage} 
          alt="Logo" 
          className="w-full h-full object-cover rounded-xl shadow-sm" 
        />
      </div>

      {/* Menu Icons */}
      <nav className="flex flex-col w-full gap-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/'}
            className="w-full relative flex items-center justify-center h-14"
          >
            {({ isActive }) => (
              <>
                <div 
                  className="w-[48px] h-[48px] rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ 
                    backgroundColor: isActive ? ACTIVE_BG_COLOR : 'transparent' 
                  }}
                >
                  <item.icon 
                    size={22}
                    strokeWidth={isActive ? 2 : 1.8}
                    fill={isActive ? EXACT_THEME_COLOR : 'none'}
                    style={{ 
                      color: isActive ? EXACT_THEME_COLOR : INACTIVE_COLOR,
                      transition: 'color 0.2s ease, fill 0.2s ease'
                    }} 
                  />
                </div>
                
                {/* Garis indikator kanan */}
                {isActive && (
                  <div 
                    className="absolute right-0 w-[5px] h-8 rounded-l-full"
                    style={{ backgroundColor: EXACT_THEME_COLOR }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
    </aside>
  );
};

export default Sidebar;