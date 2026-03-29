// app/contact/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Floating Particles Background
const ParticlesBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(30)].map((_, i) => (
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

// Toast Notification
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}) => {
  const colors = {
    success: "bg-green-500/20 border-green-500/30 text-green-400",
    error: "bg-red-500/20 border-red-500/30 text-red-400",
    info: "bg-blue-500/20 border-blue-500/30 text-blue-400",
  };

  const icons = { success: "✅", error: "❌", info: "ℹ️" };

  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-slideIn ${colors[type]}`}
    >
      <span className="text-xl">{icons[type]}</span>
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
        ✕
      </button>
    </div>
  );
};

// Input Component
const InputField = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon,
  error,
  required,
}: {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-5 py-4 pl-12 rounded-xl bg-white/5 border ${
            error ? "border-red-500/50" : "border-white/10"
          } focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 placeholder-gray-500 text-white`}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-400 transition-colors">
          {icon}
        </div>
      </div>
    </div>
    {error && (
      <p className="text-red-400 text-sm flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {error}
      </p>
    )}
  </div>
);

// Textarea Component
const TextareaField = ({
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
  rows = 5,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  error?: string;
  required?: boolean;
  rows?: number;
}) => (
  <div className="space-y-2">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${
            error ? "border-red-500/50" : "border-white/10"
          } focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 placeholder-gray-500 text-white resize-none`}
        />
      </div>
    </div>
    {error && (
      <p className="text-red-400 text-sm flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {error}
      </p>
    )}
  </div>
);

// Contact Info Card
const ContactCard = ({
  icon,
  title,
  content,
  link,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
  gradient: string;
}) => (
  <a
    href={link}
    target={link?.startsWith("http") ? "_blank" : undefined}
    rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
    className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] block"
  >
    {/* Glow Effect */}
    <div
      className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
    />

    <div className="relative z-10 flex items-start gap-4">
      <div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1 group-hover:text-red-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm">{content}</p>
      </div>
    </div>

    {/* Arrow */}
    {link && (
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    )}
  </a>
);

// Social Button
const SocialButton = ({
  icon,
  label,
  href,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-${color}-500/50 hover:bg-${color}-500/10 transition-all duration-300 hover:-translate-y-1`}
  >
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    <span className="font-medium">{label}</span>
  </a>
);

