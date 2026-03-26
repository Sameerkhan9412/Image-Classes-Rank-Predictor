"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      await axios.post("/api/admin/login", form);
      router.push("/admin");
    } catch (err: any) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className=" p-6 rounded-xl shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          Admin Login
        </h2>

        <input
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}