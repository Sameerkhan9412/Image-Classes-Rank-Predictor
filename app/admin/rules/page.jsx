"use client";

import { useEffect, useState } from "react";

export default function AdminRulesPage() {
  const [rules, setRules] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    university: "AMU",
    className: "11",
    stream: "",
    category: "General",
    gender: "All",
    quota: "External", // 🔥 NEW
  });

  const [ranges, setRanges] = useState([
    { minMarks: "", maxMarks: "", minRank: "", maxRank: "" },
  ]);

  const [filters, setFilters] = useState({
    university: "",
    className: "",
    category: "",
    gender: "",
    quota: "", // 🔥 NEW
    sort: "latest",
  });

  // 📥 FETCH
  const fetchRules = async () => {
    const res = await fetch("/api/admin/rules");
    const data = await res.json();
    setRules(data);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  // ➕ ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId
      ? `/api/admin/rules/${editId}`
      : "/api/admin/rules";

    const method = editId ? "PUT" : "POST";

    const payload = {
      ...form,
      stream: form.className === "11" ? form.stream : "",
      ranges,
    };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.error);

    alert(editId ? "Updated ✅" : "Added ✅");
    resetForm();
    fetchRules();
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
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    await fetch(`/api/admin/rules/${id}`, { method: "DELETE" });
    fetchRules();
  };

  // ➕ RANGE
  const addRow = () => {
    setRanges([
      ...ranges,
      { minMarks: "", maxMarks: "", minRank: "", maxRank: "" },
    ]);
  };

  const removeRow = (i) => {
    setRanges(ranges.filter((_, index) => index !== i));
  };

  const handleRangeChange = (i, e) => {
    const updated = [...ranges];
    updated[i][e.target.name] = e.target.value;
    setRanges(updated);
  };

  // 🔍 FILTER
  const filteredRules = rules.filter((rule) => {
    return (
      (!filters.university || rule.university === filters.university) &&
      (!filters.className || rule.className === filters.className) &&
      (!filters.category || rule.category === filters.category) &&
      (!filters.gender ||
        filters.gender === "All" ||
        rule.gender === filters.gender) &&
      (!filters.quota || rule.quota === filters.quota)
    );
  });

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">

      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Rule Management
      </h1>

      {/* 🔥 ADD RULE */}
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a] mb-8">

        <h2 className="text-xl mb-4 text-red-400">
          {editId ? "Edit Rule" : "Add Rule"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* 🔥 SELECTS */}
          <div className="grid md:grid-cols-6 gap-2">

            {/* UNIVERSITY */}
            <select
              value={form.university}
              onChange={(e) =>
                setForm({ ...form, university: e.target.value })
              }
              className="input"
            >
              <option>AMU</option>
              <option>JMI</option>
            </select>

            {/* CLASS */}
            <select
              value={form.className}
              onChange={(e) =>
                setForm({ ...form, className: e.target.value })
              }
              className="input"
            >
              <option value="6">Class 6</option>
              <option value="9">Class 9</option>
              <option value="11">Class 11</option>
            </select>

            {/* CATEGORY */}
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="input"
            >
              <option>General</option>
              <option>OBC</option>
              <option>SC</option>
              <option>ST</option>
            </select>

            {/* GENDER */}
            <select
              value={form.gender}
              onChange={(e) =>
                setForm({ ...form, gender: e.target.value })
              }
              className="input"
            >
              <option>All</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            {/* 🔥 QUOTA */}
            <select
              value={form.quota}
              onChange={(e) =>
                setForm({ ...form, quota: e.target.value })
              }
              className="input"
            >
              <option>Internal</option>
              <option>External</option>
            </select>

            {/* STREAM */}
            {form.className === "11" && (
              <select
                value={form.stream}
                onChange={(e) =>
                  setForm({ ...form, stream: e.target.value })
                }
                className="input"
              >
                <option value="">Stream</option>
                <option>PCM</option>
                <option>PCB</option>
                <option>Diploma</option>
              </select>
            )}

          </div>

          {/* 🔥 RANGES */}
          {ranges.map((r, i) => (
            <div key={i} className="grid grid-cols-5 gap-2">
              {["minMarks", "maxMarks", "minRank", "maxRank"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={r[field]}
                  onChange={(e) => handleRangeChange(i, e)}
                  placeholder={field}
                  className="input"
                />
              ))}

              <button type="button" onClick={() => removeRow(i)}>
                ❌
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addRow}
            className="bg-red-600 px-3 py-1 rounded"
          >
            + Add Range
          </button>

          <button className="w-full bg-red-600 py-2 rounded">
            {editId ? "Update Rule" : "Add Rule"}
          </button>
        </form>
      </div>

      {/* 🔥 FILTERS */}
      <div className="grid md:grid-cols-5 gap-2 mb-6">

        <select onChange={(e)=>setFilters({...filters, university:e.target.value})} className="input">
          <option value="">University</option>
          <option>AMU</option>
          <option>JMI</option>
        </select>

        <select onChange={(e)=>setFilters({...filters, className:e.target.value})} className="input">
          <option value="">Class</option>
          <option>6</option>
          <option>9</option>
          <option>11</option>
        </select>

        <select onChange={(e)=>setFilters({...filters, category:e.target.value})} className="input">
          <option value="">Category</option>
          <option>General</option>
          <option>OBC</option>
          <option>SC</option>
          <option>ST</option>
        </select>

        <select onChange={(e)=>setFilters({...filters, gender:e.target.value})} className="input">
          <option value="">Gender</option>
          <option>All</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select onChange={(e)=>setFilters({...filters, quota:e.target.value})} className="input">
          <option value="">Quota</option>
          <option>Internal</option>
          <option>External</option>
        </select>

      </div>

      {/* 🔥 RULE LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredRules.map((rule) => (
          <div key={rule._id} className="bg-[#1a1a1a] p-4 rounded">

            <h3 className="text-red-400">
              {rule.university} | Class {rule.className}
            </h3>

            <p className="text-sm text-gray-400">
              {rule.stream || "N/A"} | {rule.category} | {rule.gender} | {rule.quota}
            </p>

            {rule.ranges.map((r, i) => (
              <div key={i}>
                {r.minMarks}-{r.maxMarks} → {r.minRank}-{r.maxRank}
              </div>
            ))}

            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(rule)}>Edit</button>
              <button onClick={() => handleDelete(rule._id)}>Delete</button>
            </div>

          </div>
        ))}
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          background: #0f0f0f;
          border: 1px solid #2a2a2a;
          padding: 8px;
          border-radius: 6px;
        }
      `}</style>

    </div>
  );
}