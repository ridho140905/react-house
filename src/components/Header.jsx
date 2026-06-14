import { useState, useEffect } from "react";
import { FaBell, FaSearch, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// IMPORT FOTO DARI FOLDER ASSETS
import myPhoto from "../assets/foto.jpeg"; 

export default function Header() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({ name: "Guest", role: "Guest" });

    // Ambil data session saat komponen dimuat
    useEffect(() => {
        const session = localStorage.getItem("user");
        if (session) {
            try {
                setUserData(JSON.parse(session));
            } catch (e) {
                console.error("Gagal membaca session data", e);
            }
        }
    }, []);

    // Fungsi untuk Logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div id="header-container" className="flex justify-between items-center p-4 relative mb-2">
            
            {/* Search Bar - Klik untuk buka modal */}
            <div id="search-bar" className="relative w-full max-w-xs">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search..."
                    readOnly
                    onClick={() => setIsModalOpen(true)}
                    className="border border-gray-200 p-2 pr-10 bg-white w-full rounded-xl outline-none cursor-pointer hover:border-ungu transition-all shadow-sm"
                />
                <FaSearch id="search-icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* MODAL SEARCH */}
            {isModalOpen && (
                <div id="search-modal-overlay" className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div id="search-modal-content" className="bg-white p-6 rounded-2xl w-full max-w-xl relative shadow-2xl animate-in fade-in zoom-in duration-200">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-merah transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Pencarian Cepat</h2>
                        <div className="relative">
                            <input 
                                autoFocus
                                type="text" 
                                placeholder="Ketik nama produk..."
                                className="w-full border-b-2 border-ungu p-3 text-lg outline-none focus:bg-purple-50 transition-colors rounded-t-md"
                            />
                            <FaSearch className="absolute right-3 top-4 text-ungu" />
                        </div>
                    </div>
                </div>
            )}

            {/* Icon & Profile Section */}
            <div id="icons-container" className="flex items-center space-x-6 ml-auto">
                
                {/* Search icon buat mobile */}
                <button className="text-gray-400 hover:text-ungu transition-colors md:hidden">
                    <FaSearch size={18} />
                </button>

                {/* STRATEGI BARU: Tombol Logout ditaruh paling kiri sebelum ikon negara */}
                <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-xl transition-all shadow-sm border border-red-200"
                    title="Logout dari Akun"
                >
                    <FaSignOutAlt size={16} className="shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">Logout</span>
                </button>

                {/* Elemen Pilihan Negara / Bahasa bawaan template Anda */}
                <div className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" 
                        alt="US Flag" 
                        className="w-5 h-3.5 rounded-sm object-cover"
                    />
                    <span className="text-xs font-medium hidden md:inline">English (US)</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {/* Icon Chat Bawaan Template */}
                <button className="text-gray-400 hover:text-ungu transition-colors relative">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">2</span>
                </button>

                {/* Bell Icon dengan titik oranye */}
                <button className="text-gray-400 hover:text-ungu transition-colors relative">
                    <FaBell size={19} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-oranye rounded-full border-2 border-[#f8f9fc]"></span>
                </button>

                {/* Icon Setting Bawaan Template */}
                <button className="text-gray-400 hover:text-ungu transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>

                {/* Profile Section */}
                <div id="profile-container" className="flex items-center space-x-3 pl-2 border-l border-gray-200">
                    <img
                        id="profile-avatar"
                        src={myPhoto} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-purple-500 bg-purple-100"
                        alt="Profile"
                    />
                    <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-gray-800 leading-none mb-1">{userData.name}</p>
                        <p className="text-xs font-medium text-gray-400 capitalize leading-none">{userData.role}</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
}