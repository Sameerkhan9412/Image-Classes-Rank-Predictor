"use client";

import { useState } from "react";
import axios from "axios";

export default function Step1Basic({ form, setForm, next }: any) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    await axios.post("/api/email-otp/send", {
      email: form.email,
    });

    setOtpSent(true);
  };

  const verify = async () => {
    await axios.post("/api/email-otp/verify", {
      email: form.email,
      otp,
    });

    alert("Verified ✅");
    next();
  };

  return (
    <>
      <input
        placeholder="Name"
        className="w-full border p-2 mb-3 rounded"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        className="w-full border p-2 mb-3 rounded"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      {!otpSent ? (
        <button onClick={sendOtp} className="w-full bg-primary text-white py-2 rounded">
          Send OTP
        </button>
      ) : (
        <>
          <input
            placeholder="Enter OTP"
            className="w-full border p-2 mt-3 rounded"
            onChange={(e) => setOtp(e.target.value)}
          />

          <button onClick={verify} className="w-full bg-green-600 text-white py-2 mt-3 rounded">
            Verify OTP
          </button>
        </>
      )}
    </>
  );
}