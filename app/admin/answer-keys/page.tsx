"use client";

import { useEffect, useState, useRef, useCallback } from "react";

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

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
  };

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

// Confirmation Modal
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}) => {
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

// Preview Modal
const PreviewModal = ({
  isOpen,
  onClose,
  item,
}: {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">
              {item.university} - Class {item.className} {item.stream && `(${item.stream})`}
            </h3>
            <p className="text-gray-400 text-sm">{item.year} Answer Key</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* PDF Preview */}
        <div className="rounded-xl overflow-hidden bg-white/5 h-[60vh]">
          <iframe src={item.fileUrl} className="w-full h-full" title="PDF Preview" />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <a
            href={item.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-medium hover:scale-[1.02] transition-transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download PDF
          </a>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-white/10 rounded-xl font-medium hover:bg-white/5 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// File Drop Zone Component
const FileDropZone = ({
  file,
  setFile,
  accept = "application/pdf",
}: {
  file: File | null;
  setFile: (file: File | null) => void;
  accept?: string;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      }
    },
    [setFile]
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
        isDragging
          ? "border-red-500 bg-red-500/10"
          : file
          ? "border-green-500/50 bg-green-500/5"
          : "border-white/20 hover:border-red-500/50 hover:bg-white/5"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {file ? (
        <div className="flex items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl">
            📄
          </div>
          <div className="text-left">
            <p className="font-semibold text-white truncate max-w-[200px]">{file.name}</p>
            <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
            }}
            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <p className="text-gray-400 mb-2">
            <span className="text-red-400 font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-gray-500 text-sm">PDF files only (max 10MB)</p>
        </>
      )}
    </div>
  );
};

