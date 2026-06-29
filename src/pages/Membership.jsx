import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { membershipTiers } from "../data/membershipData";
import { FaStar } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabaseClient";

const Membership = () => {
  const navigate = useNavigate();
  const { session, profile, loading: authLoading, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  if (authLoading) return <div className="flex justify-center items-center h-screen bg-[#F8F9FA] text-[#4F45B6] font-bold">Loading...</div>;

  // Kondisi 1: Belum Login
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#F8F9FA]">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Benefit Eksklusif Menanti Anda</h2>
        <p className="mb-6 text-gray-500">Silakan login atau daftar untuk mulai berlangganan dan mengklaim benefit.</p>
        <button 
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-[#4F45B6] text-white rounded-lg font-bold hover:bg-[#3c348f] transition-all"
        >
          Login / Register
        </button>
      </div>
    );
  }

  // Kondisi 3: Proses Pembelian/Pemilihan Tier
  const handleSelectTier = async (tierName) => {
    try {
      setLoading(true);
      const currentUserId = profile?.id || session?.user?.id;
      if (!currentUserId) throw new Error("Session tidak ditemukan. Silakan login ulang.");

      // Gunakan UPSERT agar profil dibuat jika belum ada di database
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: currentUserId,
          tier: tierName,
          full_name: profile?.full_name || session?.user?.user_metadata?.full_name || 'Member',
          role: profile?.role || 'member'
        }, { onConflict: 'id' });
      
      if (error) throw error;
      
      // Wajib refresh profile agar Context menyimpan tier yang baru dipilih
      if (refreshProfile) await refreshProfile();
      
      // Langsung arahkan ke dashboard setelah berhasil
      navigate('/member-dashboard');
    } catch (error) {
      alert("Gagal memilih tier: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Selalu tampilkan halaman pemilihan tier
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 font-['Cairo'] bg-[#F8F9FA] min-h-screen flex flex-col justify-center">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4F2FF] text-[#4F45B6] text-sm font-bold uppercase tracking-wider mb-6">
          <FaStar /> Portal Membership
        </div>
        <h2 className="text-4xl leading-10 font-black text-gray-900 sm:text-5xl mb-4">
          Pilih Membership Anda
        </h2>
        <p className="max-w-2xl text-lg text-gray-500 mx-auto font-medium">
          Tingkatkan pengalaman berbelanja Anda dengan bergabung ke tier eksklusif kami dan nikmati berbagai keuntungannya di Dasbor Anda.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3 items-stretch">
        {membershipTiers.map((tier) => {
          const isCurrentTier = profile?.tier?.toLowerCase() === tier.name.toLowerCase();

          return (
            <div
              key={tier.id}
              className={`relative p-8 rounded-3xl flex flex-col transition-all duration-300 ${
                tier.isPopular && !isCurrentTier
                ? "bg-gradient-to-b from-[#4F45B6] to-[#3c348f] text-white shadow-2xl shadow-[#4F45B6]/30 lg:-translate-y-4 border border-[#4F45B6]" 
                : isCurrentTier
                  ? "bg-green-50 border-2 border-green-400 text-gray-900 shadow-md"
                  : "bg-white border border-gray-100 text-gray-900 shadow-sm hover:shadow-md hover:border-gray-300"
              }`}
            >
              {tier.isPopular && !isCurrentTier && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-5 py-2 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <FaStar className="w-3 h-3" /> Paling Diminati
                  </span>
                </div>
              )}
              {isCurrentTier && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-green-500 text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    ✓ Tier Aktif Anda
                  </span>
                </div>
              )}
              
              <div className="mb-8 mt-2">
                <h3 className="text-3xl font-black mb-3">{tier.name}</h3>
                <p className={`text-sm font-medium leading-relaxed ${tier.isPopular && !isCurrentTier ? "text-indigo-100" : "text-gray-500"}`}>
                  {tier.description}
                </p>
              </div>
              
              <div className="mb-8 pb-8 border-b border-opacity-20 border-current">
                <p className="text-4xl font-black mb-3">{tier.price}</p>
                <p className={`text-sm font-bold ${tier.isPopular && !isCurrentTier ? "text-yellow-300" : "text-[#4F45B6]"}`}>
                  Benefit Utama: {tier.pointMultiplier}
                </p>
              </div>
              
              <div className="flex-1 flex flex-col justify-end">
                <button
                  onClick={() => handleSelectTier(tier.name)}
                  disabled={loading || isCurrentTier}
                  className={`w-full py-4 rounded-xl font-black text-center transition-all ${
                    isCurrentTier
                    ? "bg-green-200 text-green-800 cursor-not-allowed"
                    : tier.isPopular 
                      ? "bg-white text-[#4F45B6] hover:bg-gray-50 shadow-lg hover:-translate-y-1" 
                      : "bg-[#F4F2FF] text-[#4F45B6] hover:bg-[#4F45B6] hover:text-white"
                  }`}
                >
                  {loading ? "Memproses..." : isCurrentTier ? "Sedang Digunakan" : `Pilih ${tier.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Membership;
