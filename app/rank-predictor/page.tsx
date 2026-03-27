"use client";

import { useEffect, useState } from "react";

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
  quota: string;
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
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    mobile: "",
    exam: "AMU",
    className: "6",
    stream: "",
    marks: "",
    gender: "",
    category: "",
    quota: "",
    rollNo: "",
    isImageStudent: false,
    isPublicConsent: false,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);

  // 🔥 Clear error on interaction
  useEffect(() => {
    if (errorMsg) {
      const timeout = setTimeout(() => setErrorMsg(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [errorMsg]);

  // 🔥 VALIDATION
  const isFormValid = () => {
    if (!form.name || form.name.length < 3) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return false;

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(form.mobile)) return false;

    if (!form.marks || Number(form.marks) < 0 || Number(form.marks) > 100)
      return false;

    if (form.className === "11" && !form.stream) return false;

    if (!form.rollNo) return false;
    if (!form.category) return false;
    if (!form.gender) return false;
    if (!form.quota) return false;
    if (!form.isPublicConsent) return false;

    return true;
  };

  // ⏱ OTP TIMER
  useEffect(() => {
    if (step !== "otp") return;

    setTimer(60);
    setCanResend(false);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  // 🔄 CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Clear error on input change
    if (errorMsg) setErrorMsg("");

    const updated = {
      ...form,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    };

    if (name === "className" && value !== "11") {
      updated.stream = "";
    }

    setForm(updated);
  };

  // 📩 SEND OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return setErrorMsg("Please fill all fields correctly");
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/email-otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email }),
      });

      if (res.ok) {
        setStep("otp");
      } else {
        setErrorMsg("Failed to send OTP");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!/^[0-9]{6}$/.test(otp)) {
      return setErrorMsg("Enter valid 6-digit OTP");
    }

    setLoading(true);
    setErrorMsg("");

    try {
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
        return setErrorMsg(data.error || "Invalid OTP");
      }

      await handlePredict();
    } catch {
      setLoading(false);
      setErrorMsg("Network error. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      await fetch("/api/email-otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email }),
      });

      setTimer(60);
      setCanResend(false);
    } catch {
      setErrorMsg("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🎯 PREDICT
  const handlePredict = async () => {
    const payload = {
      ...form,
      stream: form.className === "11" ? form.stream : "",
    };

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setErrorMsg(data.error || "Prediction failed");
      }

      setResult(data.data);
      setStep("result");
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep("form");
    setResult(null);
    setOtp("");
    setErrorMsg("");
    setForm({
      name: "",
      email: "",
      mobile: "",
      exam: "AMU",
      className: "6",
      stream: "",
      marks: "",
      gender: "",
      category: "",
      quota: "",
      rollNo: "",
      isImageStudent: false,
      isPublicConsent: false,
    });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center p-4">
      <div className="bg-[#1a1a1a] p-6 rounded-xl w-full max-w-lg transition-all duration-500 animate-fadeIn relative">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-300">Processing...</p>
            </div>
          </div>
        )}

        <h1 className="text-center text-red-500 text-xl font-bold mb-4">
          🎯 Rank Predictor
        </h1>

        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center p-3 rounded-lg mb-4 animate-fadeIn">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* FORM */}
        {step === "form" && (
          <form onSubmit={handleSendOtp} className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name *</label>
              <input
                name="name"
                value={form.name}
                placeholder="Enter your name"
                className="input"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                placeholder="Enter your email"
                className="input"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Mobile *
              </label>
              <input
                name="mobile"
                type="tel"
                value={form.mobile}
                placeholder="10-digit mobile number"
                className="input"
                onChange={handleChange}
                maxLength={10}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Exam *
                </label>
                <select
                  name="exam"
                  value={form.exam}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="AMU">AMU</option>
                  <option value="JMI">JMI</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Class *
                </label>
                <select
                  name="className"
                  value={form.className}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="6">Class 6</option>
                  <option value="9">Class 9</option>
                  <option value="11">Class 11</option>
                </select>
              </div>
            </div>

            {form.className === "11" && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Stream *
                </label>
                <select
                  name="stream"
                  value={form.stream}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select Stream</option>
                  <option value="PCM">PCM</option>
                  <option value="PCB">PCB</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Quota Type *
              </label>
              <select
                name="quota"
                value={form.quota}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Type</option>
                <option value="Internal">Internal</option>
                <option value="External">External</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Marks (%) *
                </label>
                <input
                  name="marks"
                  type="number"
                  value={form.marks}
                  placeholder="0 - 100"
                  className="input"
                  onChange={handleChange}
                  min={0}
                  max={100}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Roll No *
                </label>
                <input
                  name="rollNo"
                  value={form.rollNo}
                  placeholder="Enter Roll No"
                  className="input"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Checkboxes with proper styling */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="isImageStudent"
                  checked={form.isImageStudent}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-2 border-gray-600 bg-transparent checked:bg-red-500 checked:border-red-500 cursor-pointer accent-red-500"
                />
                <span className="text-gray-300 text-sm group-hover:text-white transition">
                  I am an Image student
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="isPublicConsent"
                  checked={form.isPublicConsent}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-2 border-gray-600 bg-transparent checked:bg-red-500 checked:border-red-500 cursor-pointer accent-red-500"
                />
                <span className="text-gray-300 text-sm group-hover:text-white transition">
                  I agree to display my data publicly *
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isFormValid() || loading}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                !isFormValid() || loading
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 active:scale-[0.98]"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP →"}
            </button>
          </form>
        )}

        {/* OTP */}
        {step === "otp" && (
          <div className="text-center space-y-4 animate-fadeIn">
            <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
              <p className="text-green-400 text-sm">
                ✅ OTP sent to <strong>{form.email}</strong>
              </p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Enter 6-digit OTP
              </label>
              <input
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="• • • • • •"
                className="input text-center tracking-[0.5em] text-xl font-mono"
                maxLength={6}
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                loading || otp.length !== 6
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 active:scale-[0.98]"
              }`}
            >
              {loading ? "Verifying..." : "Verify & Show Rank ✓"}
            </button>

            <div className="flex items-center justify-center gap-4 pt-2">
              {canResend ? (
                <button
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-red-400 hover:text-red-300 hover:underline text-sm transition"
                >
                  🔄 Resend OTP
                </button>
              ) : (
                <p className="text-gray-500 text-sm">
                  Resend in <span className="text-white font-mono">{timer}s</span>
                </p>
              )}

              <span className="text-gray-600">|</span>

              <button
                onClick={() => {
                  setStep("form");
                  setOtp("");
                  setErrorMsg("");
                }}
                className="text-gray-400 hover:text-white text-sm transition"
              >
                ← Go Back
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && result && (
          <div className="text-center space-y-4 animate-fadeIn">
            <h2 className="text-lg text-gray-400">Your Predicted Rank</h2>

            {/* 🔥 AVG RANK (MAIN) */}
            <div className="py-4">
              <p className="text-5xl font-bold text-red-500 animate-pulse">
                #{result.predictedRankAvg}
              </p>
            </div>

            {/* RANGE */}
            <div className="bg-[#0f0f0f] px-4 py-3 rounded-lg inline-block">
              <p className="text-gray-400 text-sm">
                Expected Range:{" "}
                <span className="text-white font-medium">
                  {result.predictedRankRange.min} - {result.predictedRankRange.max}
                </span>
              </p>
            </div>

            {/* 🔥 SMART MESSAGE */}
            <div className="mt-4 px-4 py-4 rounded-lg bg-[#0f0f0f] border border-[#2a2a2a]">
              {result.predictedRankAvg <= 100 ? (
                <p className="text-green-400 font-medium">
                  🎉 Congratulations! You have a very strong chance of selection.
                  Keep it up — you're on the right track!
                </p>
              ) : result.predictedRankAvg <= 300 ? (
                <p className="text-yellow-400 font-medium">
                  👍 You are in a good position. With a little more effort, you
                  can improve your chances significantly. Stay focused!
                </p>
              ) : (
                <p className="text-red-400 font-medium">
                  💪 Don't worry! Many students didn't get selected in their
                  first attempt, but with consistent hard work and guidance, they
                  succeeded next year. Keep pushing — your time will come!
                </p>
              )}
            </div>

            {/* Student Info Summary */}
            <div className="text-left bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a] text-sm">
              <p className="text-gray-400 mb-2 font-medium">Your Details:</p>
              <div className="grid grid-cols-2 gap-2 text-gray-300">
                <p>📝 Name: {form.name}</p>
                <p>🎓 Class: {form.className}</p>
                <p>📊 Marks: {form.marks}%</p>
                <p>🏷️ Category: {form.category}</p>
              </div>
            </div>

            {/* 🔁 CHECK AGAIN */}
            <button
              onClick={handleReset}
              className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 active:scale-[0.98]"
            >
              🔄 Check Again
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          background: #0f0f0f;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          color: white;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .input::placeholder {
          color: #666;
        }

        .input:focus {
          outline: none;
          border-color: #ef4444;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
        }

        .input:hover:not(:focus) {
          border-color: #3a3a3a;
        }

        select.input {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 16px;
          padding-right: 36px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}