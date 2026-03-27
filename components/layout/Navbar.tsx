"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg- border-b border-white/10 shadow-md">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* 🔥 LOGO */}
        <Link href="/" className="flex items-center bg-white rounded-md">
          <Image
            src="/logo.png"
            alt="Image Classes"
            width={140}
            height={45}
            className="object-contain"
            loading="eager"
          />
        </Link>

        {/* 🔥 NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">

          <Link href="/" className="hover:text-red-500 transition">
            Home
          </Link>

          <Link href="/rank-predictor" className="hover:text-red-500 transition">
            Rank Predictor
          </Link>

          <Link href="/answer-keys" className="hover:text-red-500 transition">
            Answer Keys
          </Link>
          <Link href="/check-selection" className="hover:text-red-500 transition">
            Check Your Selection
          </Link>

        </div>

        {/* 🔥 CTA */}
        <Link
          href="/rank-predictor"
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full text-sm font-semibold shadow-lg"
        >
          Predict Now
        </Link>

      </div>
    </nav>
  );
}