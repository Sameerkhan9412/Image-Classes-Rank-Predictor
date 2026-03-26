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
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold text-primary">
            {stats.users}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Predictions</p>
          <h2 className="text-2xl font-bold text-primary">
            {stats.predictions}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Datasets</p>
          <h2 className="text-2xl font-bold text-primary">
            {stats.datasets}
          </h2>
        </div>
      </div>

      {/* 📊 Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Platform Overview
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}