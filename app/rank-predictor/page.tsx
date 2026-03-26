"use client";

import { useState } from "react";

// ✅ Types
type Step = "form" | "otp" | "result";

type FormType = {
  name: string;
  email: string;
  mobile: string;
  exam: string;
  className: string;
  stream: string;
  marks: string;
  gender: string;
  category: string;
  rollNo: string;
  isImageStudent: boolean;
  isPublicConsent: boolean;
};

type ResultType = {
  predictedRankRange: {
    min: number;
    max: number;
  };
  predictedRankAvg: number;
};

export default function PredictPage() {
  const [step, setStep] = useState<Step>("form");
  const [otp, setOtp] = useState<string>("");

  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    mobile: "",
    exam: "AMU",
    className: "11",
    stream: "",
    marks: "",
    gender: "",
    category: "",
    rollNo: "",
    isImageStudent: false,
    isPublicConsent: false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ResultType | null>(null);

  // 🔄 Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const updated = {
      ...form,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    };

    if (name === "className" && value !== "11") {
      updated.stream = "";
    }

    setForm(updated);
  };

  // 📩 SEND OTP
  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email) {
      alert("Email is required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/email-otp/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: form.email }),
    });

    setLoading(false);

    if (res.ok) {
      setStep("otp");
    } else {
      alert("Failed to send OTP");
    }
  };

  // 🔐 VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");

    setLoading(true);

    const res = await fetch("/api/email-otp/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: form.email, otp }),
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      return alert(data.error);
    }

    await handlePredict();
  };

  // 🎯 PREDICT
  const handlePredict = async () => {
    const payload = {
      ...form,
      stream: form.className === "11" ? form.stream : "",
      gender: form.gender || "All",
      category: form.category || "General",
    };

    const res = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      alert(data.error);
    } else {
      setResult(data.data);
      setStep("result");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-xl w-full max-w-lg border border-[#2a2a2a]">

        <h1 className="text-2xl font-bold text-red-500 mb-4 text-center">
          Rank Predictor
        </h1>

        {/* 🟢 FORM */}
        {step === "form" && (
          <form onSubmit={handleSendOtp} className="space-y-3">

            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" required />
            <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" className="input" required />

            <select name="exam" value={form.exam} onChange={handleChange} className="input">
              <option value="AMU">AMU</option>
              <option value="JMI">JMI</option>
            </select>

            <select name="className" value={form.className} onChange={handleChange} className="input">
              <option value="6">Class 6</option>
              <option value="9">Class 9</option>
              <option value="11">Class 11</option>
            </select>

            {form.className === "11" && (
              <select name="stream" value={form.stream} onChange={handleChange} className="input" required>
                <option value="">Select Stream</option>
                <option value="PCM">PCM</option>
                <option value="PCB">PCB</option>
              </select>
            )}

            <input name="marks" value={form.marks} onChange={handleChange} type="number" placeholder="Marks" className="input" required />

            <select name="gender" value={form.gender} onChange={handleChange} className="input">
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select name="category" value={form.category} onChange={handleChange} className="input">
              <option value="">Category</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>

            <input name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="Roll No" className="input" required />

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isImageStudent" checked={form.isImageStudent} onChange={handleChange} />
              Already student of Image Classes
            </label>

            <label className="flex items-start gap-2 text-sm text-gray-300">
              <input type="checkbox" name="isPublicConsent" checked={form.isPublicConsent} onChange={handleChange} required />
              I agree to display my data publicly
            </label>

            <button
              type="submit"
              disabled={loading || !form.isPublicConsent}
              className="w-full bg-red-600 py-2 rounded"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

          </form>
        )}

        {/* 🟡 OTP */}
        {step === "otp" && (
          <div className="space-y-4 text-center">
            <p>Enter OTP sent to your email</p>

            <input
              value={otp}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOtp(e.target.value)
              }
              placeholder="Enter OTP"
              className="input"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 py-2 rounded"
            >
              {loading ? "Verifying..." : "Verify & Show Rank"}
            </button>
          </div>
        )}

        {/* 🔴 RESULT */}
        {step === "result" && result && (
          <div className="text-center space-y-4">
            <h2 className="text-xl text-green-400 font-bold">
              Your Predicted Rank
            </h2>

            <p className="text-3xl text-red-500 font-bold">
              {result.predictedRankRange.min} - {result.predictedRankRange.max}
            </p>

            <p className="text-gray-400">
              Avg Rank: {result.predictedRankAvg}
            </p>

            <button
              onClick={() => {
                setStep("form");
                setResult(null);
              }}
              className="bg-gray-700 px-4 py-2 rounded"
            >
              Check Again
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          background: #0f0f0f;
          border: 1px solid #2a2a2a;
          padding: 10px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}