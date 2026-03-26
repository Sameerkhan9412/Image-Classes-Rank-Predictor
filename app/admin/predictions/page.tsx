"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PredictionsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/prediction").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Predictions</h1>

      {data.map((p: any) => (
        <div key={p._id} className="bg-white p-3 mb-2 rounded shadow">
          <p>Marks: {p.marks}</p>
          <p>Rank: {p.predictedRankMin} - {p.predictedRankMax}</p>
        </div>
      ))}
    </div>
  );
}