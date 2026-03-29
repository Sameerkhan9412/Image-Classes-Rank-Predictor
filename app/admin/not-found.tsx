// components/ComingSoonSimple.tsx
"use client";

import Link from "next/link";

interface Props {
  title?: string;
  description?: string;
  icon?: string;
  backUrl?: string;
}

export default function ComingSoonSimple({
  title = "Coming Soon",
  description = "This feature is under development",
  icon = "🚧",
  backUrl = "/admin",
}: Props) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center text-5xl animate-pulse">
          {icon}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-black mb-3">
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>

        {/* Description */}
        <p className="text-gray-400 mb-8">{description}</p>

        {/* Features Coming */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["New Features", "Better UX", "More Power"].map((item, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400"
            >
              ✨ {item}
            </span>
          ))}
        </div>

        {/* Back Button */}
        <Link href={backUrl}>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold hover:scale-105 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
}