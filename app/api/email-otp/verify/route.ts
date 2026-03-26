import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otpStore";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const isValid = verifyOtp(email, otp);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}