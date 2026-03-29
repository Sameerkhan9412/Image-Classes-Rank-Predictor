// components/Loading.tsx or app/loading.tsx
"use client";

import { useState, useEffect } from "react";

// Floating Particles
const ParticlesBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 8 + 2}px`,
          height: `${Math.random() * 8 + 2}px`,
          background: `rgba(239, 68, 68, ${Math.random() * 0.3})`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 10}s`,
        }}
      />
    ))}
  </div>
);

// Animated Logo
const AnimatedLogo = () => (
  <div className="relative">
    {/* Outer Ring */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500 to-orange-500 animate-spin-slow opacity-20 blur-xl" />
    
    {/* Main Logo */}
    <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center shadow-2xl shadow-red-500/30">
      <span className="text-4xl font-black text-white">R</span>
      
      {/* Pulse Ring */}
      <div className="absolute inset-0 rounded-3xl border-4 border-red-500 animate-ping opacity-20" />
    </div>
  </div>
);

// Progress Bar
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full transition-all duration-300 relative"
      style={{ width: `${progress}%` }}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
    </div>
  </div>
);

// Loading Dots
const LoadingDots = () => (
  <div className="flex gap-2">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

// Orbital Loader
const OrbitalLoader = () => (
  <div className="relative w-20 h-20">
    {/* Center */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500" />
    </div>
    
    {/* Orbits */}
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
        style={{
          borderTopColor: `rgba(239, 68, 68, ${0.8 - i * 0.2})`,
          animationDuration: `${1 + i * 0.5}s`,
          transform: `rotate(${i * 60}deg)`,
        }}
      />
    ))}
  </div>
);

interface LoadingProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
  variant?: "default" | "minimal" | "orbital" | "dots";
}

export default function Loading({
  message = "Loading...",
  showProgress = true,
  progress: externalProgress,
  variant = "default",
}: LoadingProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(message);

  // Simulate progress if not provided externally
  useEffect(() => {
    if (externalProgress !== undefined) {
      setProgress(externalProgress);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [externalProgress]);

  // Rotating loading messages
  useEffect(() => {
    const messages = [
      "Loading...",
      "Preparing data...",
      "Almost there...",
      "Just a moment...",
      "Fetching content...",
    ];

    const interval = setInterval(() => {
      setLoadingText(messages[Math.floor(Math.random() * messages.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] text-white flex items-center justify-center z-50">
      <ParticlesBackground />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Loader Variants */}
        {variant === "default" && <AnimatedLogo />}
        {variant === "orbital" && <OrbitalLoader />}
        {variant === "dots" && <LoadingDots />}
        {variant === "minimal" && (
          <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
        )}

        {/* Text */}
        <div className="mt-8 text-center">
          <p className="text-xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
            {loadingText}
          </p>
          {showProgress && (
            <p className="text-sm text-gray-500 mb-4">{Math.round(progress)}%</p>
          )}
        </div>

        {/* Progress Bar */}
        {showProgress && <ProgressBar progress={progress} />}

        {/* Tips */}
        <div className="mt-8 max-w-sm text-center">
          <p className="text-xs text-gray-600">
            💡 Tip: Use keyboard shortcuts for faster navigation
          </p>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}