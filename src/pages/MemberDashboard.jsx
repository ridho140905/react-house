import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { FaShoppingCart, FaHistory, FaBoxOpen, FaPlus, FaTrashAlt, FaStar, FaCreditCard, FaTag, FaGift, FaArrowRight, FaQrcode, FaUserFriends, FaCalendarAlt, FaBirthdayCake, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MemberDashboard = () => {
  const { profile, user, refreshProfile } = useAuth();
  const { cart, addToCart, removeFromCart, calculateTotal, clearCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [claimedBenefits, setClaimedBenefits] = useState([]);

  useEffect(() => {
    fetchOrders();
    const savedClaims = localStorage.getItem(`claims_${user?.id}`);
    if (savedClaims) {
      setClaimedBenefits(JSON.parse(savedClaims));
    }
  }, [profile, user]);

  const fetchOrders = async () => {
    if(!profile) return;
    const { data, error } = await supabase.from('orders').select('*').eq('user_id', profile.id).order('created_at', { ascending: false });
    if (error) {
      console.error(error);
    }
    setOrders(data || []);
  };

  const handleCheckout = async () => {
    if(cart.length === 0) return alert('Keranjang Anda kosong!');
    
    const currentUserId = profile?.id || user?.id;
    if (!currentUserId) return alert('Error: User ID tidak ditemukan. Silakan login ulang.');

    const { finalTotal, pointsEarned } = calculateTotal();
    
    try {
      if (!profile) {
        await supabase.from('profiles').insert({
          id: currentUserId,
          full_name: user?.user_metadata?.full_name || 'Member',
          role: 'member'
        });
      }

      const { error } = await supabase.from('orders').insert({
        user_id: currentUserId,
        total_price: finalTotal,
        points_earned: pointsEarned,
        status: 'pending'
      });
      if(error) throw error;
      
      // Pastikan points terupdate
      const currentPoints = profile?.total_points || 0;
      const { error: updateError } = await supabase.from('profiles').upsert({ 
        id: currentUserId,
        full_name: profile?.full_name || user?.user_metadata?.full_name || 'Member',
        role: profile?.role || 'member',
        tier: profile?.tier || null,
        total_points: currentPoints + pointsEarned 
      }, { onConflict: 'id' });
      
      if(updateError) throw updateError;

      if (refreshProfile) await refreshProfile();

      alert('YAY! Berhasil melakukan Checkout pesanan Anda!');
      clearCart();
      fetchOrders();
    } catch(err) {
      alert('Error saat checkout: ' + err.message);
    }
  };

  const { subtotal, discountAmount, finalTotal, pointsEarned } = calculateTotal();

  // Data Rewards
  const rewards = [
    { id: 1, title: "Voucher Diskon Rp 50.000", cost: 300, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", tag: "FURNITURE" },
    { id: 2, title: "Gratis Biaya Rakit", cost: 150, image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", tag: "SERVICES" },
    { id: 3, title: "Gratis Ongkir se-Pekanbaru", cost: 500, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", tag: "SHIPPING" },
  ];

  const handleClaim = async (reward) => {
    const currentPoints = profile?.total_points || 0;
    if (currentPoints >= reward.cost) {
      try {
        const currentUserId = profile?.id || user?.id;
        if (!currentUserId) throw new Error("User ID tidak ditemukan");

        const newPoints = currentPoints - reward.cost;
        
        // Gunakan upsert (POST) sebagai pengganti update (PATCH) untuk menghindari error CORS/Network Block "Failed to fetch"
        const { error } = await supabase.from('profiles').upsert({ 
          id: currentUserId,
          full_name: profile?.full_name || user?.user_metadata?.full_name || 'Member',
          role: profile?.role || 'member',
          tier: profile?.tier || null,
          total_points: newPoints 
        }, { onConflict: 'id' });
        
        if(error) throw error;

        const newClaims = [...claimedBenefits, reward.id];
        setClaimedBenefits(newClaims);
        localStorage.setItem(`claims_${user?.id}`, JSON.stringify(newClaims));

        if (refreshProfile) refreshProfile();
        alert(`Berhasil menukarkan reward: ${reward.title}!`);
      } catch (err) {
        alert("Gagal menukarkan poin: " + err.message);
      }
    }
  };

  const getTierBenefits = (tier) => {
    const t = tier?.toLowerCase();
    if (t === 'platinum') return ['Diskon Belanja 15%', '2x Poin Reward', 'Prioritas Pengiriman', 'Layanan Pelanggan VVIP'];
    if (t === 'gold') return ['Diskon Belanja 10%', '1.5x Poin Reward', 'Gratis Biaya Rakit'];
    if (t === 'silver') return ['Diskon Belanja 5%', '1x Poin Reward'];
    return ['Dapatkan poin setiap belanja', 'Akses promo spesial'];
  };

  const currentPoints = profile?.total_points || 0;

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8 font-['Cairo']">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Rewards Top Area (Card + Benefits) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card Rewards (Theme Color) */}
          <div className="bg-gradient-to-br from-[#4F45B6] to-[#3c348f] rounded-3xl p-8 text-white shadow-xl shadow-[#4F45B6]/30 relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
            
            <div className="relative z-10 flex justify-between items-start mb-12">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider opacity-90 mb-1">Available Points</p>
                <h2 className="text-6xl font-black">{currentPoints}</h2>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold border border-white/30">
                <FaStar className="text-yellow-300" /> VERIFIED {profile?.tier?.toUpperCase() || 'MEMBER'}
              </div>
            </div>
            
            <div className="relative z-10 flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold mb-1">{profile?.full_name || user?.user_metadata?.full_name || "Member"}</h3>
                <p className="text-xs uppercase opacity-80 tracking-widest font-bold">Joined 2026</p>
              </div>
              <div className="bg-white text-[#4F45B6] px-4 py-2 rounded-full font-black text-sm shadow-sm flex items-center gap-1">
                <FaStar /> +{currentPoints} POINTS
              </div>
            </div>
          </div>

          {/* Membership Benefits List */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-12 h-12 rounded-xl bg-[#F4F2FF] text-[#4F45B6] flex items-center justify-center">
                 <FaStar className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="text-xl font-black text-gray-900">Benefit {profile?.tier || 'Member'} Anda</h3>
                 <p className="text-sm text-gray-500 font-medium">Keuntungan khusus tier Anda saat ini</p>
               </div>
             </div>
             <div className="space-y-4">
               {getTierBenefits(profile?.tier).map((benefit, idx) => (
                 <div key={idx} className="flex items-center gap-3">
                   <FaCheckCircle className="text-green-500 text-lg shrink-0" />
                   <span className="font-bold text-gray-700">{benefit}</span>
                 </div>
               ))}
             </div>
             
             {/* Progress Bar (Reward Ready) */}
             <div className="mt-8">
                <p className="text-sm font-bold text-gray-900 mb-2">Reward Ready</p>
                <div className="w-full h-3 bg-[#F4F2FF] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#4F45B6] rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((currentPoints / 500) * 100, 100)}%` }}
                  ></div>
                </div>
             </div>
          </div>

        </div>

        {/* Redeem Rewards & Ways to Earn */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Redeem Rewards */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <FaGift className="text-[#4F45B6]"/> Redeem Rewards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rewards.map((reward) => {
                const isClaimed = claimedBenefits.includes(reward.id);
                const canAfford = currentPoints >= reward.cost;
                
                return (
                  <div key={reward.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-md transition-shadow">
                    <div className="h-40 w-full relative overflow-hidden">
                      <img src={reward.image} alt={reward.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-black text-gray-900 shadow-sm">
                        {reward.cost} PTS
                      </div>
                      <div className="absolute top-3 right-3 bg-[#4F45B6] px-3 py-1 rounded-full text-xs font-black text-white shadow-sm">
                        {reward.tag}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{reward.title}</h3>
                      <p className="text-xs text-gray-500 mb-4 font-medium">
                        {isClaimed ? "Telah ditukarkan" : canAfford ? "Tersedia untuk ditukar" : `Butuh ${reward.cost - currentPoints} poin lagi`}
                      </p>
                      <button 
                        onClick={() => handleClaim(reward)}
                        disabled={!canAfford || isClaimed}
                        className={`mt-auto w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                          isClaimed ? "bg-gray-100 text-gray-400 cursor-not-allowed" :
                          canAfford ? "bg-[#F4F2FF] hover:bg-[#EBE9FE] text-[#4F45B6]" : "bg-gray-50 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {isClaimed ? "REDEEMED" : "REDEEM REWARD"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ways to Earn */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Ways to Earn</h2>
            <div className="space-y-3">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-[#4F45B6]/30 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F4F2FF] rounded-xl flex items-center justify-center text-[#4F45B6] group-hover:bg-[#4F45B6] group-hover:text-white transition-colors">
                    <FaShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Belanja Furniture</h4>
                    <p className="text-xs font-medium text-gray-500">Dapat poin dari setiap belanja</p>
                  </div>
                </div>
                <FaArrowRight className="text-gray-300 group-hover:text-[#4F45B6] transition-colors" />
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-[#4F45B6]/30 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F4F2FF] rounded-xl flex items-center justify-center text-[#4F45B6] group-hover:bg-[#4F45B6] group-hover:text-white transition-colors">
                    <FaUserFriends className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Ajak Teman</h4>
                    <p className="text-xs font-medium text-gray-500">Dapatkan 500 poin per referral</p>
                  </div>
                </div>
                <FaArrowRight className="text-gray-300 group-hover:text-[#4F45B6] transition-colors" />
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-[#4F45B6]/30 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F4F2FF] rounded-xl flex items-center justify-center text-[#4F45B6] group-hover:bg-[#4F45B6] group-hover:text-white transition-colors">
                    <FaBirthdayCake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Bonus Ulang Tahun</h4>
                    <p className="text-xs font-medium text-gray-500">2x Poin di bulan ulang tahun</p>
                  </div>
                </div>
                <FaArrowRight className="text-gray-300 group-hover:text-[#4F45B6] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Konten Utama: Keranjang & Checkout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Kolom Kiri: Daftar Item Keranjang */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                  <FaShoppingCart className="text-[#4F45B6]" /> Keranjang Belanja
                </h2>
                <span className="bg-[#F4F2FF] text-[#4F45B6] font-black px-3 py-1 rounded-lg text-sm">
                  {cart.length} item
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                     <FaShoppingCart className="text-gray-300 text-4xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Keranjang Anda Kosong</h3>
                  <p className="text-gray-500 font-medium max-w-sm mb-6">
                    Silakan kembali ke halaman utama untuk mencari dan menambahkan furnitur impian Anda ke keranjang.
                  </p>
                  <Link 
                    to="/guest-dashboard"
                    className="bg-[#4F45B6] hover:bg-[#3c348f] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#4F45B6]/30 hover:-translate-y-1"
                  >
                    Mulai Belanja Sekarang
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(c => (
                    <div key={c.id} className="flex flex-col sm:flex-row justify-between sm:items-center bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-[#F4F2FF] rounded-xl flex items-center justify-center text-[#4F45B6]">
                          <FaBoxOpen className="w-10 h-10 opacity-50" />
                        </div>
                        <div>
                          <p className="font-bold text-xl text-gray-900 mb-1">{c.name}</p>
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                            Harga Satuan: Rp {c.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        <div className="bg-gray-50 px-4 py-2 rounded-lg font-bold text-gray-700">
                          Qty: {c.quantity}
                        </div>
                        <p className="font-black text-[#4F45B6] text-xl">
                          Rp {(c.price * c.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Ringkasan Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-[#4F45B6]/5 border border-gray-100 sticky top-8">
              <h2 className="text-xl font-black text-gray-900 mb-6">Ringkasan Belanja</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString()}</span>
                </div>
                
                {discountAmount > 0 ? (
                  <div className="flex justify-between text-green-600 font-bold bg-green-50 p-4 rounded-xl border border-green-100">
                    <span className="flex items-center gap-2"><FaTag /> Diskon ({profile?.tier || 'Member'})</span>
                    <span>- Rp {discountAmount.toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-gray-400 font-medium text-sm">
                    <span className="flex items-center gap-2"><FaTag /> Diskon</span>
                    <span>Rp 0 (Upgrade tier!)</span>
                  </div>
                )}
                
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Total Pembayaran</span>
                    </div>
                    <span className="text-3xl font-black text-gray-900">Rp {finalTotal.toLocaleString()}</span>
                  </div>
                  
                  {pointsEarned > 0 && (
                    <div className="mt-3 bg-yellow-50 text-yellow-700 p-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm border border-yellow-200">
                      <FaStar className="text-yellow-500" />
                      YAY! Anda mendapat +{pointsEarned} Poin
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`w-full py-4 font-black text-lg rounded-2xl transition-all flex items-center justify-center gap-2 ${
                  cart.length === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#4F45B6] hover:bg-[#3c348f] text-white shadow-lg shadow-[#4F45B6]/30 hover:-translate-y-1'
                }`}
              >
                <FaCreditCard /> Proses Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Histori Pesanan (Full Width) */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mt-4 mb-6 flex items-center gap-3">
            <FaHistory className="text-[#4F45B6]" /> Histori Pesanan Anda
          </h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {orders.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <FaHistory className="text-5xl text-gray-200 mb-4" />
                <p className="text-gray-500 font-medium text-lg">Belum ada histori pesanan.</p>
                <p className="text-gray-400 text-sm">Ayo mulai berbelanja dan kumpulkan poin Anda!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F4F2FF]">
                    <tr>
                      <th className="py-5 px-8 font-black text-[#4F45B6] text-sm uppercase tracking-wider">Order ID</th>
                      <th className="py-5 px-8 font-black text-[#4F45B6] text-sm uppercase tracking-wider">Tanggal</th>
                      <th className="py-5 px-8 font-black text-[#4F45B6] text-sm uppercase tracking-wider">Total Harga</th>
                      <th className="py-5 px-8 font-black text-[#4F45B6] text-sm uppercase tracking-wider">Poin Didapat</th>
                      <th className="py-5 px-8 font-black text-[#4F45B6] text-sm uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="py-5 px-8 text-sm font-bold text-gray-600 group-hover:text-[#4F45B6]">#{o.id.slice(0,8)}</td>
                        <td className="py-5 px-8 text-sm text-gray-500 font-medium">{new Date(o.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                        <td className="py-5 px-8 font-black text-gray-900 text-lg">Rp {o.total_price.toLocaleString()}</td>
                        <td className="py-5 px-8">
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg font-bold text-sm flex items-center gap-1 w-max">
                            <FaStar className="w-3 h-3" /> +{o.points_earned}
                          </span>
                        </td>
                        <td className="py-5 px-8">
                          <span className={`px-4 py-1.5 text-xs font-black uppercase rounded-xl tracking-wider ${
                            o.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-[#F4F2FF] text-[#4F45B6]'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
