"use client";

import { useEffect, useState } from "react";

export default function RuleList() {
  const [rules, setRules] = useState([]);

  const fetchRules = async () => {
    const res = await fetch("/api/admin/rules");
    const data = await res.json();
    setRules(data);
  };

  const deleteRule = async (id) => {
    await fetch(`/api/admin/rules/${id}`, { method: "DELETE" });
    fetchRules();
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Rules</h1>

      {rules.map((rule) => (
        <div key={rule._id} className="bg-white p-4 mb-4 shadow rounded">

          <p>
            {rule.university} | Class {rule.className} | {rule.category} | {rule.gender}
          </p>

          <div className="mt-2">
            {rule.ranges.map((r, i) => (
              <div key={i}>
                {r.minMarks}-{r.maxMarks} → {r.minRank}-{r.maxRank}
              </div>
            ))}
          </div>

          <button
            onClick={() => deleteRule(rule._id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}