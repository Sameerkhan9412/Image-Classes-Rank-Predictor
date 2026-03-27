"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/rank-predictor", label: "Rank Predictor", icon: "🎯" },
    { href: "/answer-keys", label: "Answer Keys", icon: "📄" },
    { href: "/check-selection", label: "Check Selection", icon: "✅", badge: "Soon" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* 🔥 LOGO */}
            <Link href="/" className="relative group flex items-center gap-3">
              {/* Logo Container */}
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-white rounded-xl p-1.5 shadow-lg group-hover:shadow-red-500/20 transition-all duration-300 group-hover:scale-105">
                  <Image
                    src="/logo.png"
                    alt="Image Classes"
                    width={120}
                    height={40}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Optional: Text beside logo */}
              {/* <div className="hidden lg:block">
                <p className="text-xs text-gray-500">AMU & JMI</p>
                <p className="text-sm font-bold text-white">Preparation</p>
              </div> */}
            </Link>

            {/* 🔥 DESKTOP NAV LINKS */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {/* Active Background */}
                  {isActive(link.href) && (
                    <span className="absolute inset-0 bg-white/10 rounded-xl" />
                  )}
                  
                  {/* Hover Background */}
                  <span className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Link Content */}
                  <span className="relative flex items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                          link.badge === "Popular"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </span>

                  {/* Active Indicator */}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* 🔥 RIGHT SECTION */}
            <div className="flex items-center gap-3">
              {/* Search Button (Desktop) */}
              <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
                <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* CTA Button */}
              <Link
                href="/rank-predictor"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-xl text-sm font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Predict Now</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? "opacity-0 scale-0" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 🔥 PROGRESS BAR (Optional: for scroll progress) */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-150"
            style={{
              width: `${
                typeof window !== "undefined"
                  ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </nav>

      {/* 🔥 MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* 🔥 MOBILE MENU DRAWER */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-[#111] border-l border-white/10 shadow-2xl transition-transform duration-500 ease-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="text-lg font-bold">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500 focus:outline-none transition-colors text-sm"
            />
          </div>
        </div>

        {/* Nav Links */}
        <div className="p-4 space-y-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                isActive(link.href)
                  ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white border border-red-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
              {link.badge && (
                <span
                  className={`ml-auto px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    link.badge === "Popular"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {link.badge}
                </span>
              )}
              {isActive(link.href) && (
                <svg className="ml-auto w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-white/10" />

        {/* Quick Actions */}
        <div className="p-4 space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Quick Actions</p>
          
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <span className="text-xl">📞</span>
            <span className="font-medium">Contact Us</span>
          </button>
          
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <span className="text-xl">❓</span>
            <span className="font-medium">Help & FAQ</span>
          </button>
        </div>

        {/* CTA Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#111]">
          <Link
            href="/rank-predictor"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-semibold shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <span>🎯 Predict Your Rank</span>
          </Link>
          
          <p className="text-center text-xs text-gray-500 mt-3">
            Trusted by 10,000+ students
          </p>
        </div>
      </div>

      {/* 🔥 SPACER (to prevent content from hiding under fixed navbar) */}
      <div className="h-16 md:h-20" />

      {/* 🔥 STYLES */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}