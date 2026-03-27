"use client";

import React, { useState } from "react";

type AnswerKey = {
  id: string;
  exam: "AMU" | "JMI";
  class: string;
  stream?: string;
  year: number;
  date: string;
  downloads: number;
  status: "available" | "coming_soon" | "processing";
  pdfUrl?: string;
  videoUrl?: string;
};

const answerKeys: AnswerKey[] = [
  {
    id: "1",
    exam: "AMU",
    class: "6",
    year: 2024,
    date: "March 15, 2024",
    downloads: 12500,
    status: "available",
    pdfUrl: "#",
    videoUrl: "#",
  },
  {
    id: "2",
    exam: "AMU",
    class: "9",
    year: 2024,
    date: "March 16, 2024",
    downloads: 18200,
    status: "available",
    pdfUrl: "#",
    videoUrl: "#",
  },
  {
    id: "3",
    exam: "AMU",
    class: "11",
    stream: "PCM",
    year: 2024,
    date: "March 17, 2024",
    downloads: 22100,
    status: "available",
    pdfUrl: "#",
    videoUrl: "#",
  },
  {
    id: "4",
    exam: "AMU",
    class: "11",
    stream: "PCB",
    year: 2024,
    date: "March 17, 2024",
    downloads: 15800,
    status: "available",
    pdfUrl: "#",
  },
  {
    id: "5",
    exam: "AMU",
    class: "11",
    stream: "Diploma",
    year: 2024,
    date: "Coming Soon",
    downloads: 0,
    status: "coming_soon",
  },
  {
    id: "6",
    exam: "JMI",
    class: "6",
    year: 2024,
    date: "March 20, 2024",
    downloads: 8900,
    status: "available",
    pdfUrl: "#",
  },
  {
    id: "7",
    exam: "JMI",
    class: "9",
    year: 2024,
    date: "March 21, 2024",
    downloads: 11200,
    status: "available",
    pdfUrl: "#",
    videoUrl: "#",
  },
  {
    id: "8",
    exam: "JMI",
    class: "11",
    stream: "Science",
    year: 2024,
    date: "Processing",
    downloads: 0,
    status: "processing",
  },
  {
    id: "9",
    exam: "JMI",
    class: "11",
    stream: "Commerce",
    year: 2024,
    date: "Coming Soon",
    downloads: 0,
    status: "coming_soon",
  },
  // Previous Years
  {
    id: "10",
    exam: "AMU",
    class: "6",
    year: 2023,
    date: "March 10, 2023",
    downloads: 45000,
    status: "available",
    pdfUrl: "#",
  },
  {
    id: "11",
    exam: "AMU",
    class: "9",
    year: 2023,
    date: "March 11, 2023",
    downloads: 52000,
    status: "available",
    pdfUrl: "#",
  },
  {
    id: "12",
    exam: "AMU",
    class: "11",
    stream: "PCM",
    year: 2023,
    date: "March 12, 2023",
    downloads: 61000,
    status: "available",
    pdfUrl: "#",
    videoUrl: "#",
  },
];

