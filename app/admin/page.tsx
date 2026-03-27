"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    predictions: 0,
    datasets: 0,
  });

  useEffect(() => {
    axios.get("/api/admin/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  const chartData = [
    { name: "Users", value: stats.users },
    { name: "Predictions", value: stats.predictions },
    { name: "Datasets", value: stats.datasets },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">

      <h1 className="text-3xl font-bold mb-8 text-red-500">
        Admin Dashboard
      </h1>

      {/* 🔥 STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 rounded-xl border border-[#2a2a2a] hover:scale-105 transition">
          <p className="text-gray-400 text-sm">Total Users</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {stats.users}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 rounded-xl border border-[#2a2a2a] hover:scale-105 transition">
          <p className="text-gray-400 text-sm">Predictions</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {stats.predictions}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 rounded-xl border border-[#2a2a2a] hover:scale-105 transition">
          <p className="text-gray-400 text-sm">Datasets</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {stats.datasets}
          </h2>
        </div>

      </div>

      {/* 📊 CHART */}
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a]">

        <h2 className="text-lg font-semibold mb-4 text-gray-300">
          Platform Overview
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis stroke="#aaa" dataKey="name" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #333",
                  color: "#fff",
                }}
              />
              <Bar dataKey="value" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}