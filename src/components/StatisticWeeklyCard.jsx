import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { supabase } from "../lib/supabaseClient";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-md px-3 py-2 text-xs font-['Cairo']">
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">{p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

const StatisticWeeklyCard = () => {
  const [lineData, setLineData] = useState([{ x: 0, a: 0, b: 0 }]);
  const [thisWeek, setThisWeek] = useState("0");
  const [lastWeek, setLastWeek] = useState("0");
  const [impression, setImpression] = useState("0");
  const [growth, setGrowth] = useState("0%");
  const [impressionData, setImpressionData] = useState([{ v: 0 }]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: orders } = await supabase.from('orders').select('created_at, total_price').order('created_at', { ascending: true });
        
        if (orders && orders.length > 0) {
           const recentOrders = orders.slice(-7);
           const newLineData = recentOrders.map((o, index) => ({
             x: index * 20,
             a: Math.round(o.total_price / 100000), // scaled down untuk visualisasi grafik
             b: Math.round((o.total_price / 100000) * 0.8) // bayangan/fake perbandingan
           }));
           setLineData(newLineData.length > 0 ? newLineData : [ { x:0, a:0, b:0} ]);
           
           const total = orders.reduce((sum, o) => sum + o.total_price, 0);
           setThisWeek("Rp" + (total / 1000000).toFixed(1) + "M");
           setLastWeek("Rp" + (total * 0.8 / 1000000).toFixed(1) + "M");
           
           setImpression(orders.length.toString());
           setGrowth("+" + Math.round((recentOrders.length / orders.length) * 100) + "%");

           // Generate dummy impression bars for visual context based on order count
           const bars = [];
           for (let i = 0; i < 6; i++) {
             bars.push({ v: Math.floor(Math.random() * orders.length) + 1 });
           }
           setImpressionData(bars);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-6 flex gap-6 h-full">

      {/* KIRI: Statistic Line Chart */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-base font-bold text-gray-800 font-['Cairo'] mb-4">Statistic</h3>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={lineData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid
                vertical={true}
                horizontal={false}
                stroke="#E5E7EB"
                strokeDasharray="0"
              />
              <XAxis
                dataKey="x"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "Cairo" }}
              />
              <Tooltip content={<CustomTooltip />} />
              {/* Line ungu — mulai tinggi, turun dulu, naik di akhir */}
              <Line
                type="monotone"
                dataKey="a"
                stroke="#4F45B6"
                strokeWidth={2.5}
                dot={(props) => {
                  const { cx, cy, index } = props;
                  if (index === 0 || index === lineData.length - 1) {
                    return (
                      <circle
                        key={index}
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill="#4F45B6"
                        stroke="white"
                        strokeWidth={2}
                      />
                    );
                  }
                  return null;
                }}
                activeDot={{ r: 6, fill: "#4F45B6", strokeWidth: 0 }}
              />
              {/* Line kuning — mulai rendah, naik */}
              <Line
                type="monotone"
                dataKey="b"
                stroke="#FFB800"
                strokeWidth={2.5}
                dot={(props) => {
                  const { cx, cy, index } = props;
                  if (index === 0 || index === lineData.length - 1) {
                    return (
                      <circle
                        key={index}
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill="#FFB800"
                        stroke="white"
                        strokeWidth={2}
                      />
                    );
                  }
                  return null;
                }}
                activeDot={{ r: 6, fill: "#FFB800", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-gray-50 self-stretch" />

      {/* KANAN: Weekly + Impression */}
      <div className="w-[200px] flex flex-col gap-6">

        {/* Weekly */}
        <div>
          <h3 className="text-base font-bold text-gray-800 font-['Cairo'] mb-4">Weekly</h3>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-gray-400 font-['Cairo'] mb-1">This Week</p>
              <p className="text-xl font-bold font-['Cairo']" style={{ color: "#4F45B6" }}>
                {thisWeek}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-['Cairo'] mb-1">Last Week</p>
              <p className="text-xl font-bold font-['Cairo']" style={{ color: "#FFB800" }}>
                {lastWeek}
              </p>
            </div>
          </div>
        </div>

        {/* Impression */}
        <div>
          <h3 className="text-base font-bold text-gray-800 font-['Cairo'] mb-3">Impression</h3>
          <div className="h-[90px] mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impressionData} barCategoryGap="20%">
                <Bar dataKey="v" radius={[4, 4, 4, 4]}>
                  {impressionData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index === 4 ? "#4F45B6" : "#C7C4EC"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-bold text-gray-800 font-['Cairo']">{impression}</span>
            <span className="text-sm font-semibold font-['Cairo']" style={{ color: "#00B074" }}>
              {growth}
            </span>
            <span className="text-xs text-gray-400 font-['Cairo']">than last year</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatisticWeeklyCard;
