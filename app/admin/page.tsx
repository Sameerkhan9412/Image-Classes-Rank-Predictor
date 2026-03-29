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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// Animated Counter Component
const Counter = ({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// Floating Particles Background
const ParticlesBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-red-500/10 rounded-full animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 10}s`,
        }}
      />
    ))}
  </div>
);

// Sidebar Navigation Item
const NavItem = ({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      active
        ? "bg-gradient-to-r from-red-600/20 to-orange-600/20 text-red-500 border border-red-500/30"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{label}</span>
    {badge && (
      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    predictions: 0,
    datasets: 0,
    revenue: 0,
    activeUsers: 0,
    conversionRate: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setStats({
        users: 12847,
        predictions: 89432,
        datasets: 156,
        revenue: 45230,
        activeUsers: 3421,
        conversionRate: 24,
      });
      setIsLoading(false);
    }, 1000);

    // Uncomment for real API
    // axios.get("/api/admin/stats").then((res) => {
    //   setStats(res.data);
    //   setIsLoading(false);
    // });
  }, []);

  const barChartData = [
    { name: "Jan", users: 400, predictions: 240 },
    { name: "Feb", users: 300, predictions: 139 },
    { name: "Mar", users: 200, predictions: 980 },
    { name: "Apr", users: 278, predictions: 390 },
    { name: "May", users: 189, predictions: 480 },
    { name: "Jun", users: 239, predictions: 380 },
    { name: "Jul", users: 349, predictions: 430 },
  ];

  const lineChartData = [
    { name: "Mon", value: 400 },
    { name: "Tue", value: 300 },
    { name: "Wed", value: 600 },
    { name: "Thu", value: 800 },
    { name: "Fri", value: 500 },
    { name: "Sat", value: 900 },
    { name: "Sun", value: 700 },
  ];

  const pieChartData = [
    { name: "Class 6", value: 400, color: "#ef4444" },
    { name: "Class 9", value: 300, color: "#f97316" },
    { name: "Class 11 PCM", value: 300, color: "#eab308" },
    { name: "Class 11 PCB", value: 200, color: "#22c55e" },
  ];

  const recentActivities = [
    { id: 1, user: "Rahul Sharma", action: "Made a prediction", time: "2 min ago", icon: "🎯" },
    { id: 2, user: "Ayesha Khan", action: "Registered account", time: "5 min ago", icon: "👤" },
    { id: 3, user: "Mohammad Ali", action: "Downloaded answer key", time: "12 min ago", icon: "📥" },
    { id: 4, user: "Priya Singh", action: "Verified email", time: "18 min ago", icon: "✉️" },
    { id: 5, user: "Admin", action: "Updated dataset", time: "25 min ago", icon: "📊" },
  ];

  const recentUsers = [
    { id: 1, name: "Rahul Sharma", email: "rahul@email.com", class: "11 PCM", status: "Active", avatar: "👨‍🎓" },
    { id: 2, name: "Ayesha Khan", email: "ayesha@email.com", class: "9", status: "Active", avatar: "👩‍🎓" },
    { id: 3, name: "Mohammad Ali", email: "ali@email.com", class: "6", status: "Pending", avatar: "👦" },
    { id: 4, name: "Priya Singh", email: "priya@email.com", class: "11 PCB", status: "Active", avatar: "👧" },
    { id: 5, name: "Arjun Kumar", email: "arjun@email.com", class: "9", status: "Inactive", avatar: "👨" },
  ];

  const statsCards = [
    {
      title: "Total Users",
      value: stats.users,
      suffix: "",
      change: "+12.5%",
      changeType: "up",
      icon: "👥",
      gradient: "from-red-500 to-orange-500",
    },
    {
      title: "Predictions",
      value: stats.predictions,
      suffix: "",
      change: "+23.1%",
      changeType: "up",
      icon: "🎯",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Datasets",
      value: stats.datasets,
      suffix: "",
      change: "+5.4%",
      changeType: "up",
      icon: "📊",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      suffix: "",
      change: "+8.2%",
      changeType: "up",
      icon: "🟢",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Revenue",
      value: stats.revenue,
      suffix: "₹",
      change: "+18.7%",
      changeType: "up",
      icon: "💰",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "Conversion",
      value: stats.conversionRate,
      suffix: "%",
      change: "-2.3%",
      changeType: "down",
      icon: "📈",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Mouse Follow Gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 68, 68, 0.1), transparent 40%)`,
        }}
      />

      <ParticlesBackground />

      {/* 🔥 MAIN CONTENT */}
      <main className="flex-1 overflow-x-hidden relative z-10">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search users, predictions, datasets..."
                  className="w-full px-5 py-3 pl-12 rounded-2xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Quick Actions */}
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-medium hover:scale-105 transition-transform">
                <span>+ Add New</span>
              </button>

              {/* Notifications */}
              <button className="relative p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-lg">
                  👤
                </div>
                <div className="hidden sm:block">
                  <p className="font-semibold text-sm">Admin</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Welcome back,{" "}
              </span>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Admin!
              </span>
            </h1>
            <p className="text-gray-500 mt-2">Here's what's happening with your platform today.</p>
          </div>

          {/* 🔥 STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {statsCards.map((stat, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-hidden"
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{stat.icon}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        stat.changeType === "up"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>

                  <p
                    className={`text-2xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                  >
                    {isLoading ? (
                      <span className="animate-pulse">...</span>
                    ) : stat.suffix === "₹" ? (
                      <>
                        {stat.suffix}
                        <Counter end={stat.value} />
                      </>
                    ) : (
                      <>
                        <Counter end={stat.value} />
                        {stat.suffix}
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 🔥 CHARTS ROW */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Main Chart */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Platform Analytics</h2>
                  <p className="text-gray-500 text-sm">Users vs Predictions over time</p>
                </div>
                <div className="flex gap-2">
                  {["7D", "1M", "6M", "1Y"].map((period, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        i === 1
                          ? "bg-red-500 text-white"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={barChartData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorPredictions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="predictions"
                      stroke="#f97316"
                      fillOpacity={1}
                      fill="url(#colorPredictions)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm text-gray-400">Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-sm text-gray-400">Predictions</span>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
              <h2 className="text-xl font-bold mb-2">Class Distribution</h2>
              <p className="text-gray-500 text-sm mb-6">Users by class category</p>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {pieChartData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🔥 BOTTOM SECTION */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <button className="text-sm text-red-500 hover:underline">View All</button>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center text-xl">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{activity.user}</p>
                      <p className="text-sm text-gray-500 truncate">{activity.action}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Users Table */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Users</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-sm font-medium hover:scale-105 transition-transform">
                  Export CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-gray-500 font-medium text-sm">User</th>
                      <th className="text-left py-3 px-4 text-gray-500 font-medium text-sm hidden sm:table-cell">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 text-gray-500 font-medium text-sm">Class</th>
                      <th className="text-left py-3 px-4 text-gray-500 font-medium text-sm">Status</th>
                      <th className="text-left py-3 px-4 text-gray-500 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-lg">
                              {user.avatar}
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-400 hidden sm:table-cell">{user.email}</td>
                        <td className="py-4 px-4 text-gray-400">{user.class}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === "Active"
                                ? "bg-green-500/20 text-green-500"
                                : user.status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-gray-500/20 text-gray-500"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-500 transition-colors">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button className="p-2 rounded-lg bg-white/5 hover:bg-green-500/20 hover:text-green-500 transition-colors">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-500 transition-colors">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-500">Showing 1-5 of 12,847 users</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
                    Previous
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm">1</button>
                  <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
                    2
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
                    3
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 🔥 QUICK ACTIONS */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-red-600/10 via-orange-600/10 to-yellow-600/10 border border-white/10">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { icon: "👤", label: "Add User" },
                { icon: "📊", label: "Upload Dataset" },
                { icon: "📝", label: "Add Answer Key" },
                { icon: "📧", label: "Send Email" },
                { icon: "📤", label: "Export Data" },
                { icon: "⚙️", label: "Settings" },
              ].map((action, i) => (
                <button
                  key={i}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {action.icon}
                  </span>
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 🔥 ANIMATIONS */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}