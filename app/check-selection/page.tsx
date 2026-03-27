"use client";

import React, { useState, useEffect } from "react";

const SelectionCheckerPage = () => {
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  // Animated demo sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer (example: launching in 15 days)
  const [countdown, setCountdown] = useState({
    days: 15,
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowSuccess(true);
      setEmail("");
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const handleDemoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRollNumber(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 500);
  };

  const features = [
    {
      icon: "🔍",
      title: "Instant Search",
      description: "Find your result in seconds, no more PDF scrolling",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "📊",
      title: "Complete Details",
      description: "Get rank, category, list type, and more",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Check from any device, anywhere",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: "🔔",
      title: "Instant Alerts",
      description: "Get notified when results are announced",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: "📥",
      title: "Download Result",
      description: "Save your result card as PDF",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your data is encrypted and safe",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const demoResults = [
    {
      name: "Mohammad Ahmed",
      rollNo: "AMU2024001234",
      rank: 45,
      status: "Selected",
      category: "General",
      listType: "First List",
    },
    {
      name: "Ayesha Khan",
      rollNo: "AMU2024005678",
      rank: 156,
      status: "Selected",
      category: "OBC",
      listType: "Second List",
    },
    {
      name: "Rahul Sharma",
      rollNo: "JMI2024009012",
      rank: 289,
      status: "Waiting",
      category: "General",
      listType: "Waiting List",
    },
  ];

  const timeline = [
    { date: "Phase 1", title: "Data Collection", status: "completed", desc: "Gathering results from official sources" },
    { date: "Phase 2", title: "System Development", status: "current", desc: "Building the search infrastructure" },
    { date: "Phase 3", title: "Beta Testing", status: "upcoming", desc: "Testing with selected users" },
    { date: "Phase 4", title: "Public Launch", status: "upcoming", desc: "Available for everyone" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* 🔥 HERO SECTION */}
      <section className="relative py-20 px-6 min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[200px]" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Floating Elements */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="text-sm text-purple-300">Coming Soon</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Check Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-gradient">
                  Selection Status
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                No more scrolling through endless PDFs. Just enter your roll number and get your complete result instantly.
              </p>

              {/* Countdown Timer */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-4">Launching In</p>
                <div className="flex justify-center lg:justify-start gap-4">
                  {[
                    { value: countdown.days, label: "Days" },
                    { value: countdown.hours, label: "Hours" },
                    { value: countdown.minutes, label: "Mins" },
                    { value: countdown.seconds, label: "Secs" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {String(item.value).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notify Form */}
              {showSuccess ? (
                <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 max-w-md mx-auto lg:mx-0">
                  ✅ Awesome! We'll notify you when it's ready!
                </div>
              ) : (
                <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                  >
                    Notify Me 🔔
                  </button>
                </form>
              )}

              <p className="text-gray-600 text-sm mt-4">
                Join 2,500+ students already waiting
              </p>
            </div>

            {/* Right Content - Interactive Demo */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-3xl blur-3xl" />
              
              {/* Demo Card */}
              <div className="relative bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-gray-500 text-sm">selection-checker.com</span>
                </div>

                {/* Search Input */}
                <div className="mb-6">
                  <label className="text-sm text-gray-400 mb-2 block">Enter Roll Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={rollNumber}
                      onChange={handleDemoInput}
                      placeholder="e.g., AMU2024001234"
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-all text-lg"
                    />
                    {isTyping && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Demo Result Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Preview Result</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Live Demo
                    </span>
                  </div>

                  {/* Animated Result Card */}
                  <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 transition-all duration-500">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{demoResults[demoStep % 3].name}</h3>
                        <p className="text-gray-500 text-sm">{demoResults[demoStep % 3].rollNo}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          demoResults[demoStep % 3].status === "Selected"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {demoResults[demoStep % 3].status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-2xl font-bold text-purple-400">#{demoResults[demoStep % 3].rank}</p>
                        <p className="text-xs text-gray-500">Rank</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-sm font-bold text-white">{demoResults[demoStep % 3].category}</p>
                        <p className="text-xs text-gray-500">Category</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-sm font-bold text-white">{demoResults[demoStep % 3].listType}</p>
                        <p className="text-xs text-gray-500">List</p>
                      </div>
                    </div>
                  </div>

                  {/* Demo Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 text-sm font-medium">
                      📥 Download PDF
                    </button>
                    <button className="flex-1 py-3 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm font-medium">
                      📤 Share Result
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 FEATURES SECTION */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm tracking-wider uppercase">Features</span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 mb-6">
              Everything You{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Need
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A complete solution to check your selection status without any hassle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 HOW IT WORKS */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm tracking-wider uppercase">Process</span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 mb-6">
              How It{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" />

            {[
              { step: "01", icon: "🔢", title: "Enter Roll No", desc: "Type your roll number" },
              { step: "02", icon: "🔍", title: "Search", desc: "We search our database" },
              { step: "03", icon: "📊", title: "Get Result", desc: "View complete details" },
              { step: "04", icon: "📥", title: "Download", desc: "Save as PDF" },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                  {item.icon}
                </div>

                <div className="absolute -top-2 right-1/4 w-8 h-8 rounded-full bg-white text-black font-black flex items-center justify-center text-sm">
                  {item.step}
                </div>

                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 EXAMS SUPPORTED */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm tracking-wider uppercase">Coverage</span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 mb-6">
              Exams{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Supported
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* AMU */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative p-8 rounded-3xl bg-[#111] border border-white/10 hover:border-red-500/50 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-2xl font-black">
                    AMU
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Aligarh Muslim University</h3>
                    <p className="text-gray-500">Entrance Exams</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {["Class 6 Entrance", "Class 9 Entrance", "Class 11 (PCM/PCB/Diploma)", "BA/BSc/BCom Entrance"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>

            {/* JMI */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative p-8 rounded-3xl bg-[#111] border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-2xl font-black">
                    JMI
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Jamia Millia Islamia</h3>
                    <p className="text-gray-500">Entrance Exams</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {["Class 6 Entrance", "Class 9 Entrance", "Class 11 (Science/Commerce)", "BA/BSc/BCom Entrance"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 DEVELOPMENT TIMELINE */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm tracking-wider uppercase">Progress</span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 mb-6">
              Development{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Timeline
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-gray-700" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row gap-8 items-start ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#0a0a0a] bg-gradient-to-r from-purple-500 to-pink-500 z-10">
                    {item.status === "current" && (
                      <span className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-50" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div
                      className={`inline-block p-6 rounded-2xl border transition-all ${
                        item.status === "completed"
                          ? "bg-green-500/10 border-green-500/30"
                          : item.status === "current"
                          ? "bg-purple-500/10 border-purple-500/30"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {item.status === "completed" && <span className="text-green-400">✓</span>}
                        {item.status === "current" && <span className="text-purple-400 animate-pulse">●</span>}
                        {item.status === "upcoming" && <span className="text-gray-500">○</span>}
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 COMPARISON */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm tracking-wider uppercase">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 mb-6">
              Old Way vs{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                New Way
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Old Way */}
            <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-2xl">
                  😫
                </div>
                <h3 className="text-xl font-bold text-red-400">The Old Way</h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Download 50+ page PDF",
                  "Scroll endlessly to find name",
                  "Confusing format",
                  "Multiple lists to check",
                  "Slow & frustrating",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400">
                    <span className="text-red-400">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* New Way */}
            <div className="p-8 rounded-3xl bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl">
                  🎉
                </div>
                <h3 className="text-xl font-bold text-green-400">The New Way</h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Enter roll number once",
                  "Get result in 2 seconds",
                  "Clear, beautiful display",
                  "All lists in one place",
                  "Fast & delightful",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400">
                    <span className="text-green-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 FAQ */}
      <section className="py-20 px-6 bg-[#111]/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm tracking-wider uppercase">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "When will this feature be available?",
                a: "We're working hard to launch this feature soon. Sign up for notifications to be the first to know!",
              },
              {
                q: "Is this an official service?",
                a: "This is an unofficial service that helps students check their results easily. We source data from official announcements.",
              },
              {
                q: "Will my data be safe?",
                a: "Yes! We only store your email for notifications. Your roll number searches are not stored.",
              },
              {
                q: "Is this service free?",
                a: "Yes, this service will be completely free for all students.",
              },
              {
                q: "Which results will be available?",
                a: "We plan to support AMU and JMI entrance exam results for all classes.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold pr-4">{faq.q}</span>
                  <span className="text-2xl group-open:rotate-45 transition-transform text-purple-400">+</span>
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 FINAL CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px]" />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-4xl animate-bounce">
            🔔
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Don't Miss the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Launch
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-10">
            Be the first to check your selection status when we go live
          </p>

          {showSuccess ? (
            <div className="p-6 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-400 max-w-md mx-auto">
              ✅ You're on the list! We'll email you when it's ready.
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 focus:border-purple-500 focus:outline-none transition-colors text-lg"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          )}

          <p className="mt-6 text-gray-500">
            ✓ Free forever &nbsp; ✓ No spam &nbsp; ✓ Unsubscribe anytime
          </p>
        </div>
      </section>

      {/* 🔥 STYLES */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

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

        .animate-float {
          animation: float linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        details[open] summary ~ * {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SelectionCheckerPage;