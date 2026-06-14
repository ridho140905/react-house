import React, { useContext } from 'react';
import { Home, ShoppingBag, Award, Wrench } from 'lucide-react';
import LogoImage from '../../assets/logoproject.png'; 
import { GuestContext } from '../../layouts/GuestLayout';

const EXACT_THEME_COLOR = "#4F45B6";
const ACTIVE_BG_COLOR = "#F4F2FF";
const INACTIVE_COLOR = "#D1D5DB";

const menuItems = [
  { id: 'catalog', icon: Home, label: 'Katalog Produk' },          
  { id: 'orders', icon: ShoppingBag, label: 'Pesanan Saya' },      
  { id: 'loyalty', icon: Award, label: 'Loyalty Member' }, 
  { id: 'warranty', icon: Wrench, label: 'Layanan Garansi' },      
];

const GuestSidebar = () => {
  const { activeTab, setActiveTab } = useContext(GuestContext);

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
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="w-full relative flex items-center justify-center h-14 group"
              title={item.label}
            >
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
              
              {isActive && (
                <div 
                  className="absolute right-0 w-[5px] h-8 rounded-l-full"
                  style={{ backgroundColor: EXACT_THEME_COLOR }}
                />
              )}
            </button>
          );
        })}
      </nav>
      
    </aside>
  );
};

export default GuestSidebar;
