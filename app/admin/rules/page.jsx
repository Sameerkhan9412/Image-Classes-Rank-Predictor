"use client";

import { useEffect, useState } from "react";

// Floating Particles Background
const ParticlesBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-red-500/10 rounded-full animate-float"
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

// Toast Notification Component
const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-slideIn ${
    type === "success" 
      ? "bg-green-500/20 border-green-500/30 text-green-400" 
      : "bg-red-500/20 border-red-500/30 text-red-400"
  }`}>
    <span className="text-xl">{type === "success" ? "✅" : "❌"}</span>
    <span className="font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">✕</button>
  </div>
);

// Confirmation Modal
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 max-w-md w-full animate-scaleIn">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center text-3xl">
            ⚠️
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400 mb-6">{message}</p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminRulesPage() {
  const [rules, setRules] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const [form, setForm] = useState({
    university: "AMU",
    className: "11",
    stream: "",
    category: "General",
    gender: "All",
    quota: "External",
  });

  const [ranges, setRanges] = useState([
    { minMarks: "", maxMarks: "", minRank: "", maxRank: "" },
  ]);

  const [filters, setFilters] = useState({
    university: "",
    className: "",
    category: "",
    gender: "",
    quota: "",
    sort: "latest",
  });

  // Show toast helper
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 📥 FETCH
  const fetchRules = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/rules");
      const data = await res.json();
      setRules(data);
    } catch (error) {
      showToast("Failed to fetch rules", "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  // ➕ ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const url = editId ? `/api/admin/rules/${editId}` : "/api/admin/rules";
    const method = editId ? "PUT" : "POST";

    const payload = {
      ...form,
      stream: form.className === "11" ? form.stream : "",
      ranges,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Something went wrong", "error");
        return;
      }

      showToast(editId ? "Rule updated successfully! ✅" : "Rule added successfully! ✅", "success");
      resetForm();
      fetchRules();
      setShowForm(false);
    } catch (error) {
      showToast("Network error", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      university: "AMU",
      className: "11",
      stream: "",
      category: "General",
      gender: "All",
      quota: "External",
    });
    setRanges([{ minMarks: "", maxMarks: "", minRank: "", maxRank: "" }]);
  };

  // ✏️ EDIT
  const handleEdit = (rule) => {
    setEditId(rule._id);
    setForm(rule);
    setRanges(rule.ranges);
    setShowForm(true);
  };

  // ❌ DELETE
  const handleDelete = async () => {
    if (!deleteModal.id) return;
    
    try {
      await fetch(`/api/admin/rules/${deleteModal.id}`, { method: "DELETE" });
      showToast("Rule deleted successfully!", "success");
      fetchRules();
    } catch (error) {
      showToast("Failed to delete rule", "error");
    }
    setDeleteModal({ isOpen: false, id: null });
  };

  // ➕ RANGE
  const addRow = () => {
    setRanges([...ranges, { minMarks: "", maxMarks: "", minRank: "", maxRank: "" }]);
  };

  const removeRow = (i) => {
    if (ranges.length === 1) return;
    setRanges(ranges.filter((_, index) => index !== i));
  };

  const handleRangeChange = (i, e) => {
    const updated = [...ranges];
    updated[i][e.target.name] = e.target.value;
    setRanges(updated);
  };

  // 🔍 FILTER
  const filteredRules = rules.filter((rule) => {
    const matchesFilters =
      (!filters.university || rule.university === filters.university) &&
      (!filters.className || rule.className === filters.className) &&
      (!filters.category || rule.category === filters.category) &&
      (!filters.gender || filters.gender === "All" || rule.gender === filters.gender) &&
      (!filters.quota || rule.quota === filters.quota);

    const matchesSearch =
      !searchQuery ||
      rule.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.stream?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilters && matchesSearch;
  });

  // Stats
  const stats = {
    total: rules.length,
    amu: rules.filter((r) => r.university === "AMU").length,
    jmi: rules.filter((r) => r.university === "JMI").length,
    class11: rules.filter((r) => r.className === "11").length,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      <ParticlesBackground />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Rule"
        message="Are you sure you want to delete this rule? This action cannot be undone."
      />

      {/* Main Content */}
      <div className="relative z-10 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Rule{" "}
              </span>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-gray-500 mt-2">Manage prediction rules and mark ranges</p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold hover:scale-105 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(239,68,68,0.3)]"
          >
            <span className="text-xl group-hover:rotate-90 transition-transform duration-300">+</span>
            Add New Rule
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Rules", value: stats.total, icon: "/logo.png", gradient: "from-red-500 to-orange-500" },
            { label: "AMU Rules", value: stats.amu, icon: "/amu.png", gradient: "from-blue-500 to-cyan-500" },
            { label: "JMI Rules", value: stats.jmi, icon: "/jmi.png", gradient: "from-purple-500 to-pink-500" },
            { label: "Class 11", value: stats.class11, icon: "📚", gradient: "from-green-500 to-emerald-500" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className={`text-3xl font-black mt-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {isLoading ? "..." : stat.value}
                  </p>
                </div>
                {/* <span className="text-3xl">{stat.icon}</span> */}
                <img src={stat.icon} width={50} height={50} alt="logo" />
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search rules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* View Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-3 transition-colors ${viewMode === "grid" ? "bg-red-500 text-white" : "bg-white/5 hover:bg-white/10"}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-3 transition-colors ${viewMode === "table" ? "bg-red-500 text-white" : "bg-white/5 hover:bg-white/10"}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
            <select
              value={filters.university}
              onChange={(e) => setFilters({ ...filters, university: e.target.value })}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">All Universities</option>
              <option value="AMU">AMU</option>
              <option value="JMI">JMI</option>
            </select>

            <select
              value={filters.className}
              onChange={(e) => setFilters({ ...filters, className: e.target.value })}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">All Classes</option>
              <option value="6">Class 6</option>
              <option value="9">Class 9</option>
              <option value="11">Class 11</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>

            <select
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">All Genders</option>
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              value={filters.quota}
              onChange={(e) => setFilters({ ...filters, quota: e.target.value })}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">All Quotas</option>
              <option value="Internal">Internal</option>
              <option value="External">External</option>
            </select>
          </div>

          {/* Active Filters */}
          {Object.values(filters).some((v) => v && v !== "latest") && (
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(filters).map(([key, value]) =>
                value && value !== "latest" ? (
                  <span
                    key={key}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm border border-red-500/30"
                  >
                    {value}
                    <button
                      onClick={() => setFilters({ ...filters, [key]: "" })}
                      className="hover:text-white transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ) : null
              )}
              <button
                onClick={() =>
                  setFilters({
                    university: "",
                    className: "",
                    category: "",
                    gender: "",
                    quota: "",
                    sort: "latest",
                  })
                }
                className="text-sm text-gray-400 hover:text-white transition-colors underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Rules Display */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
              <p className="text-gray-400">Loading rules...</p>
            </div>
          </div>
        ) : filteredRules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-5xl mb-4">
              📋
            </div>
            <h3 className="text-xl font-bold mb-2">No Rules Found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || Object.values(filters).some((v) => v)
                ? "Try adjusting your filters or search query"
                : "Get started by adding your first rule"}
            </p>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              + Add Rule
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRules.map((rule, index) => (
              <div
                key={rule._id}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Header */}
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      // className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black ${
                      //   rule.university === "AMU"
                      //     ? "bg-gradient-to-br from-red-500 to-orange-500"
                      //     : "bg-gradient-to-br from-blue-500 to-cyan-500"
                      // }`}
                    >
                      {rule.university === "AMU" ? <img src="/amu.png" className="w-10 h-10" /> :<img src="/jmi.png" className="w-10 h-10" /> }
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{rule.university}</h3>
                      <p className="text-sm text-gray-400">Class {rule.className}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(rule)}
                      className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, id: rule._id })}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="relative z-10 flex flex-wrap gap-2 mb-4">
                  {[
                    { label: rule.stream || "N/A", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
                    { label: rule.category, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                    { label: rule.gender, color: "bg-green-500/20 text-green-400 border-green-500/30" },
                    { label: rule.quota, color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
                  ].map((tag, i) => (
                    <span key={i} className={`px-2 py-1 rounded-lg text-xs font-medium border ${tag.color}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>

                {/* Ranges */}
                <div className="relative z-10 space-y-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Mark Ranges</p>
                  <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                    {rule.ranges.map((r, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                      >
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="text-gray-400">Marks:</span>{" "}
                            <span className="font-bold text-white">{r.minMarks} - {r.maxMarks}</span>
                          </p>
                        </div>
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <div className="flex-1 text-right">
                          <p className="text-sm">
                            <span className="text-gray-400">Rank:</span>{" "}
                            <span className="font-bold text-red-400">{r.minRank} - {r.maxRank}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">University</th>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Class</th>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Stream</th>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Category</th>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Gender</th>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Quota</th>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Ranges</th>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRules.map((rule) => (
                    <tr key={rule._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          rule.university === "AMU" 
                            ? "bg-red-500/20 text-red-400" 
                            : "bg-blue-500/20 text-blue-400"
                        }`}>
                          {rule.university}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white">{rule.className}</td>
                      <td className="py-4 px-6 text-gray-400">{rule.stream || "N/A"}</td>
                      <td className="py-4 px-6 text-gray-400">{rule.category}</td>
                      <td className="py-4 px-6 text-gray-400">{rule.gender}</td>
                      <td className="py-4 px-6 text-gray-400">{rule.quota}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 rounded-lg bg-white/10 text-sm">
                          {rule.ranges.length} ranges
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(rule)}
                            className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, id: rule._id })}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && filteredRules.length > 0 && (
          <div className="mt-6 text-center text-gray-500 text-sm">
            Showing {filteredRules.length} of {rules.length} rules
          </div>
        )}
      </div>

      {/* Add/Edit Rule Slide-over Panel */}
      {showForm && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />

          {/* Panel */}
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-xl bg-[#0f0f0f] border-l border-white/10 overflow-y-auto animate-slideInRight">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#0f0f0f]/95 backdrop-blur-xl border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                      {editId ? "Edit Rule" : "Add New Rule"}
                    </span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Fill in the details below</p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-sm">1</span>
                  Basic Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* University */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">University</label>
                    <select
                      value={form.university}
                      onChange={(e) => setForm({ ...form, university: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="AMU">AMU</option>
                      <option value="JMI">JMI</option>
                    </select>
                  </div>

                  {/* Class */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Class</label>
                    <select
                      value={form.className}
                      onChange={(e) => setForm({ ...form, className: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="6">Class 6</option>
                      <option value="9">Class 9</option>
                      <option value="11">Class 11</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option>General</option>
                      <option>OBC</option>
                      <option>SC</option>
                      <option>ST</option>
                    </select>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Gender</label>
                    <select
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option>All</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  {/* Quota */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Quota</label>
                    <select
                      value={form.quota}
                      onChange={(e) => setForm({ ...form, quota: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option>Internal</option>
                      <option>External</option>
                    </select>
                  </div>

                  {/* Stream - Only for Class 11 */}
                  {form.className === "11" && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Stream</label>
                      <select
                        value={form.stream}
                        onChange={(e) => setForm({ ...form, stream: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select Stream</option>
                        <option>PCM</option>
                        <option>PCB</option>
                        <option>Diploma</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Mark Ranges */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-sm">2</span>
                    Mark Ranges
                  </h3>
                  <button
                    type="button"
                    onClick={addRow}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                  >
                    <span>+</span> Add Range
                  </button>
                </div>

                <div className="space-y-3">
                  {ranges.map((r, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Range #{i + 1}</span>
                        {ranges.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRow(i)}
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Min Marks</label>
                          <input
                            type="number"
                            name="minMarks"
                            value={r.minMarks}
                            onChange={(e) => handleRangeChange(i, e)}
                            placeholder="0"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Max Marks</label>
                          <input
                            type="number"
                            name="maxMarks"
                            value={r.maxMarks}
                            onChange={(e) => handleRangeChange(i, e)}
                            placeholder="100"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Min Rank</label>
                          <input
                            type="number"
                            name="minRank"
                            value={r.minRank}
                            onChange={(e) => handleRangeChange(i, e)}
                            placeholder="1"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Max Rank</label>
                          <input
                            type="number"
                            name="maxRank"
                            value={r.maxRank}
                            onChange={(e) => handleRangeChange(i, e)}
                            placeholder="100"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="sticky bottom-0 pt-4 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f] to-transparent -mx-6 px-6 pb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold text-lg hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(239,68,68,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {editId ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    <>
                      {editId ? "Update Rule" : "Add Rule"}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
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

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.5);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.7);
        }

        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.75rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }

        select option {
          background: #1a1a1a;
          color: white;
        }
      `}</style>
    </div>
  );
}