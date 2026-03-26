"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

type Student = {
  _id: string;
  name: string;
  email: string;
  university: string;
  className: string;
  gender: string;
  marks: number;
  predictedRank: number;
  isCoachingStudent: boolean;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    university: "",
    className: "",
    gender: "",
    coaching: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/students");
      const data = await res.json();

      setStudents(data.students || []); // ✅ FIXED
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  // 🔍 Filter logic (FIXED)
  const filtered = students.filter((s) => {
    return (
      (!filters.university || s.university === filters.university) &&
      (!filters.className || s.className === filters.className) &&
      (!filters.gender || s.gender === filters.gender) &&
      (!filters.coaching ||
        (filters.coaching === "true" && s.isCoachingStudent) ||
        (filters.coaching === "false" && !s.isCoachingStudent))
    );
  });

  // 📥 Export Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "students.xlsx");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">

      <h1 className="text-2xl font-bold text-red-500 mb-4">
        Student Data
      </h1>

      {/* FILTERS */}
      <div className="grid grid-cols-4 gap-2 mb-4">

        <select
          value={filters.university}
          onChange={(e)=>setFilters({...filters, university:e.target.value})}
          className="bg-[#1a1a1a] p-2 rounded"
        >
          <option value="">University</option>
          <option value="AMU">AMU</option>
          <option value="JMI">JMI</option>
        </select>

        <select
          value={filters.className}
          onChange={(e)=>setFilters({...filters, className:e.target.value})}
          className="bg-[#1a1a1a] p-2 rounded"
        >
          <option value="">Class</option>
          <option value="6">6</option>
          <option value="9">9</option>
          <option value="11">11</option>
        </select>

        <select
          value={filters.gender}
          onChange={(e)=>setFilters({...filters, gender:e.target.value})}
          className="bg-[#1a1a1a] p-2 rounded"
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          value={filters.coaching}
          onChange={(e)=>setFilters({...filters, coaching:e.target.value})}
          className="bg-[#1a1a1a] p-2 rounded"
        >
          <option value="">Coaching</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* EXPORT BUTTON */}
      <button
        onClick={exportExcel}
        className="bg-green-600 px-4 py-2 rounded mb-4 hover:bg-green-700"
      >
        Download Excel
      </button>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-yellow-400 mb-4">
          Loading students...
        </p>
      )}

      {/* TABLE */}
      <div className="overflow-auto border border-[#2a2a2a] rounded-lg">
        <table className="w-full">
          <thead className="bg-[#1a1a1a] text-gray-300">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">University</th>
              <th className="p-2 text-left">Class</th>
              <th className="p-2 text-left">Gender</th>
              <th className="p-2 text-left">Marks</th>
              <th className="p-2 text-left">Rank</th>
              <th className="p-2 text-left">Coaching</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((s) => (
                <tr key={s._id} className="border-t border-[#2a2a2a] hover:bg-[#1a1a1a]">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.email}</td>
                  <td className="p-2">{s.university}</td>
                  <td className="p-2">{s.className}</td>
                  <td className="p-2">{s.gender}</td>
                  <td className="p-2">{s.marks}</td>
                  <td className="p-2 text-red-400 font-semibold">
                    {s.predictedRank}
                  </td>
                  <td className="p-2">
                    {s.isCoachingStudent ? "Yes" : "No"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-400">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}