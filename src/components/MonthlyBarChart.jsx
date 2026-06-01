import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const monthlyData = [
  { month: "Jan", value: 320 },
  { month: "Feb", value: 180 },
  { month: "Mar", value: 270 },
  { month: "Apr", value: 250 },
  { month: "May", value: 260 },
  { month: "Jun", value: 480 },
  { month: "Jul", value: 310 },
  { month: "Aug", value: 160 },
  { month: "Sep", value: 280 },
  { month: "Oct", value: 260 },
  { month: "Nov", value: 240 },
  { month: "Dec", value: 420 },
];

const ACTIVE_COLOR = "#4F45B6";
const INACTIVE_COLOR = "#E8E6F9";

// Custom dot di atas bar aktif
const CustomBar = (props) => {
  const { x, y, width, height, isActive } = props;
  const radius = 6;

  return (
    <g>
      {/* Bar dengan rounded top */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={6}
        ry={6}
        fill={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
      />
      {/* Dot di atas bar aktif */}
      {isActive && (
        <>
          <circle
            cx={x + width / 2}
            cy={y - radius - 3}
            r={radius}
            fill={ACTIVE_COLOR}
          />
          <circle
            cx={x + width / 2}
            cy={y - radius - 3}
            r={radius - 3}
            fill="white"
          />
        </>
      )}
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#4F45B6",
          borderRadius: "8px",
          padding: "6px 12px",
          color: "#fff",
          fontSize: "12px",
          fontFamily: "Cairo",
        }}
      >
        <p className="font-semibold">{label}</p>
        <p>{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const MonthlyBarChart = ({ defaultActive = "Jun" }) => {
  const [activeMonth, setActiveMonth] = useState(defaultActive);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-50 px-6 pt-6 pb-4">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={monthlyData}
          barCategoryGap="30%"
          onClick={(data) => {
            if (data && data.activeLabel) setActiveMonth(data.activeLabel);
          }}
        >
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 13,
              fill: "#9CA3AF",
              fontFamily: "Cairo",
            }}
            dy={10}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar
            dataKey="value"
            shape={(props) => (
              <CustomBar
                {...props}
                isActive={props.month === activeMonth || props.name === activeMonth}
              />
            )}
            radius={[6, 6, 6, 6]}
          >
            {monthlyData.map((entry) => (
              <Cell
                key={entry.month}
                fill={entry.month === activeMonth ? ACTIVE_COLOR : INACTIVE_COLOR}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
