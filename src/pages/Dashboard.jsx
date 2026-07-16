import React, { useState, useEffect } from "react";
import { FiBriefcase, FiFileText, FiUsers, FiDollarSign } from "react-icons/fi";
import { supabase } from "../lib/supabaseClient";

// Import Komponen
import StatCard from "../components/StatCard";
import VisitorCard from "../components/VisitorCard";
import StatsSummaryBar from "../components/StatsSummaryBar";
import MonthlyBarChart from "../components/MonthlyBarChart";
import UserProfileChart from "../components/Userprofilechart";
import StatisticWeeklyCard from "../components/StatisticWeeklyCard";
import RightSidebar from "../components/RightSidebar";
import UserReviews from "../components/UserReviews";

const Dashboard = () => {
  // --- PENERAPAN useEffect (dan useState) ---
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('id-ID'));
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Fungsi ini berjalan saat komponen dimuat, memperbarui jam setiap 1 detik
    const timerId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);

    const fetchStats = async () => {
      try {
        const [
          { count: productsCount },
          { count: customersCount },
          { data: ordersData }
        ] = await Promise.all([
          supabase.from('products').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('orders').select('total_price, status')
        ]);

        let revenue = 0;
        let ordersCount = 0;
        if (ordersData) {
          ordersCount = ordersData.length;
          revenue = ordersData.reduce((acc, order) => {
            if (order.status !== 'cancelled') {
                return acc + (order.total_price || 0);
            }
            return acc;
          }, 0);
        }

        setStats({
          totalProducts: productsCount || 0,
          totalCustomers: customersCount || 0,
          totalOrders: ordersCount || 0,
          totalRevenue: revenue
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    
    fetchStats();

    // Cleanup: Menghentikan interval saat pindah dari halaman Dashboard
    return () => clearInterval(timerId);
  }, []);

  const summaryCardsData = [
    { icon: FiBriefcase,  label: "Jumlah Produk",     value: stats.totalProducts.toString(), iconBg: "#F4F2FF", iconColor: "#5D5FEF" },
    { icon: FiFileText,   label: "Jumlah Pesanan",    value: stats.totalOrders.toString(), iconBg: "#FFF8E5", iconColor: "#FFB800" },
    { icon: FiUsers,      label: "Jumlah Pelanggan",  value: stats.totalCustomers.toString(), iconBg: "#FFF2E5", iconColor: "#FF7A00" },
    { icon: FiDollarSign, label: "Pendapatan",        value: `Rp ${stats.totalRevenue.toLocaleString("id-ID")}`, iconBg: "#E5F7F1", iconColor: "#00B074" },
  ];

  return (
    <div className="flex -mx-8 -my-8 min-h-screen bg-[#FBFBFB]">

      {/* AREA KIRI: Konten Utama */}
      <div className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 font-['Cairo']">Dashboard</h1>
          <div className="bg-purple-50 border border-purple-100 text-purple-700 px-4 py-2 rounded-xl font-bold text-sm shadow-sm flex items-center space-x-2">
            <span>Waktu:</span>
            <span>{currentTime}</span>
          </div>
        </div>

        {/* Row 1: 4 StatCard (2x2) + VisitorCard */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 grid grid-cols-2 gap-6">
            {summaryCardsData.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>
          <div className="col-span-1">
            <VisitorCard value={stats.totalCustomers.toString()} />
          </div>
        </div>

        {/* Row 2: StatsSummaryBar + MonthlyBarChart dalam 1 card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-50">
          <div className="px-8 pt-6 pb-5 border-b border-gray-50">
            <StatsSummaryBar totalCustomers={stats.totalCustomers.toString()} newUser={49} growth="+10%" />
          </div>
          <div className="px-4 py-4">
            <MonthlyBarChart defaultActive="Jun" />
          </div>
        </div>

        {/* Row 3: UserProfileChart | StatisticWeeklyCard */}
        <div className="grid grid-cols-4 gap-6">
          {/* UserProfile — 1 kolom */}
          <div className="col-span-1">
            <UserProfileChart />
          </div>
          {/* Statistic + Weekly — 3 kolom */}
          <div className="col-span-3">
            <StatisticWeeklyCard
              thisWeek="+20%"
              lastWeek="+13%"
              impression="12.345"
              growth="5.4%"
            />
          </div>
        </div>

        {/* Row 4: Footer (User Reviews) */}
        <UserReviews />
      </div>

      {/* AREA KANAN: Right Sidebar */}
      <div className="hidden 2xl:block">
        <RightSidebar />
      </div>

    </div>
  );
};

export default Dashboard;
