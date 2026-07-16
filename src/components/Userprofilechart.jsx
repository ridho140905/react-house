import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { supabase } from "../lib/supabaseClient";

const UserProfileChart = () => {
  const [data, setData] = useState([
    { name: "Gold",   value: 0, color: "#FFB800" },
    { name: "Silver", value: 0, color: "#C0C0C0" },
    { name: "Member", value: 100, color: "#4F45B6" },
  ]);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const { data: profiles } = await supabase.from('profiles').select('tier, role');
        if (profiles && profiles.length > 0) {
          let gold = 0, silver = 0, member = 0;
          profiles.forEach(p => {
            if (p.tier === 'Gold') gold++;
            else if (p.tier === 'Silver') silver++;
            else member++;
          });
          
          const total = profiles.length;
          setData([
            { name: "Gold",   value: Math.round((gold/total)*100), color: "#FFB800" },
            { name: "Silver", value: Math.round((silver/total)*100), color: "#C0C0C0" },
            { name: "Member", value: Math.round((member/total)*100), color: "#4F45B6" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching user profile stats", error);
      }
    };
    fetchTiers();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-6 h-full">
      <h3 className="text-base font-bold text-gray-800 font-['Cairo'] mb-4">User Profile</h3>

      {/* Donut Chart */}
      <div className="flex justify-center mb-4">
        <div className="w-[160px] h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3 mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border-2"
                style={{ borderColor: item.color, backgroundColor: "transparent" }}
              />
              <span className="text-sm text-gray-500 font-['Cairo']">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-gray-800 font-['Cairo']">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileChart;