const AnswerKeysPage = () => {
  const [selectedExam, setSelectedExam] = useState<"all" | "AMU" | "JMI">("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [showNotifySuccess, setShowNotifySuccess] = useState(false);

  // Filter answer keys
  const filteredKeys = answerKeys.filter((key) => {
    if (selectedExam !== "all" && key.exam !== selectedExam) return false;
    if (selectedClass !== "all" && key.class !== selectedClass) return false;
    if (selectedYear !== "all" && key.year.toString() !== selectedYear) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchStr = `${key.exam} ${key.class} ${key.stream || ""} ${key.year}`.toLowerCase();
      if (!searchStr.includes(query)) return false;
    }
    return true;
  });

  const availableKeys = filteredKeys.filter((k) => k.status === "available");
  const upcomingKeys = filteredKeys.filter((k) => k.status !== "available");

  const totalDownloads = answerKeys.reduce((sum, k) => sum + k.downloads, 0);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail) {
      setShowNotifySuccess(true);
      setNotifyEmail("");
      setTimeout(() => setShowNotifySuccess(false), 3000);
    }
  };

  const getStatusBadge = (status: AnswerKey["status"]) => {
    switch (status) {
      case "available":
        return (
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
            ✓ Available
          </span>
        );
      case "processing":
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium animate-pulse">
            ⏳ Processing
          </span>
        );
      case "coming_soon":
        return (
          <span className="px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs font-medium">
            🔜 Coming Soon
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* 🔥 HERO SECTION */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm text-blue-300">2024 Answer Keys Available</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Answer Keys
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              AMU & JMI
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Download official answer keys with detailed solutions and video explanations. 
            Verify your answers instantly.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: answerKeys.filter((k) => k.status === "available").length, label: "Available Keys" },
              { value: `${(totalDownloads / 1000).toFixed(0)}K+`, label: "Downloads" },
              { value: "2", label: "Exams Covered" },
              { value: "2024", label: "Latest Year" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <p className="text-2xl md:text-3xl font-black text-blue-400">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 FILTERS & SEARCH */}
      <section className="py-8 px-6 border-y border-white/5 bg-[#111]/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
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
              <input
                type="text"
                placeholder="Search answer keys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Exam Filter */}
              <div className="flex rounded-xl overflow-hidden border border-white/10">
                {(["all", "AMU", "JMI"] as const).map((exam) => (
                  <button
                    key={exam}
                    onClick={() => setSelectedExam(exam)}
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      selectedExam === exam
                        ? "bg-blue-600 text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {exam === "all" ? "All Exams" : exam}
                  </button>
                ))}
              </div>

              {/* Class Filter */}
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm focus:border-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="all">All Classes</option>
                <option value="6">Class 6</option>
                <option value="9">Class 9</option>
                <option value="11">Class 11</option>
              </select>

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm focus:border-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>

              {/* Clear Filters */}
              {(selectedExam !== "all" || selectedClass !== "all" || selectedYear !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedExam("all");
                    setSelectedClass("all");
                    setSelectedYear("all");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  ✕ Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 ANSWER KEYS GRID */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Available Keys */}
          {availableKeys.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400">📄</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Available Answer Keys</h2>
                  <p className="text-gray-500 text-sm">{availableKeys.length} keys ready for download</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableKeys.map((key, i) => (
                  <div
                    key={key.id}
                    className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-green-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-3 py-1 rounded-lg text-sm font-bold ${
                              key.exam === "AMU"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {key.exam}
                          </span>
                          <span className="text-gray-500 text-sm">{key.year}</span>
                        </div>
                        <h3 className="text-xl font-bold">
                          Class {key.class}
                          {key.stream && <span className="text-gray-400 font-normal"> - {key.stream}</span>}
                        </h3>
                      </div>
                      {getStatusBadge(key.status)}
                    </div>

                    {/* Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {key.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        {key.downloads.toLocaleString()}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 font-medium text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download PDF
                      </button>
                      {key.videoUrl && (
                        <button className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Keys */}
          {upcomingKeys.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <span className="text-yellow-400">⏳</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Coming Soon</h2>
                  <p className="text-gray-500 text-sm">{upcomingKeys.length} keys being processed</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingKeys.map((key) => (
                  <div
                    key={key.id}
                    className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 opacity-75"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-3 py-1 rounded-lg text-sm font-bold ${
                              key.exam === "AMU"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {key.exam}
                          </span>
                          <span className="text-gray-500 text-sm">{key.year}</span>
                        </div>
                        <h3 className="text-xl font-bold">
                          Class {key.class}
                          {key.stream && <span className="text-gray-400 font-normal"> - {key.stream}</span>}
                        </h3>
                      </div>
                      {getStatusBadge(key.status)}
                    </div>

                    {/* Notify Button */}
                    <button className="w-full py-3 px-4 rounded-xl border border-dashed border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-all flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      Notify Me
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredKeys.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-2">No Answer Keys Found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSelectedExam("all");
                  setSelectedClass("all");
                  setSelectedYear("all");
                  setSearchQuery("");
                }}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 🔥 FEATURES */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Our Answer Keys?</h2>
            <p className="text-gray-400">Trusted by thousands of students</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "✅", title: "100% Accurate", desc: "Verified by expert teachers" },
              { icon: "🎥", title: "Video Solutions", desc: "Detailed explanations" },
              { icon: "⚡", title: "Instant Access", desc: "Download immediately" },
              { icon: "🆓", title: "Completely Free", desc: "No hidden charges" },
            ].map((feature, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 NOTIFY SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
            <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Notified Instantly</h2>
              <p className="text-gray-400 mb-8">
                Be the first to know when new answer keys are released. We'll send you an email notification.
              </p>

              {showNotifySuccess ? (
                <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400">
                  ✅ You'll be notified when new answer keys are available!
                </div>
              ) : (
                <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    required
                    className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:scale-105 transition-transform whitespace-nowrap"
                  >
                    Notify Me 🔔
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 FAQ */}
      <section className="py-16 px-6 bg-[#111]/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "When are answer keys released?",
                a: "Answer keys are typically released within 24-48 hours after the exam. We update them as soon as they're available.",
              },
              {
                q: "Are these official answer keys?",
                a: "These are expertly prepared answer keys verified by experienced teachers. Official keys from universities are linked when available.",
              },
              {
                q: "Can I request a specific answer key?",
                a: "Yes! Contact us with your request and we'll prioritize adding it to our collection.",
              },
              {
                q: "Are video solutions available for all keys?",
                a: "We're continuously adding video explanations. Currently, most popular answer keys have video solutions available.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold pr-4">{faq.q}</span>
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Check Your Rank?</h2>
        <p className="text-gray-400 mb-8">After checking the answer key, predict your rank instantly</p>
        <a
          href="/rank-predictor"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold hover:scale-105 transition-transform"
        >
          Predict My Rank
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </section>

      {/* 🔥 STYLES */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        details[open] summary ~ * {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AnswerKeysPage;