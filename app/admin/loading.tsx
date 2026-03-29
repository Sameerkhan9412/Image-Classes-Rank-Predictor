// app/admin/loading.tsx
"use client";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 lg:p-8">
      {/* Header Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <div className="h-10 w-64 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-5 w-48 bg-white/5 rounded-lg animate-pulse mt-2" />
        </div>
        <div className="h-12 w-40 bg-white/5 rounded-xl animate-pulse" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10" />
              <div className="w-12 h-5 rounded-full bg-white/10" />
            </div>
            <div className="h-4 w-20 bg-white/10 rounded mb-2" />
            <div className="h-8 w-16 bg-white/10 rounded" />
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="h-6 w-40 bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-32 bg-white/10 rounded mt-2 animate-pulse" />
            </div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-8 bg-white/10 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
          <div className="h-72 bg-white/5 rounded-xl animate-pulse flex items-end justify-around p-4">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-8 bg-gradient-to-t from-red-500/20 to-transparent rounded-t"
                style={{ height: `${30 + Math.random() * 60}%` }}
              />
            ))}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
          <div className="h-6 w-32 bg-white/10 rounded animate-pulse mb-2" />
          <div className="h-4 w-28 bg-white/10 rounded animate-pulse mb-6" />
          <div className="h-48 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-8 border-white/10 border-t-red-500/50 animate-spin" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="h-3 w-16 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-32 bg-white/10 rounded animate-pulse" />
          <div className="h-10 w-28 bg-white/10 rounded-xl animate-pulse" />
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 py-4 border-b border-white/10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-white/10 rounded animate-pulse" />
          ))}
        </div>

        {/* Table Rows */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-6 gap-4 py-4 border-b border-white/5"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                <div className="h-3 w-32 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
            {[...Array(5)].map((_, j) => (
              <div key={j} className="h-4 bg-white/10 rounded animate-pulse self-center" />
            ))}
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl">
        <div className="w-5 h-5 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Loading dashboard...</span>
      </div>
    </div>
  );
}