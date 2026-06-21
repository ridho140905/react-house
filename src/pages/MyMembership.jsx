import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { membershipTiers } from "../data/membershipData";
import { FaGift, FaStar, FaTrophy, FaCheckCircle, FaLock, FaExclamationCircle } from "react-icons/fa";

const MyMembership = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  
  // Ambil tier yang dipilih dari localStorage
  const [activeTierId, setActiveTierId] = useState(null);
  
  const [points, setPoints] = useState(1500);
  const [claimedBenefits, setClaimedBenefits] = useState([]);

  useEffect(() => {
    // Cek user login
    const session = localStorage.getItem("user");
    if (session) {
      setUserData(JSON.parse(session));
    } else {
      navigate("/login");
    }

    // Cek tier yang dipilih
    const savedTier = localStorage.getItem("selectedTier");
    if (savedTier) {
      setActiveTierId(savedTier);
    }

    // Cek poin tersimpan
    const savedPoints = localStorage.getItem("membershipPoints");
    if (savedPoints) {
      setPoints(parseInt(savedPoints));
    } else {
      localStorage.setItem("membershipPoints", "1500");
    }

    // Cek benefit yang sudah diklaim
    const savedClaims = localStorage.getItem("claimedBenefitsList");
    if (savedClaims) {
      setClaimedBenefits(JSON.parse(savedClaims));
    }
  }, []);

  // Jika belum memilih tier, beritahu user untuk memilih dulu
  if (!activeTierId) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4">
        <FaExclamationCircle className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-2">Anda Belum Memilih Membership</h2>
        <p className="text-gray-500 text-center max-w-md mb-6">
          Silakan pilih paket membership yang sesuai dengan kebutuhan Anda terlebih dahulu untuk melihat benefit yang dapat diklaim.
        </p>
        <Link to="/membership" className="px-6 py-3 bg-[#4F45B6] text-white rounded-xl font-bold hover:bg-[#3c348f] transition-all shadow-md">
          Lihat & Pilih Membership
        </Link>
      </div>
    );
  }

  // Ambil data tier yang sedang aktif
  const activeTier = membershipTiers.find((t) => t.id === activeTierId) || membershipTiers[0];

  const handleClaim = (benefitText, cost) => {
    if (claimedBenefits.includes(benefitText)) return;

    if (points >= cost) {
      // Kurangi poin
      const newPoints = points - cost;
      setPoints(newPoints);
      localStorage.setItem("membershipPoints", newPoints.toString());

      // Tambahkan ke daftar klaim
      const newClaims = [...claimedBenefits, benefitText];
      setClaimedBenefits(newClaims);
      localStorage.setItem("claimedBenefitsList", JSON.stringify(newClaims));

      alert(`Berhasil mengklaim: ${benefitText}! \nPoin Anda terpotong ${cost} pts.`);
    } else {
      alert(`Gagal mengklaim! Poin Anda tidak cukup. Butuh ${cost} pts, poin Anda saat ini ${points} pts.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8 font-['Cairo']">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Profil */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#F4F2FF] rounded-2xl flex items-center justify-center text-[#4F45B6]">
              <FaStar className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">
                Halo, {userData?.name || "Pengguna"}!
              </h1>
              <p className="text-gray-500 font-medium">Selamat datang di portal membership Anda.</p>
            </div>
          </div>
          {/* Link ubah paket dihilangkan agar histori pembelian terkunci (sesuai request) */}
        </div>

        {/* Kartu Status Membership Aktif */}
        <div className={`relative rounded-3xl p-8 shadow-xl mb-8 overflow-hidden ${activeTier.color} ${activeTier.id === 'tier-3' ? 'shadow-gray-900/50' : ''}`}>
          {/* Ornamen Background */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10">
            <FaTrophy className="w-64 h-64" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-6">
              Status Anda Saat Ini
            </div>
            
            <h2 className="text-5xl font-black mb-2">{activeTier.name} Member</h2>
            <p className="text-lg opacity-90 max-w-xl mb-8">{activeTier.description}</p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all hover:scale-105">
                <p className="text-sm uppercase tracking-wider font-bold opacity-80 mb-1">Total Poin Belanja</p>
                <p className="text-4xl font-black flex items-center gap-2 text-yellow-300">
                  {points} <span className="text-sm font-normal text-white">pts</span>
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-sm uppercase tracking-wider font-bold opacity-80 mb-1">Kecepatan Poin</p>
                <p className="text-4xl font-black">{activeTier.pointMultiplier}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Daftar Klaim Benefit */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <FaGift className="text-[#4F45B6]" /> Tukarkan Poin Anda
          </h3>
          
          <div className="space-y-4">
            {activeTier.benefits.map((benefit, index) => {
              const isClaimed = claimedBenefits.includes(benefit.text);
              const isAvailable = benefit.included;
              const hasEnoughPoints = points >= benefit.cost;

              return (
                <div 
                  key={index} 
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border transition-all ${
                    !isAvailable 
                      ? "bg-gray-50 border-gray-100 opacity-60 grayscale" 
                      : isClaimed 
                        ? "bg-green-50 border-green-200" 
                        : "bg-white border-gray-200 hover:border-[#4F45B6] hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center shrink-0 ${
                      !isAvailable ? "bg-gray-200 text-gray-400" : isClaimed ? "bg-green-200 text-green-700" : "bg-[#F4F2FF] text-[#4F45B6]"
                    }`}>
                      {!isAvailable ? <FaLock /> : isClaimed ? <FaCheckCircle /> : <FaGift />}
                    </div>
                    <div>
                      <p className={`font-bold text-lg ${!isAvailable ? "text-gray-500 line-through" : "text-gray-900"}`}>
                        {benefit.text}
                      </p>
                      <p className="text-sm font-semibold text-[#4F45B6]">
                        Biaya: {benefit.cost} pts
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {!isAvailable ? "Tingkatkan tier untuk membuka benefit ini." : isClaimed ? "Benefit ini telah aktif/diklaim." : "Tersedia untuk ditukarkan dengan poin Anda."}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleClaim(benefit.text, benefit.cost)}
                    disabled={!isAvailable || isClaimed || (!hasEnoughPoints && !isClaimed)}
                    className={`shrink-0 px-6 py-3 rounded-xl font-bold transition-all w-full sm:w-auto ${
                      !isAvailable
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : isClaimed
                          ? "bg-green-500 text-white cursor-not-allowed"
                          : !hasEnoughPoints
                            ? "bg-red-50 text-red-400 cursor-not-allowed border border-red-100"
                            : "bg-[#4F45B6] hover:bg-[#3c348f] text-white shadow-lg hover:-translate-y-0.5"
                    }`}
                  >
                    {!isAvailable ? "Terkunci" : isClaimed ? "Telah Diklaim" : !hasEnoughPoints ? "Poin Kurang" : "Klaim Benefit"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyMembership;
