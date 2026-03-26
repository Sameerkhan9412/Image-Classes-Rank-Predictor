import { NextResponse } from "next/server";
import { sendOTPEmail } from "@/lib/mail";
import { saveOtp } from "@/lib/otpStore";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendOTPEmail(email, otp);
    saveOtp(email, otp);

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}