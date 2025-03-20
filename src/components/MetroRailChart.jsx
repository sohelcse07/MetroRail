import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

const ticketData = [
  { day: "Mon", tickets: 120, revenue: 2400 },
  { day: "Tue", tickets: 200, revenue: 4000 },
  { day: "Wed", tickets: 150, revenue: 3000 },
  { day: "Thu", tickets: 250, revenue: 5000 },
  { day: "Fri", tickets: 300, revenue: 6000 },
  { day: "Sat", tickets: 280, revenue: 5600 },
  { day: "Sun", tickets: 180, revenue: 3600 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-200 text-gray-900">
        <p className="text-sm font-semibold">Day: {payload[0].payload.day}</p>
        <p className="text-sm">Tickets Sold: <span className="font-bold">{payload[0].value}</span></p>
        <p className="text-sm">Revenue: <span className="font-bold">${payload[0].payload.revenue}</span></p>
      </div>
    );
  }
  return null;
};

const MetroRailChart = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Metro Rail Analytics</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Ticket Sales Chart */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Ticket Sales Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={ticketData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" className="text-gray-600" />
              <YAxis className="text-gray-600" />
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="tickets" stroke="#4f46e5" fillOpacity={1} fill="url(#colorTickets)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Revenue Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ticketData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" className="text-gray-600" />
              <YAxis className="text-gray-600" />
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#colorRevenue)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MetroRailChart;