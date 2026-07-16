import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

import MemberProfileCard from '../components/member/MemberProfileCard';
import TierBenefits from '../components/member/TierBenefits';
import RewardRedemption from '../components/member/RewardRedemption';
import EarnPointsList from '../components/member/EarnPointsList';
import CartList from '../components/member/CartList';
import CheckoutCard from '../components/member/CheckoutCard';
import OrderHistory from '../components/member/OrderHistory';

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
          <MemberProfileCard 
            currentPoints={currentPoints} 
            profile={profile} 
            user={user} 
          />
          <TierBenefits 
            profile={profile} 
            currentPoints={currentPoints} 
            getTierBenefits={getTierBenefits} 
          />
        </div>

        {/* Redeem Rewards & Ways to Earn */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RewardRedemption 
            rewards={rewards} 
            claimedBenefits={claimedBenefits} 
            currentPoints={currentPoints} 
            handleClaim={handleClaim} 
          />
          <EarnPointsList />
        </div>

        {/* Panduan Belanja & Link ke Guest Dashboard */}
        <div className="bg-gradient-to-r from-[#4F45B6] to-[#6b62d9] rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">💡</span> Panduan Belanja
            </h3>
            <p className="text-purple-100 text-sm md:text-base leading-relaxed">
              Untuk melakukan pembelanjaan, silakan menuju halaman <strong>Guest Dashboard</strong> terlebih dahulu. Temukan produk impian Anda pada <strong>Katalog Produk</strong>, masukkan ke keranjang, lalu klik tombol <strong>Kembali ke Dashboard</strong> di kanan atas untuk menyelesaikan proses <em>Checkout</em> di halaman ini.
            </p>
          </div>
          <Link 
            to="/guest-dashboard"
            className="px-8 py-4 bg-white text-[#4F45B6] font-bold rounded-xl shadow hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Ke Tampilan Guest
          </Link>
        </div>

        {/* Konten Utama: Keranjang & Checkout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <CartList cart={cart} />
          <CheckoutCard 
            subtotal={subtotal} 
            discountAmount={discountAmount} 
            profile={profile} 
            finalTotal={finalTotal} 
            pointsEarned={pointsEarned} 
            cartLength={cart.length} 
            handleCheckout={handleCheckout} 
          />
        </div>

        {/* Histori Pesanan (Full Width) */}
        <OrderHistory orders={orders} />
      </div>
    </div>
  );
};

export default MemberDashboard;
