"use client";

import { useEffect, useState } from "react";

export default function AdminRulesPage() {
  const [rules, setRules] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    university: "AMU",
    className: "11",
    stream: "PCM",
    category: "General",
    gender: "All",
  });

  const [ranges, setRanges] = useState([
    { minMarks: "", maxMarks: "", minRank: "", maxRank: "" },
  ]);

  const [filters, setFilters] = useState({
    university: "",
    className: "",
    category: "",
    gender: "",
    sort: "latest",
  });

  const fetchRules = async () => {
    const res = await fetch("/api/admin/rules");
    const data = await res.json();
    setRules(data);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId
      ? `/api/admin/rules/${editId}`
      : "/api/admin/rules";

    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, ranges }),
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
      stream: "PCM",
      category: "General",
      gender: "All",
    });
    setRanges([{ minMarks: "", maxMarks: "", minRank: "", maxRank: "" }]);
  };

  const handleEdit = (rule) => {
    setEditId(rule._id);
    setForm(rule);
    setRanges(rule.ranges);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/admin/rules/${id}`, { method: "DELETE" });
    fetchRules();
  };

  const addRow = () => {
    setRanges([...ranges, { minMarks: "", maxMarks: "", minRank: "", maxRank: "" }]);
  };

  const removeRow = (i) => {
    setRanges(ranges.filter((_, index) => index !== i));
  };

  const handleRangeChange = (i, e) => {
    const updated = [...ranges];
    updated[i][e.target.name] = e.target.value;
    setRanges(updated);
  };

  const filteredRules = rules
    .filter((rule) => {
      return (
        (!filters.university || rule.university === filters.university) &&
        (!filters.className || rule.className === filters.className) &&
        (!filters.category || rule.category === filters.category) &&
        (!filters.gender || rule.gender === filters.gender)
      );
    })
    .sort((a, b) =>
      filters.sort === "latest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 grid grid-cols-2 gap-6">

      {/* FORM */}
      <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-xl border border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-4 text-red-500">
          {editId ? "Edit Rule" : "Add Rule"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Inputs */}
          {["university", "className", "category", "gender"].map((field) => (
            <select
              key={field}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full bg-[#0f0f0f] border border-[#2a2a2a] p-2 rounded-lg"
            >
              {field === "university" && ["AMU", "JMI"].map(v => <option key={v}>{v}</option>)}
              {field === "className" && ["6","9","11"].map(v => <option key={v}>{v}</option>)}
              {field === "category" && ["General","OBC"].map(v => <option key={v}>{v}</option>)}
              {field === "gender" && ["All","Male","Female"].map(v => <option key={v}>{v}</option>)}
            </select>
          ))}

          {/* Stream */}
          {form.className === "11" && (
            <select
              value={form.stream}
              onChange={(e)=>setForm({...form, stream:e.target.value})}
              className="w-full bg-[#0f0f0f] border border-[#2a2a2a] p-2 rounded-lg"
            >
              <option>PCM</option>
              <option>PCB</option>
            </select>
          )}

          {/* Ranges */}
          {ranges.map((r, i) => (
            <div key={i} className="grid grid-cols-5 gap-2">
              {["minMarks","maxMarks","minRank","maxRank"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={r[field]}
                  onChange={(e)=>handleRangeChange(i,e)}
                  placeholder={field}
                  className="bg-[#0f0f0f] border border-[#2a2a2a] p-2 rounded"
                />
              ))}
              <button type="button" onClick={()=>removeRow(i)} className="text-red-500">
                ❌
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addRow}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            + Add Range
          </button>

          <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold">
            {editId ? "Update Rule" : "Add Rule"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-xl border border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-4 text-red-500">All Rules</h2>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {["university","className","category","gender"].map((f)=>(
            <select
              key={f}
              onChange={(e)=>setFilters({...filters, [f]:e.target.value})}
              className="bg-[#0f0f0f] border border-[#2a2a2a] p-2 rounded"
            >
              <option value="">All {f}</option>
              {f==="university" && ["AMU","JMI"].map(v=><option key={v}>{v}</option>)}
              {f==="className" && ["6","9","11"].map(v=><option key={v}>{v}</option>)}
              {f==="category" && ["General","OBC"].map(v=><option key={v}>{v}</option>)}
              {f==="gender" && ["All","Male","Female"].map(v=><option key={v}>{v}</option>)}
            </select>
          ))}
        </div>

        {/* Cards */}
        {filteredRules.map(rule => (
          <div key={rule._id} className="bg-[#0f0f0f] p-4 mb-3 rounded-lg border border-[#2a2a2a] hover:border-red-500 transition">

            <p className="font-semibold text-red-400">
              {rule.university} | {rule.className} | {rule.category}
            </p>

            {rule.ranges.map((r,i)=>(
              <div key={i} className="text-sm text-gray-300">
                {r.minMarks}-{r.maxMarks} → {r.minRank}-{r.maxRank}
              </div>
            ))}

            <div className="flex gap-2 mt-2">
              <button onClick={()=>handleEdit(rule)} className="bg-yellow-500 px-2 py-1 rounded text-black">
                Edit
              </button>
              <button onClick={()=>handleDelete(rule._id)} className="bg-red-600 px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}