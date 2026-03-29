"use client";

import { useEffect, useState } from "react";

export default function AnswerKeyAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // 📥 FETCH
  const fetchData = async () => {
    const res = await fetch("/api/admin/answer-keys");
    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔄 CHANGE
  const handleChange = (e: any) => {
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
    if (!file) return false;

    return true;
  };

  // 🚀 SUBMIT
  const handleSubmit = async () => {
    if (!isValid()) {
      return alert("Fill all fields properly");
    }

    setLoading(true);

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    if (file) formData.append("file", file);

    const res = await fetch("/api/admin/answer-keys", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) return alert("Upload failed");

    alert("Uploaded successfully ✅");

    setFile(null);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">

      <h1 className="text-2xl text-red-500 mb-6">
        Answer Keys Admin
      </h1>

      {/* 🔥 FORM */}
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a] space-y-3">

        {/* TYPE */}
        <select name="type" onChange={handleChange} className="input">
          <option value="IMAGE">Image Classes</option>
          <option value="OFFICIAL">Official</option>
        </select>

        {/* UNIVERSITY */}
        <select name="university" onChange={handleChange} className="input">
          <option>AMU</option>
          <option>JMI</option>
        </select>

        {/* CLASS */}
        <select name="className" onChange={handleChange} className="input">
          <option value="6">Class 6</option>
          <option value="9">Class 9</option>
          <option value="11">Class 11</option>
        </select>

        {/* STREAM */}
        {form.className === "11" && (
          <select name="stream" onChange={handleChange} className="input">
            <option value="">Stream</option>
            <option>PCM</option>
            <option>PCB</option>
            <option>Diploma</option>
          </select>
        )}

        {/* YEAR */}
        <input
          name="year"
          placeholder="Year (2026)"
          className="input"
          onChange={handleChange}
        />

        {/* TOTAL QUESTIONS */}
        <input
          name="totalQuestions"
          placeholder="Total Questions"
          className="input"
          onChange={handleChange}
        />

        {/* IMAGE ONLY */}
        {form.type === "IMAGE" && (
          <input
            name="disputedQuestions"
            placeholder="Disputed Questions"
            className="input"
            onChange={handleChange}
          />
        )}

        {/* OFFICIAL ONLY */}
        {form.type === "OFFICIAL" && (
          <input
            type="date"
            name="releaseDate"
            className="input"
            onChange={handleChange}
          />
        )}

        {/* FILE */}
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="input"
        />

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={!isValid() || loading}
          className={`w-full py-2 rounded ${
            loading
              ? "bg-gray-600"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload Answer Key"}
        </button>

      </div>

      {/* 🔥 LIST */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">

        {data.map((item: any) => (
          <div
            key={item._id}
            className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]"
          >

            <h3 className="text-red-400">
              {item.university} | Class {item.className}
            </h3>

            <p className="text-sm text-gray-400">
              {item.stream || "N/A"} | {item.year}
            </p>

            <p>Total Q: {item.totalQuestions}</p>

            {item.type === "IMAGE" && (
              <p>Disputed: {item.disputedQuestions}</p>
            )}

            {item.type === "OFFICIAL" && (
              <p>
                Release:{" "}
                {new Date(item.releaseDate).toDateString()}
              </p>
            )}

            {/* DOWNLOAD */}
            <a
              href={item.fileUrl}
              target="_blank"
              className="text-blue-400 underline mt-2 block"
            >
              Download PDF
            </a>

          </div>
        ))}

      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          background: #0f0f0f;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
        }
      `}</style>

    </div>
  );
}