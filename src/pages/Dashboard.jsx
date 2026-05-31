import React from "react";
import { FiBriefcase, FiFileText, FiUsers, FiDollarSign } from "react-icons/fi";

// Import Komponen
import StatCard from "../components/StatCard";
import VisitorCard from "../components/VisitorCard";
import StatsSummaryBar from "../components/StatsSummaryBar";
import MonthlyBarChart from "../components/MonthlyBarChart";
import UserProfileChart from "../components/Userprofilechart";
import StatisticWeeklyCard from "../components/StatisticWeeklyCard";
import RightSidebar from "../components/RightSidebar";
import UserReviews from "../components/UserReviews";

const summaryCards = [
  { icon: FiBriefcase,  label: "Projects",     value: "932", iconBg: "#F4F2FF", iconColor: "#5D5FEF" },
  { icon: FiFileText,   label: "Side Projects", value: "932", iconBg: "#FFF8E5", iconColor: "#FFB800" },
  { icon: FiUsers,      label: "Invesment",     value: "932", iconBg: "#FFF2E5", iconColor: "#FF7A00" },
  { icon: FiDollarSign, label: "Assets",        value: "932", iconBg: "#E5F7F1", iconColor: "#00B074" },
];

const Dashboard = () => {
  return (
    <div className="flex -mx-8 -my-8 min-h-screen bg-[#FBFBFB]">

      {/* AREA KIRI: Konten Utama */}
      <div className="flex-1 p-8 space-y-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 font-['Cairo']">Dashboard</h1>

        {/* Row 1: 4 StatCard (2x2) + VisitorCard */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 grid grid-cols-2 gap-6">
            {summaryCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>
          <div className="col-span-1">
            <VisitorCard value="345,678" />
          </div>
        </div>

        {/* Row 2: StatsSummaryBar + MonthlyBarChart dalam 1 card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-50">
          <div className="px-8 pt-6 pb-5 border-b border-gray-50">
            <StatsSummaryBar totalCustomers="345,678" newUser={49} growth="+10%" />
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
