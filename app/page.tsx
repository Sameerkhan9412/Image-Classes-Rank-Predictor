"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Animated Counter Component
const Counter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span id={`counter-${end}`}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// Floating Particles Background
const ParticlesBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-red-500/20 rounded-full animate-float"
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

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: "🎯",
      title: "AI-Powered Prediction",
      description: "Advanced algorithms analyze historical data for accurate rank predictions",
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: "⚡",
      title: "Instant Results",
      description: "Get your predicted rank in seconds, no waiting required",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "📊",
      title: "Detailed Analytics",
      description: "Comprehensive insights with rank ranges and success probability",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your data is encrypted and never shared without consent",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Access from any device, anytime, anywhere",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: "🎓",
      title: "Expert Guidance",
      description: "Personalized tips based on your predicted performance",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      class: "Class 11 PCM",
      image: "👨‍🎓",
      text: "The prediction was incredibly accurate! Got exactly the rank range they predicted. Helped me prepare better.",
      rating: 5,
    },
    {
      name: "Ayesha Khan",
      class: "Class 9",
      image: "👩‍🎓",
      text: "Amazing tool! Finally knew where I stood among thousands of students. The insights were super helpful.",
      rating: 5,
    },
    {
      name: "Mohammad Ali",
      class: "Class 6",
      image: "👦",
      text: "My parents were so happy to see my predicted rank. It motivated me to study even harder!",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "How accurate is the rank prediction?",
      answer: "Our predictions are based on historical data and advanced algorithms, achieving 85-90% accuracy within the predicted range.",
    },
    {
      question: "Is my data safe?",
      answer: "Absolutely! We use industry-standard encryption and never share your personal information without explicit consent.",
    },
    {
      question: "Which exams are supported?",
      answer: "Currently, we support AMU and JMI entrance exams for Classes 6, 9, and 11 (PCM, PCB, Diploma).",
    },
    {
      question: "Is this service free?",
      answer: "Yes! Our rank predictor is completely free to use for all students.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#0a0a0a] text-white overflow-hidden">
      {/* 🔥 HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        {/* Animated Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 68, 68, 0.15), transparent 40%)`,
          }}
        />
        <ParticlesBackground />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-8 animate-fadeInUp">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-sm text-gray-300">Trusted by 70,000+ Students</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Predict Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
              AMU & JMI Result
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            Get instant, AI-powered rank predictions based on your marks. 
            Join thousands of successful students.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            <Link href="/rank-predictor">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(239,68,68,0.3)]">
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Predict My Result
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>

            <button className="group px-8 py-4 border-2 border-gray-700 rounded-2xl font-bold text-lg hover:border-red-500 hover:bg-red-500/10 transition-all duration-300">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
            {[
              { value: 80000, suffix: "+", label: "Students" },
              { value: 95, suffix: "%", label: "Accuracy" },
              { value: 50000, suffix: "+", label: "Predictions" },
              { value: 4, suffix: "★", label: "Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-scroll" />
          </div>
        </div>
      </section>

      {/* 🔥 BRANDS/TRUST SECTION */}
      <section className="py-12 border-y border-white/5 bg-gradient-to-r from-transparent via-white/5 to-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-gray-500 text-sm mb-8">TRUSTED BY STUDENTS FROM</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["AMU", "JMI","Aligarh", "Delhi", "UP", "Bihar", "MP"].map((item, i) => (
              <div key={i} className="text-2xl font-bold text-gray-600 hover:text-red-500 transition-colors cursor-default">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 FEATURES SECTION */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-red-500 font-semibold text-sm tracking-wider uppercase">Features</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
              Why Students{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Love Us
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Everything you need to predict your entrance result and prepare better for your entrance exams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-red-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="mt-6 flex items-center text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2">
                  <span className="text-sm font-semibold">Learn more</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 HOW IT WORKS */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-500 font-semibold text-sm tracking-wider uppercase">Process</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
              How It{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />

            {[
              { step: "01", title: "Enter Details", desc: "Fill in your marks, class, and other details", icon: "📝" },
              { step: "02", title: "Verify Email", desc: "Quick OTP verification for security", icon: "✉️" },
              { step: "03", title: "Get Result", desc: "Instant AI-powered rank prediction", icon: "🎯" },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                {/* Step Number */}
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                  {item.icon}
                </div>

                <div className="absolute -top-2 -right-2 md:right-1/4 w-8 h-8 rounded-full bg-white text-black font-black flex items-center justify-center text-sm">
                  {item.step}
                </div>

                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 ANSWER KEYS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-500 font-semibold text-sm tracking-wider uppercase">Resources</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
              Answer{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Keys
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                exam: "AMU",
                color: "from-red-500 to-orange-500",
                items: ["Class 6 Answer Key", "Class 9 Answer Key", "Class 11 PCM", "Class 11 PCB"],
              },
              {
                exam: "JMI",
                color: "from-blue-500 to-cyan-500",
                items: ["Class 9 Answer Key", "Class 11 Science", "Class 11 Commerce", "Class 11 Humanities"],
              },
              {
                exam: "Resources",
                color: "from-purple-500 to-pink-500",
                items: ["Previous Year Papers", "Sample Papers", "Study Material", "Exam Tips"],
              },
            ].map((category, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${category.color} text-sm font-bold mb-6`}>
                  {category.exam}
                </div>

                <ul className="space-y-4">
                  {category.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer group/item">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} group-hover/item:scale-150 transition-transform`} />
                      {item}
                      <svg className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 TESTIMONIALS */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-500 font-semibold text-sm tracking-wider uppercase">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
              What Students{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-500">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.class}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 COMING SOON */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-orange-600/20 to-yellow-600/20" />
            <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            <div className="relative z-10 text-center">
              <div className="inline-block px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 text-sm font-bold mb-6">
                🚀 Coming Soon
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Instant Selection Checker
              </h2>

              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Soon, you'll be able to check your selection status instantly using your roll number. 
                No more scrolling through long PDFs!
              </p>

              <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                {["✔ Selection Status", "✔ Rank / Serial No.", "✔ List Type"].map((item, i) => (
                  <div key={i} className="px-4 py-3 rounded-xl bg-white/5 text-sm text-gray-300">
                    {item}
                  </div>
                ))}
              </div>

              {/* Notify Form */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 focus:border-red-500 focus:outline-none transition-colors"
                />
                <button className="px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold hover:scale-105 transition-transform">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 FAQ */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-500 font-semibold text-sm tracking-wider uppercase">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <span className={`text-2xl transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40" : "max-h-0"}`}>
                  <p className="px-6 pb-5 text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 FINAL CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-orange-600/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-[150px]" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Ready to Know Your{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Result?
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-10">
            Join thousands of students who have already discovered their potential.
          </p>

          <Link href="/rank-predictor">
            <button className="group relative px-12 py-5 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl font-bold text-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(239,68,68,0.4)]">
              <span className="relative z-10 flex items-center gap-3">
                Start Prediction Now
                <span className="group-hover:translate-x-2 transition-transform">🚀</span>
              </span>
            </button>
          </Link>

          <p className="mt-6 text-gray-500 text-sm">
            ✓ Free forever &nbsp; ✓ No credit card required &nbsp; ✓ Instant results
          </p>
        </div>
      </section>

      {/* 🔥 ANIMATIONS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(6px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}