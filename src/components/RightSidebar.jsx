import React, { useState, useEffect } from "react";
import { MoreVertical, Mail, Bell, ThumbsUp, Layers3, ShoppingBag } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const RightSidebar = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Contacts (profiles)
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8);

        if (profilesData) {
          setContacts(profilesData.map(p => ({
            name: p.full_name || 'User',
            img: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.full_name || 'U')}&background=random`
          })));
        }

        // Fetch Messages (menggunakan warranty_claims)
        const { data: warrantyData } = await supabase
          .from('warranty_claims')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);

        if (warrantyData) {
          setMessages(warrantyData.map(w => ({
            name: w.customer_name || 'Customer',
            desc: w.issue || 'Meminta klaim garansi...',
            char: (w.customer_name || 'C').charAt(0).toUpperCase()
          })));
        }

        // Fetch Activities (menggunakan orders)
        const { data: ordersData } = await supabase
          .from('orders')
          .select('*, profiles:user_id ( full_name )')
          .order('created_at', { ascending: false })
          .limit(4);

        if (ordersData) {
          setActivities(ordersData.map(o => {
            const timeDiffMs = new Date() - new Date(o.created_at);
            const hours = Math.floor(timeDiffMs / (1000 * 60 * 60));
            const timeStr = hours > 0 ? `${hours} Hour Ago` : 'Just Now';
            
            return {
              type: "Order",
              title: "Pesanan Baru",
              desc: `${o.profiles?.full_name || 'Seseorang'} memesan senilai Rp ${(o.total_price || 0).toLocaleString('id-ID')}`,
              time: timeStr,
              icon: ShoppingBag,
              color: "bg-[#FFB800]",
            };
          }));
        }

      } catch (error) {
        console.error("Error fetching RightSidebar data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <aside className="w-[340px] border-l border-gray-100 bg-[#F5EFFC] p-6 space-y-8 font-['Cairo']">
      {/* 1. Server Status */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Server Status</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={20} />
          </button>
        </div>
        {/* Spike Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 mb-4">
          <svg
            width="100%"
            height="80"
            viewBox="0 0 280 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {[
              8, 18, 5, 60, 12, 4, 70, 9, 22, 6, 45, 8, 15, 5, 80, 12, 30, 7,
              55, 10, 20, 6, 40, 9, 18, 5, 65, 11, 28, 7, 50, 10, 35, 8, 75, 14,
              25, 6, 42, 9, 16, 5, 58, 12, 22, 7, 48, 11, 20, 6, 38, 9, 14, 5,
              62, 10, 28, 7, 52, 13, 18, 5, 45, 9, 22, 6, 55, 11, 32, 8, 48, 10,
              25, 7, 60, 12, 20, 6, 42, 9,
            ].map((v, i, arr) => {
              const maxV = 80;
              const count = arr.length;
              const gap = 280 / count;
              const x = i * gap + gap / 2;
              const lineH = (v / maxV) * 76;
              const isRecent = i >= count - 20;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={80}
                  x2={x}
                  y2={80 - lineH}
                  stroke={isRecent ? "#4F45B6" : "#C7C4EC"}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </div>
        {/* Detail Status */}
        <div className="grid grid-cols-3 text-center gap-2">
          <div>
            <p className="text-xs text-gray-400">Country</p>
            <p className="text-sm font-bold text-gray-800">Indonesia</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Domain</p>
            <p className="text-sm font-bold text-gray-800">website.com</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span> Up
            </p>
            <p className="text-sm font-bold text-gray-800">3.0 mbps</p>
          </div>
        </div>
      </section>

      {/* 2. Contacts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Contacts</h3>
          <button className="text-xs font-bold text-[#5D5FEF] hover:text-[#4a4cc7]">
            View All
          </button>
        </div>
        <div className="grid grid-cols-4 gap-x-2 gap-y-4 text-center">
          {contacts.map((contact, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={contact.img}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-white shadow-sm"
              />
              <span className="text-xs font-semibold text-gray-700 truncate w-full">
                {contact.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Messages */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Messages</h3>
          <button className="text-xs font-bold text-[#5D5FEF] hover:text-[#4a4cc7]">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {messages.map((msg, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 bg-[#A69FB5] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {msg.char}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{msg.name}</p>
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {msg.desc}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 4. Recent Activity */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
        </div>

        {/* Toggle Buttons (Sesuai desain) */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-full mb-6 text-sm">
          <button className="flex-1 px-4 py-2 bg-[#5D5FEF] text-white font-bold rounded-full shadow">
            Activity
          </button>
          <button className="flex-1 px-4 py-2 text-gray-500 font-bold rounded-full hover:bg-gray-200">
            Update
          </button>
        </div>

        {/* Timeline */}
        <div className="relative space-y-6 left-1">
          {/* Garis Vertikal Timeline */}
          <div className="absolute left-6 top-3 bottom-0 w-0.5 bg-gray-100"></div>

          {activities.map((act, index) => (
            <div key={index} className="flex items-start gap-4 relative">
              {/* Ikon Lingkaran */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 relative z-10 ${act.color}`}
              >
                <act.icon size={20} />
              </div>

              {/* Teks Deskripsi */}
              <div className="flex-1 pt-1">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold text-gray-900">{act.title}</p>
                  <p className="text-xs text-gray-400 whitespace-nowrap">
                    {act.time}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {act.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