export default function AnswerKeyAdmin() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null,
  });
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; item: any }>({
    isOpen: false,
    item: null,
  });

  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    type: "IMAGE",
    university: "AMU",
    className: "6",
    stream: "",
    year: "",
    totalQuestions: "",
    disputedQuestions: "",
    releaseDate: "",
  });

  const [filters, setFilters] = useState({
    university: "",
    className: "",
    type: "",
    year: "",
  });

  // Show toast helper
  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 📥 FETCH
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/answer-keys");
      const d = await res.json();
      setData(d);
    } catch (error) {
      showToast("Failed to fetch answer keys", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔄 CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };

    if (name === "className" && value !== "11") {
      updated.stream = "";
    }

    setForm(updated);
  };

  // ✅ VALIDATION
  const isValid = () => {
    if (!form.year) return false;
    if (!form.totalQuestions) return false;
    if (form.type === "IMAGE" && !form.disputedQuestions) return false;
    if (form.type === "OFFICIAL" && !form.releaseDate) return false;
    if (form.className === "11" && !form.stream) return false;
    if (!file) return false;
    return true;
  };

  // 🚀 SUBMIT
  const handleSubmit = async () => {
    if (!isValid()) {
      showToast("Please fill all required fields", "error");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/admin/answer-keys", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!res.ok) {
        showToast("Upload failed", "error");
        return;
      }

      showToast("Answer key uploaded successfully! ✅", "success");
      resetForm();
      fetchData();
      setShowForm(false);
    } catch (error) {
      showToast("Network error", "error");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  const resetForm = () => {
    setFile(null);
    setForm({
      type: "IMAGE",
      university: "AMU",
      className: "6",
      stream: "",
      year: "",
      totalQuestions: "",
      disputedQuestions: "",
      releaseDate: "",
    });
  };

  // ❌ DELETE
  const handleDelete = async () => {
    if (!deleteModal.id) return;

    try {
      await fetch(`/api/admin/answer-keys/${deleteModal.id}`, { method: "DELETE" });
      showToast("Answer key deleted successfully!", "success");
      fetchData();
    } catch (error) {
      showToast("Failed to delete", "error");
    }
    setDeleteModal({ isOpen: false, id: null });
  };

  // 🔍 FILTER
  const filteredData = data.filter((item) => {
    const matchesFilters =
      (!filters.university || item.university === filters.university) &&
      (!filters.className || item.className === filters.className) &&
      (!filters.type || item.type === filters.type) &&
      (!filters.year || item.year === filters.year);

    const matchesSearch =
      !searchQuery ||
      item.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.year.includes(searchQuery) ||
      item.stream?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilters && matchesSearch;
  });

  // Stats
  const stats = {
    total: data.length,
    amu: data.filter((r) => r.university === "AMU").length,
    jmi: data.filter((r) => r.university === "JMI").length,
    official: data.filter((r) => r.type === "OFFICIAL").length,
  };

  // Get unique years for filter
  const uniqueYears = [...new Set(data.map((item) => item.year))].sort().reverse();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      <ParticlesBackground />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Answer Key"
        message="Are you sure you want to delete this answer key? This action cannot be undone."
      />

      {/* Preview Modal */}
      <PreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ isOpen: false, item: null })}
        item={previewModal.item}
      />

      {/* Main Content */}
      <div className="relative z-10 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Answer{" "}
              </span>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Keys
              </span>
            </h1>
            <p className="text-gray-500 mt-2">Manage answer keys for all classes and exams</p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold hover:scale-105 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(239,68,68,0.3)]"
          >
            <svg
              className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload Answer Key
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Keys", value: stats.total, icon: "📋", gradient: "from-red-500 to-orange-500" },
            { label: "AMU Keys", value: stats.amu, icon: "🏫", gradient: "from-blue-500 to-cyan-500" },
            { label: "JMI Keys", value: stats.jmi, icon: "🎓", gradient: "from-purple-500 to-pink-500" },
            { label: "Official", value: stats.official, icon: "✅", gradient: "from-green-500 to-emerald-500" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/30 transition-all duration-300 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p
                    className={`text-3xl font-black mt-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                  >
                    {loading ? "..." : stat.value}
                  </p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
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
                placeholder="Search answer keys..."
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* View Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-3 transition-colors ${
                  viewMode === "grid" ? "bg-red-500 text-white" : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-3 transition-colors ${
                  viewMode === "table" ? "bg-red-500 text-white" : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
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
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="IMAGE">Image Based</option>
              <option value="OFFICIAL">Official</option>
            </select>

            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters */}
          {Object.values(filters).some((v) => v) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(filters).map(([key, value]) =>
                value ? (
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
                onClick={() => setFilters({ university: "", className: "", type: "", year: "" })}
                className="text-sm text-gray-400 hover:text-white transition-colors underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Answer Keys Display */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
              <p className="text-gray-400">Loading answer keys...</p>
            </div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-5xl mb-4">
              📄
            </div>
            <h3 className="text-xl font-bold mb-2">No Answer Keys Found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || Object.values(filters).some((v) => v)
                ? "Try adjusting your filters or search query"
                : "Get started by uploading your first answer key"}
            </p>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              + Upload Answer Key
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredData.map((item, index) => (
              <div
                key={item._id}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Type Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.type === "OFFICIAL"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    }`}
                  >
                    {item.type === "OFFICIAL" ? "✓ Official" : "📷 Image"}
                  </span>
                </div>

                {/* Header */}
                <div className="relative z-10 flex items-start gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black ${
                      item.university === "AMU"
                        ? "bg-gradient-to-br from-red-500 to-orange-500"
                        : "bg-gradient-to-br from-blue-500 to-cyan-500"
                    }`}
                  >
                    {item.university === "AMU" ? "A" : "J"}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.university}</h3>
                    <p className="text-sm text-gray-400">
                      Class {item.className} {item.stream && `• ${item.stream}`}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="relative z-10 space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <span className="text-gray-400 text-sm">Year</span>
                    <span className="font-bold text-white">{item.year}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <span className="text-gray-400 text-sm">Total Questions</span>
                    <span className="font-bold text-white">{item.totalQuestions}</span>
                  </div>

                  {item.type === "IMAGE" && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <span className="text-gray-400 text-sm">Disputed</span>
                      <span className="font-bold text-yellow-400">{item.disputedQuestions}</span>
                    </div>
                  )}

                  {item.type === "OFFICIAL" && item.releaseDate && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <span className="text-gray-400 text-sm">Release Date</span>
                      <span className="font-bold text-green-400">
                        {new Date(item.releaseDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="relative z-10 flex gap-2">
                  <button
                    onClick={() => setPreviewModal({ isOpen: true, item })}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Preview
                  </button>

                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 text-red-400 hover:from-red-600 hover:to-orange-600 hover:text-white hover:border-transparent transition-all text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download
                  </a>

                  <button
                    onClick={() => setDeleteModal({ isOpen: true, id: item._id })}
                    className="p-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
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
                    <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Year</th>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Type</th>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Questions</th>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.university === "AMU"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {item.university}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white">{item.className}</td>
                      <td className="py-4 px-6 text-gray-400">{item.stream || "N/A"}</td>
                      <td className="py-4 px-6 text-white font-semibold">{item.year}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            item.type === "OFFICIAL"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-purple-500/20 text-purple-400"
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400">{item.totalQuestions}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setPreviewModal({ isOpen: true, item })}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                          </a>
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, id: item._id })}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
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
        {!loading && filteredData.length > 0 && (
          <div className="mt-6 text-center text-gray-500 text-sm">
            Showing {filteredData.length} of {data.length} answer keys
          </div>
        )}
      </div>

      {/* Upload Panel */}
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
                      Upload Answer Key
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
            <div className="p-6 space-y-6">
              {/* Type Selection */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-sm">1</span>
                  Answer Key Type
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "IMAGE", label: "Image Based", icon: "📷", desc: "From coaching/teachers" },
                    { value: "OFFICIAL", label: "Official", icon: "✅", desc: "From university" },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setForm({ ...form, type: type.value })}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        form.type === type.value
                          ? "border-red-500 bg-red-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{type.icon}</span>
                      <p className="font-semibold">{type.label}</p>
                      <p className="text-xs text-gray-500">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-sm">2</span>
                  Basic Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* University */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">University *</label>
                    <select
                      name="university"
                      value={form.university}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="AMU">AMU</option>
                      <option value="JMI">JMI</option>
                    </select>
                  </div>

                  {/* Class */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Class *</label>
                    <select
                      name="className"
                      value={form.className}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="6">Class 6</option>
                      <option value="9">Class 9</option>
                      <option value="11">Class 11</option>
                    </select>
                  </div>

                  {/* Stream - Only for Class 11 */}
                  {form.className === "11" && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Stream *</label>
                      <select
                        name="stream"
                        value={form.stream}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select Stream</option>
                        <option value="PCM">PCM</option>
                        <option value="PCB">PCB</option>
                        <option value="Diploma">Diploma</option>
                      </select>
                    </div>
                  )}

                  {/* Year */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Year *</label>
                    <input
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      placeholder="e.g., 2024"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Question Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-sm">3</span>
                  Question Details
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* Total Questions */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Total Questions *</label>
                    <input
                      name="totalQuestions"
                      type="number"
                      value={form.totalQuestions}
                      onChange={handleChange}
                      placeholder="e.g., 100"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                    />
                  </div>

                  {/* Disputed Questions - Only for IMAGE type */}
                  {form.type === "IMAGE" && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Disputed Questions *</label>
                      <input
                        name="disputedQuestions"
                        type="number"
                        value={form.disputedQuestions}
                        onChange={handleChange}
                        placeholder="e.g., 5"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      />
                    </div>
                  )}

                  {/* Release Date - Only for OFFICIAL type */}
                  {form.type === "OFFICIAL" && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Release Date *</label>
                      <input
                        name="releaseDate"
                        type="date"
                        value={form.releaseDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-sm">4</span>
                  Upload PDF
                </h3>

                <FileDropZone file={file} setFile={setFile} />
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Uploading...</span>
                    <span className="text-red-400 font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="sticky bottom-0 pt-4 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f] to-transparent -mx-6 px-6 pb-6">
                <button
                  onClick={handleSubmit}
                  disabled={!isValid() || uploading}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold text-lg hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(239,68,68,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Upload Answer Key
                    </>
                  )}
                </button>

                {!isValid() && (
                  <p className="text-center text-sm text-gray-500 mt-3">* Please fill all required fields</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
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

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}