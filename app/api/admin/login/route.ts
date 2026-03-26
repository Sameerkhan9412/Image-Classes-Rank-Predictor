import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });

    // ✅ MUST CHECK
    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 401 }
      );
    }

    console.log("Entered password:", password);
    console.log("DB hash:", admin.password);

    const isMatch = await bcrypt.compare(password, admin.password);

    console.log("Match result:", isMatch);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_token", token, {
      httpOnly: true,
      path: "/",
    });

    return res;

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}