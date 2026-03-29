"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = async () => {
    await axios.post("/api/admin/logout");
    window.location.href = "/admin/login";
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      label: "Rules",
      href: "/admin/rules",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      badge: 3,
    },
    {
      label: "Answer Keys",
      href: "/admin/answer-keys",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      label: "Students",
      href: "/admin/students",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      badge: 12,
    },
    {
      label: "Predictions",
      href: "/admin/predictions",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: "Analytics",
      href: "/admin/analytics",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
    },
  ];

  const bottomNavItems = [
    {
      label: "Settings",
      href: "/admin/settings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "Help",
      href: "/admin/help",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const sidebarWidth = isCollapsed && !isHovered ? "w-20" : "w-72";

  return (
    <>
      {/* Sidebar */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${sidebarWidth} bg-[#0f0f0f]/95 backdrop-blur-xl border-r border-white/10 flex flex-col min-h-screen transition-all duration-300 ease-in-out relative group`}
      >
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-orange-500/5 pointer-events-none" />
        
        {/* Animated Glow Line */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* User Profile Card */}
        {(!isCollapsed || isHovered) && (
          <div className="relative p-4 mx-4 mt-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl">
                  👤
                </div>
                {/* Online Indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0f0f0f]">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-50" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white truncate">Super Admin</p>
                <p className="text-xs text-gray-500 truncate">admin@rankpredictor.com</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* Section Label */}
          {(!isCollapsed || isHovered) && (
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider px-3 mb-3">
              Main Menu
            </p>
          )}

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group/item relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-red-600/20 to-orange-600/20 text-white border border-red-500/30 shadow-lg shadow-red-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-r-full" />
                )}

                {/* Icon with Glow */}
                <div
                  className={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25"
                      : "bg-white/5 group-hover/item:bg-white/10"
                  }`}
                >
                  {item.icon}
                </div>

                {/* Label */}
                {(!isCollapsed || isHovered) && (
                  <span className="flex-1 font-medium">{item.label}</span>
                )}

                {/* Badge */}
                {item.badge && (!isCollapsed || isHovered) && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}

                {/* Hover Arrow */}
                {(!isCollapsed || isHovered) && (
                  <svg
                    className={`w-4 h-4 transition-all duration-300 ${
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-6 border-t border-white/10" />

          {/* Section Label */}
          {(!isCollapsed || isHovered) && (
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider px-3 mb-3">
              Support
            </p>
          )}

          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group/item flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-red-600/20 to-orange-600/20 text-white border border-red-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-red-500 to-orange-500 text-white"
                      : "bg-white/5 group-hover/item:bg-white/10"
                  }`}
                >
                  {item.icon}
                </div>

                {(!isCollapsed || isHovered) && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Stats Card */}
        {(!isCollapsed || isHovered) && (
          <div className="p-4 mx-4 mb-4 rounded-2xl bg-gradient-to-br from-red-600/10 via-orange-600/10 to-yellow-600/10 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-lg">
                📊
              </div>
              <div>
                <p className="text-sm font-bold text-white">Today's Stats</p>
                <p className="text-xs text-gray-500">Live updates</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-white/5">
                <p className="text-lg font-bold text-red-500">847</p>
                <p className="text-xs text-gray-500">Users</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <p className="text-lg font-bold text-orange-500">2.4k</p>
                <p className="text-xs text-gray-500">Predictions</p>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="relative p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="group/logout w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600/20 to-red-600/10 border border-red-500/30 text-red-500 hover:from-red-600 hover:to-red-700 hover:text-white hover:border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover/logout:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {(!isCollapsed || isHovered) && (
              <span className="font-semibold">Logout</span>
            )}
          </button>
        </div>

        {/* Footer */}
        {(!isCollapsed || isHovered) && (
          <div className="p-4 text-center border-t border-white/5">
            <p className="text-xs text-gray-600">
              © 2024 RankPredictor
            </p>
            <p className="text-xs text-gray-700 mt-1">
              v2.0.0
            </p>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}