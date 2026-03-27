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
  quota: string; // 🔥 NEW
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
    quota: "", // 🔥 NEW
    rollNo: "",
    isImageStudent: false,
    isPublicConsent: false,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);

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
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return setErrorMsg("Please fill all fields correctly");
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

    if (res.ok) setStep("otp");
    else setErrorMsg("Failed to send OTP");
  };

  // 🔐 VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!/^[0-9]{6}$/.test(otp)) {
      return setErrorMsg("Enter valid OTP");
    }

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
      return setErrorMsg(data.error);
    }

    await handlePredict();
  };

  const handleResendOtp = async () => {
    setLoading(true);

    await fetch("/api/email-otp/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: form.email }),
    });

    setLoading(false);
    setTimer(60);
    setCanResend(false);
  };

  // 🎯 PREDICT
  const handlePredict = async () => {
    const payload = {
      ...form,
      stream: form.className === "11" ? form.stream : "",
    };

    const res = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("kdks",data)

    setLoading(false);

    if (!res.ok) return setErrorMsg(data.error);

    setResult(data.data);
    setStep("result");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center p-4">
      <div className="bg-[#1a1a1a] p-6 rounded-xl w-full max-w-lg">

        <h1 className="text-center text-red-500 text-xl font-bold mb-4">
          Rank Predictor
        </h1>

        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

        {/* FORM */}
        {step === "form" && (
          <form onSubmit={handleSendOtp} className="space-y-3">

            <input name="name" placeholder="Name" className="input" onChange={handleChange}/>
            <input name="email" placeholder="Email" className="input" onChange={handleChange}/>
            <input name="mobile" placeholder="Mobile" className="input" onChange={handleChange}/>

            <select name="exam" onChange={handleChange} className="input">
              <option>AMU</option>
              <option>JMI</option>
            </select>

            <select name="className" onChange={handleChange} className="input">
              <option value="6">Class 6</option>
              <option value="9">Class 9</option>
              <option value="11">Class 11</option>
            </select>

            {form.className === "11" && (
              <select name="stream" onChange={handleChange} className="input">
                <option value="">Select Stream</option>
                <option>PCM</option>
                <option>PCB</option>
                <option>Diploma</option>
              </select>
            )}

            {/* 🔥 CATEGORY */}
            <select name="category" onChange={handleChange} className="input">
              <option value="">Select Category</option>
              <option>General</option>
              <option>OBC</option>
              <option>SC</option>
              <option>ST</option>
            </select>

            {/* 🔥 GENDER */}
            <select name="gender" onChange={handleChange} className="input">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            {/* 🔥 QUOTA */}
            <select name="quota" onChange={handleChange} className="input">
              <option value="">Select Type</option>
              <option>Internal</option>
              <option>External</option>
            </select>

            <input name="marks" type="number" placeholder="Marks" className="input" onChange={handleChange}/>
            <input name="rollNo" placeholder="Roll No" className="input" onChange={handleChange}/>

            <label>
              <input type="checkbox" name="isImageStudent" onChange={handleChange}/>
              Image student
            </label>

            <label>
              <input type="checkbox" name="isPublicConsent" onChange={handleChange}/>
              I agree to display my data
            </label>

            <button
              disabled={!isFormValid()}
              className="w-full bg-red-600 py-2 rounded"
            >
              Send OTP
            </button>

          </form>
        )}

        {/* OTP */}
        {step === "otp" && (
          <div className="text-center space-y-3">
            <input value={otp} onChange={(e)=>setOtp(e.target.value)} className="input"/>
            <button onClick={handleVerifyOtp}>Verify</button>

            {canResend ? (
              <button onClick={handleResendOtp}>Resend OTP</button>
            ) : (
              <p>{timer}s</p>
            )}
          </div>
        )}

        {/* RESULT */}
       {step === "result" && result && (
  <div className="text-center space-y-4">

    <h2 className="text-lg text-gray-400">
      Your Predicted Rank
    </h2>

    {/* 🔥 AVG RANK (MAIN) */}
    <p className="text-4xl font-bold text-red-500">
      {result.predictedRankAvg}
    </p>

    {/* RANGE */}
    <p className="text-gray-400 text-sm">
      Range: {result.predictedRankRange.min} - {result.predictedRankRange.max}
    </p>

    {/* 🔥 SMART MESSAGE */}
    <div className="mt-4 px-4 py-3 rounded-lg bg-[#0f0f0f] border border-[#2a2a2a] text-sm">

      {result.predictedRankAvg <= 100 ? (
        <p className="text-green-400 font-medium">
          🎉 Congratulations! You have a very strong chance of selection.  
          Keep it up — you're on the right track!
        </p>
      ) : result.predictedRankAvg <= 300 ? (
        <p className="text-yellow-400 font-medium">
          👍 You are in a good position. With a little more effort,  
          you can improve your chances significantly. Stay focused!
        </p>
      ) : (
        <p className="text-red-400 font-medium">
          💪 Don’t worry! Many students didn’t get selected in their first attempt,  
          but with consistent hard work and guidance, they succeeded next year.  
          Keep pushing — your time will come!
        </p>
      )}

    </div>

    {/* 🔁 CHECK AGAIN */}
    <button
      onClick={() => {
        setStep("form");
        setResult(null);
      }}
      className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
    >
      Check Again
    </button>

  </div>
)}

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