"use client";

import { useEffect, useState, useMemo } from "react";
import * as XLSX from "xlsx";

type Student = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  university: string;
  className: string;
  stream?: string;
  category?: string;
  gender: string;
  marks: number;
  predictedRank: number;
  isCoachingStudent: boolean;
  coachingName?: string;
  createdAt?: string;
};

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

// Student Detail Modal
const StudentDetailModal = ({
  isOpen,
  onClose,
  student,
}: {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl font-black">
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{student.name}</h3>
              <p className="text-gray-400">{student.email}</p>
            </div>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Marks", value: student.marks, color: "text-blue-400" },
            { label: "Predicted Rank", value: student.predictedRank, color: "text-red-400" },
            { label: "Class", value: student.className, color: "text-purple-400" },
            { label: "University", value: student.university, color: "text-green-400" },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 text-center">
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-300">Student Details</h4>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Gender", value: student.gender },
              { label: "Category", value: student.category || "N/A" },
              { label: "Stream", value: student.stream || "N/A" },
              { label: "Phone", value: student.phone || "N/A" },
              { label: "Coaching Student", value: student.isCoachingStudent ? "Yes" : "No" },
              { label: "Coaching Name", value: student.coachingName || "N/A" },
              { label: "Registered On", value: student.createdAt ? new Date(student.createdAt).toLocaleDateString() : "N/A" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5">
                <p className="text-gray-500 text-sm mb-1">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Email
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-white/10 rounded-xl font-medium hover:bg-white/5 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Confirm Delete Modal
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  count,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  count?: number;
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
          <p className="text-gray-400 mb-2">{message}</p>
          {count && count > 1 && (
            <p className="text-red-400 font-semibold mb-4">
              {count} students will be deleted
            </p>
          )}
          <div className="flex gap-3 mt-6">
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

// Export Modal
const ExportModal = ({
  isOpen,
  onClose,
  onExport,
  count,
}: {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: "xlsx" | "csv" | "json") => void;
  count: number;
}) => {
  if (!isOpen) return null;

  const formats = [
    { id: "xlsx", label: "Excel (.xlsx)", icon: "📊", desc: "Best for spreadsheets" },
    { id: "csv", label: "CSV (.csv)", icon: "📄", desc: "Universal format" },
    { id: "json", label: "JSON (.json)", icon: "🔧", desc: "For developers" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 max-w-md w-full animate-scaleIn">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center text-3xl">
            📥
          </div>
          <h3 className="text-xl font-bold mb-2">Export Students</h3>
          <p className="text-gray-400">
            Export <span className="text-green-400 font-semibold">{count}</span> students
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {formats.map((format) => (
            <button
              key={format.id}
              onClick={() => onExport(format.id as "xlsx" | "csv" | "json")}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/30 transition-all text-left group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{format.icon}</span>
              <div className="flex-1">
                <p className="font-semibold">{format.label}</p>
                <p className="text-sm text-gray-500">{format.desc}</p>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full px-6 py-3 border border-white/10 rounded-xl font-medium hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Student; direction: "asc" | "desc" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [detailModal, setDetailModal] = useState<{ isOpen: boolean; student: Student | null }>({ isOpen: false, student: null });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; ids: string[] }>({ isOpen: false, ids: [] });
  const [exportModal, setExportModal] = useState(false);

  const [filters, setFilters] = useState({
    university: "",
    className: "",
    gender: "",
    coaching: "",
    category: "",
  });

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/students");
      const data = await res.json();
      setStudents(data.students || []);
    } catch (err) {
      console.error("Fetch error:", err);
      showToast("Failed to fetch students", "error");
    }
    setLoading(false);
  };

  // Filter logic
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesFilters =
        (!filters.university || s.university === filters.university) &&
        (!filters.className || s.className === filters.className) &&
        (!filters.gender || s.gender === filters.gender) &&
        (!filters.category || s.category === filters.category) &&
        (!filters.coaching ||
          (filters.coaching === "true" && s.isCoachingStudent) ||
          (filters.coaching === "false" && !s.isCoachingStudent));

      const matchesSearch =
        !searchQuery ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone?.includes(searchQuery);

      return matchesFilters && matchesSearch;
    });
  }, [students, filters, searchQuery]);

  // Sort logic
  const sortedStudents = useMemo(() => {
    if (!sortConfig) return filteredStudents;

    return [...filteredStudents].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === undefined || bValue === undefined) return 0;

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredStudents, sortConfig]);

  // Pagination
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedStudents, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);

  // Stats
  const stats = useMemo(() => ({
    total: students.length,
    amu: students.filter((s) => s.university === "AMU").length,
    jmi: students.filter((s) => s.university === "JMI").length,
    coaching: students.filter((s) => s.isCoachingStudent).length,
    avgMarks: students.length > 0 ? Math.round(students.reduce((acc, s) => acc + s.marks, 0) / students.length) : 0,
    topRank: students.length > 0 ? Math.min(...students.map((s) => s.predictedRank)) : 0,
  }), [students]);

  // Sort handler
  const handleSort = (key: keyof Student) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  // Select all handler
  const handleSelectAll = () => {
    if (selectedStudents.length === paginatedStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(paginatedStudents.map((s) => s._id));
    }
  };

  // Select single handler
  const handleSelectStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Delete handler
  const handleDelete = async () => {
    try {
      await Promise.all(
        deleteModal.ids.map((id) =>
          fetch(`/api/admin/students/${id}`, { method: "DELETE" })
        )
      );
      showToast(`${deleteModal.ids.length} student(s) deleted successfully`, "success");
      setSelectedStudents([]);
      fetchStudents();
    } catch (err) {
      showToast("Failed to delete students", "error");
    }
    setDeleteModal({ isOpen: false, ids: [] });
  };

  // Export handler
  const handleExport = (format: "xlsx" | "csv" | "json") => {
    const dataToExport = selectedStudents.length > 0
      ? filteredStudents.filter((s) => selectedStudents.includes(s._id))
      : filteredStudents;

    const exportData = dataToExport.map((s) => ({
      Name: s.name,
      Email: s.email,
      Phone: s.phone || "",
      University: s.university,
      Class: s.className,
      Stream: s.stream || "",
      Category: s.category || "",
      Gender: s.gender,
      Marks: s.marks,
      "Predicted Rank": s.predictedRank,
      "Coaching Student": s.isCoachingStudent ? "Yes" : "No",
      "Coaching Name": s.coachingName || "",
    }));

    if (format === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
      XLSX.writeFile(workbook, "students.xlsx");
    } else if (format === "csv") {
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "students.csv";
      a.click();
    } else if (format === "json") {
      const json = JSON.stringify(exportData, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "students.json";
      a.click();
    }

    showToast(`Exported ${dataToExport.length} students as ${format.toUpperCase()}`, "success");
    setExportModal(false);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      university: "",
      className: "",
      gender: "",
      coaching: "",
      category: "",
    });
    setSearchQuery("");
  };

  const hasActiveFilters = Object.values(filters).some((v) => v) || searchQuery;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      <ParticlesBackground />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Modals */}
      <StudentDetailModal
        isOpen={detailModal.isOpen}
        onClose={() => setDetailModal({ isOpen: false, student: null })}
        student={detailModal.student}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, ids: [] })}
        onConfirm={handleDelete}
        title="Delete Student(s)"
        message="Are you sure you want to delete? This action cannot be undone."
        count={deleteModal.ids.length}
      />

      <ExportModal
        isOpen={exportModal}
        onClose={() => setExportModal(false)}
        onExport={handleExport}
        count={selectedStudents.length > 0 ? selectedStudents.length : filteredStudents.length}
      />

      {/* Main Content */}
      <div className="relative z-10 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Student{" "}
              </span>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Database
              </span>
            </h1>
            <p className="text-gray-500 mt-2">Manage all registered students and their predictions</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {selectedStudents.length > 0 && (
              <button
                onClick={() => setDeleteModal({ isOpen: true, ids: selectedStudents })}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-medium hover:bg-red-500/30 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete ({selectedStudents.length})
              </button>
            )}

            <button
              onClick={() => setExportModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl font-medium hover:bg-green-500/30 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>

            <button
              onClick={fetchStudents}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-colors"
            >
              <svg className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Total Students", value: stats.total, icon: "👥", gradient: "from-red-500 to-orange-500" },
            { label: "AMU Students", value: stats.amu, icon: "🏫", gradient: "from-blue-500 to-cyan-500" },
            { label: "JMI Students", value: stats.jmi, icon: "🎓", gradient: "from-purple-500 to-pink-500" },
            { label: "Coaching", value: stats.coaching, icon: "📚", gradient: "from-green-500 to-emerald-500" },
            { label: "Avg. Marks", value: stats.avgMarks, icon: "📊", gradient: "from-yellow-500 to-orange-500" },
            { label: "Top Rank", value: stats.topRank || "N/A", icon: "🏆", gradient: "from-indigo-500 to-purple-500" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs lg:text-sm">{stat.label}</p>
                  <p className={`text-2xl lg:text-3xl font-black mt-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {loading ? "..." : stat.value}
                  </p>
                </div>
                <span className="text-2xl lg:text-3xl">{stat.icon}</span>
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
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Items per page */}
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>

          {/* Filter Pills */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
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
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
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
              value={filters.coaching}
              onChange={(e) => setFilters({ ...filters, coaching: e.target.value })}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">All Students</option>
              <option value="true">Coaching Students</option>
              <option value="false">Non-Coaching</option>
            </select>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-gray-500 text-sm">Active filters:</span>
              {Object.entries(filters).map(([key, value]) =>
                value ? (
                  <span
                    key={key}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm border border-red-500/30"
                  >
                    {key === "coaching" ? (value === "true" ? "Coaching" : "Non-Coaching") : value}
                    <button
                      onClick={() => setFilters({ ...filters, [key]: "" })}
                      className="hover:text-white transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ) : null
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm border border-blue-500/30">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:text-white transition-colors">
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-sm text-gray-400 hover:text-white transition-colors underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
              <p className="text-gray-400">Loading students...</p>
            </div>
          </div>
        ) : paginatedStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-5xl mb-4">
              👥
            </div>
            <h3 className="text-xl font-bold mb-2">No Students Found</h3>
            <p className="text-gray-400 mb-6">
              {hasActiveFilters
                ? "Try adjusting your filters or search query"
                : "No students have registered yet"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold hover:scale-105 transition-transform"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="py-4 px-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedStudents.length === paginatedStudents.length && paginatedStudents.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-gray-600 bg-transparent text-red-500 focus:ring-red-500 focus:ring-offset-0"
                      />
                    </th>
                    {[
                      { key: "name", label: "Student" },
                      { key: "university", label: "University" },
                      { key: "className", label: "Class" },
                      { key: "gender", label: "Gender" },
                      { key: "marks", label: "Marks" },
                      { key: "predictedRank", label: "Rank" },
                      { key: "isCoachingStudent", label: "Coaching" },
                    ].map((col) => (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key as keyof Student)}
                        className="py-4 px-4 text-left text-gray-400 font-medium text-sm cursor-pointer hover:text-white transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          {col.label}
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              sortConfig?.key === col.key
                                ? sortConfig.direction === "asc"
                                  ? "rotate-0 text-red-400"
                                  : "rotate-180 text-red-400"
                                : "opacity-0 group-hover:opacity-50"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </div>
                      </th>
                    ))}
                    <th className="py-4 px-4 text-left text-gray-400 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((student, index) => (
                    <tr
                      key={student._id}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                        selectedStudents.includes(student._id) ? "bg-red-500/10" : ""
                      }`}
                      style={{ animationDelay: `${index * 0.02}s` }}
                    >
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student._id)}
                          onChange={() => handleSelectStudent(student._id)}
                          className="w-4 h-4 rounded border-gray-600 bg-transparent text-red-500 focus:ring-red-500 focus:ring-offset-0"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-sm font-bold">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-white">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            student.university === "AMU"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {student.university}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white">
                        {student.className}
                        {student.stream && (
                          <span className="text-gray-500 text-sm ml-1">({student.stream})</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            student.gender === "Male"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-pink-500/20 text-pink-400"
                          }`}
                        >
                          {student.gender}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white font-semibold">{student.marks}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-red-400 font-bold text-lg">#{student.predictedRank}</span>
                      </td>
                      <td className="py-4 px-4">
                        {student.isCoachingStudent ? (
                          <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs font-medium">
                            ✓ Yes
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-lg bg-gray-500/20 text-gray-400 text-xs font-medium">
                            No
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setDetailModal({ isOpen: true, student })}
                            className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                            title="View Details"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, ids: [student._id] })}
                            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                            title="Delete"
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

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-white/10">
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, sortedStudents.length)} of {sortedStudents.length} students
                {selectedStudents.length > 0 && (
                  <span className="text-red-400 ml-2">({selectedStudents.length} selected)</span>
                )}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? "bg-red-500 text-white"
                            : "bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

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

        input[type="checkbox"] {
          cursor: pointer;
        }

        input[type="checkbox"]:checked {
          background-color: #ef4444;
          border-color: #ef4444;
        }
      `}</style>
    </div>
  );
}