// FAQ Accordion Item
const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors">
    <button
      onClick={onClick}
      className="w-full px-6 py-5 flex items-center justify-between text-left bg-white/5 hover:bg-white/10 transition-colors"
    >
      <span className="font-semibold pr-4">{question}</span>
      <span
        className={`text-2xl text-red-400 transition-transform duration-300 ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        +
      </span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-96" : "max-h-0"
      }`}
    >
      <p className="px-6 py-5 text-gray-400 border-t border-white/10">{answer}</p>
    </div>
  </div>
);

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Mouse follow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the errors below", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      showToast("Message sent successfully! We'll get back to you soon.", "success");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      showToast("Failed to send message. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email Us",
      content: "imageclasses.info@gmail.com",
      link: "mailto:imageclasses.info@gmail.com",
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Call Us",
      content: "+91 8439387907",
      link: "tel:+918439387907",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Visit Us",
      content: "Aligarh, Uttar Pradesh, India",
      link: "https://maps.google.com/?q=Aligarh,UP,India",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Working Hours",
      content: "Mon - Sat: 9AM - 6PM",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const faqs = [
    {
      question: "How accurate is the rank prediction?",
      answer:
        "Our predictions are based on historical data and advanced algorithms, achieving 85-90% accuracy within the predicted range. We continuously update our models with the latest exam patterns and results.",
    },
    {
      question: "Is my personal data safe with you?",
      answer:
        "Absolutely! We use industry-standard 256-bit SSL encryption and never share your personal information without explicit consent. Your data is stored securely and used only for providing our services.",
    },
    {
      question: "How long does it take to get a response?",
      answer:
        "We typically respond to all inquiries within 24-48 hours during business days. For urgent matters, please call our support line directly.",
    },
    {
      question: "Do you provide coaching services?",
      answer:
        "Yes",
    },
    {
      question: "Is the service free?",
      answer:
        "Yes! Our basic rank prediction service is completely free. We also offer premium features with detailed analytics and personalized guidance for a nominal fee.",
    },
  ];

  const subjects = [
    "General Inquiry",
    "Technical Support",
    "Feedback",
    "Partnership",
    "Bug Report",
    "Feature Request",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Mouse Follow Gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 68, 68, 0.1), transparent 40%)`,
        }}
      />

      <ParticlesBackground />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-[150px] animate-pulse" />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 mb-8 animate-fadeInUp">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-sm text-gray-300">We're here to help</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Get in{" "}
            </span>
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
              Touch
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { value: "< 24h", label: "Response Time" },
              { value: "98%", label: "Satisfaction" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <ContactCard key={i} {...info} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="relative group">
                {/* Card Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 backdrop-blur-xl">
                  {/* Form Header */}
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Send us a Message
                      </span>
                    </h2>
                    <p className="text-gray-400">
                      Fill out the form below and we'll get back to you shortly.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <InputField
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          error={errors.name}
                          required
                          icon={
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <InputField
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          error={errors.email}
                          required
                          icon={
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                              />
                            </svg>
                          }
                        />
                      </div>
                    </div>

                    {/* Phone & Subject */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Phone Number
                        </label>
                        <InputField
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 84393 87907"
                          icon={
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Subject <span className="text-red-400">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                          <select
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            required
                            className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${
                              errors.subject ? "border-red-500/50" : "border-white/10"
                            } focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white appearance-none cursor-pointer`}
                          >
                            <option value="" className="bg-[#1a1a1a]">
                              Select a subject
                            </option>
                            {subjects.map((subject) => (
                              <option key={subject} value={subject} className="bg-[#1a1a1a]">
                                {subject}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                        {errors.subject && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
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
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {errors.subject}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <TextareaField
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        error={errors.message}
                        required
                        rows={5}
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        {form.message.length}/500 characters
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full py-4 bg-gradient-to-r from-red-600 via-red-500 to-orange-600 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(239,68,68,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {/* Button Shine */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <span className="relative flex items-center justify-center gap-3">
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                            Send Message
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Side - Map & Social */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Map Card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent h-[300px] group">
                {/* Placeholder Map */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-400 mb-4">Aligarh, Uttar Pradesh, India</p>
                      <a
                        href="https://maps.google.com/?q=Aligarh,UP,India"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <span>View on Google Maps</span>
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
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Optional: Real Map iframe */}
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                /> */}
              </div>

              {/* Social Links */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10">
                <h3 className="text-xl font-bold mb-6">Connect With Us</h3>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://wa.me/918439387907"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 hover:border-green-500/40 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-green-400">WhatsApp</p>
                      <p className="text-xs text-gray-500">Chat with us</p>
                    </div>
                  </a>

                  <a
                    href="https://t.me/rankpredictor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-400">Telegram</p>
                      <p className="text-xs text-gray-500">Join channel</p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/rankpredictor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-xl bg-pink-500/10 border border-pink-500/20 hover:bg-pink-500/20 hover:border-pink-500/40 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-pink-400">Instagram</p>
                      <p className="text-xs text-gray-500">Follow us</p>
                    </div>
                  </a>

                  <a
                    href="https://www.youtube.com/@imageclasses"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-red-400">YouTube</p>
                      <p className="text-xs text-gray-500">Subscribe</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Office Hours</h3>
                    <p className="text-sm text-gray-500">When we're available</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
                    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
                    { day: "Sunday", time: "Closed" },
                  ].map((schedule, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                    >
                      <span className="text-gray-400">{schedule.day}</span>
                      <span
                        className={
                          schedule.time === "Closed" ? "text-red-400" : "text-white font-medium"
                        }
                      >
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-red-500 font-semibold text-sm tracking-wider uppercase">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-gray-400">
              Find quick answers to common questions about our services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border border-white/10 text-center">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-gray-400 mb-6">
              Can't find the answer you're looking for? Please reach out to our support team.
            </p>
            <Link href="mailto:imageclasses.info@gmail.com">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold hover:scale-105 transition-transform hover:shadow-[0_10px_30px_rgba(239,68,68,0.3)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-orange-600/20 to-yellow-600/20" />
            <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Ready to Predict Your{" "}
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Rank?
                </span>
              </h2>

              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Join thousands of students who have already discovered their potential. Get
                your AI-powered rank prediction now!
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/rank-predictor">
                  <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl font-bold text-lg hover:scale-105 transition-all hover:shadow-[0_20px_40px_rgba(239,68,68,0.3)]">
                    <span className="flex items-center gap-2">
                      🚀 Start Prediction
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                </Link>

                <Link href="/">
                  <button className="px-8 py-4 border-2 border-white/10 rounded-2xl font-bold text-lg hover:border-red-500/50 hover:bg-red-500/10 transition-all">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
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

        @keyframes slideIn {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }

        select {
          background-image: none;
        }
      `}</style>
    </div>
  );
}