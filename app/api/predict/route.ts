import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Rule from "@/models/Rule";
import User from "@/models/User";
import Prediction from "@/models/Prediction";
import Student from "@/models/Student";
import { isVerified, clearVerified } from "@/lib/otpStore";

// ✅ Body Type
type PredictBody = {
  name: string;
  email: string;
  mobile: string;
  exam: string;
  className: string | number;
  stream?: string;
  marks: number | string;
  isImageStudent?: boolean;
  rollNo?: string;
  gender?: string;
  category?: string;
  isPublicConsent?: boolean;
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: PredictBody = await req.json();

    let {
      name,
      email,
      mobile,
      exam,
      className,
      stream,
      marks,
      isImageStudent,
      rollNo,
      gender,
      category,
      isPublicConsent,
    } = body;

    // ✅ Normalize
    email = email?.trim().toLowerCase();
    exam = exam?.toUpperCase();
    stream = stream?.toUpperCase();
    className = className?.toString();

    // ✅ Validation
    if (!name || !mobile || !exam || !className || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const parsedMarks = Number(marks);

    if (isNaN(parsedMarks) || parsedMarks < 0) {
      return NextResponse.json(
        { error: "Invalid marks value" },
        { status: 400 }
      );
    }

    // 🔥 OTP check
    if (!isVerified(email)) {
      return NextResponse.json(
        { error: "OTP verification required" },
        { status: 403 }
      );
    }

    clearVerified(email);

    // 🔥 Step 1: Rule Matching
    let rule = await Rule.findOne({
      university: exam,
      className,
      ...(className === "11" && stream ? { stream } : {}),
      ...(category && { category }),
      ...(gender && { gender }),
    }).lean();

    // fallback 1 → gender = All
    if (!rule) {
      rule = await Rule.findOne({
        university: exam,
        className,
        ...(className === "11" && stream ? { stream } : {}),
        ...(category && { category }),
        gender: "All",
      }).lean();
    }

    // fallback 2 → ignore category + gender
    if (!rule) {
      rule = await Rule.findOne({
        university: exam,
        className,
        ...(className === "11" && stream ? { stream } : {}),
      }).lean();
    }

    if (!rule || !rule.ranges?.length) {
      return NextResponse.json(
        { error: "Rule not found" },
        { status: 404 }
      );
    }

    // 🔥 Step 2: Find matching range
    const matchedRange = rule.ranges.find(
      (r: any) =>
        parsedMarks >= r.minMarks && parsedMarks <= r.maxMarks
    );

    if (!matchedRange) {
      return NextResponse.json(
        { error: "No matching range found" },
        { status: 404 }
      );
    }

    // 🔥 Step 3: Rank calculation (safe divide)
    const denominator =
      matchedRange.maxMarks - matchedRange.minMarks;

    const rank =
      denominator === 0
        ? matchedRange.minRank
        : matchedRange.minRank +
          ((parsedMarks - matchedRange.minMarks) / denominator) *
            (matchedRange.maxRank - matchedRange.minRank);

    // 👤 Step 4: User
    let user = await User.findOne({ mobile });

    if (!user) {
      user = await User.create({
        name,
        mobile,
        email,
        isImageStudent,
        rollNo,
      });
    } else {
      user.name = name;
      user.email = email;
      user.isImageStudent = isImageStudent;
      user.rollNo = rollNo;
      await user.save();
    }

    // 📈 Step 5: Prediction
    const prediction = await Prediction.create({
      userId: user._id,
      exam,
      class: className,
      stream,
      marks: parsedMarks,
      predictedRankMin: matchedRange.minRank,
      predictedRankMax: matchedRange.maxRank,
    });

    // 🧠 Step 6: Student
    await Student.findOneAndUpdate(
      { mobile },
      {
        name,
        email,
        mobile,
        university: exam,
        className,
        stream,
        category,
        gender,
        rollNumber: rollNo,
        isCoachingStudent: isImageStudent,
        marks: parsedMarks,
        predictedRank: Math.round(rank),
        isPublicConsent,
        lastPredictionId: prediction._id,
      },
      { upsert: true, new: true, runValidators: true }
    );

    // 🎯 Response
    return NextResponse.json({
      success: true,
      data: {
        name,
        marks: parsedMarks,
        predictedRankRange: {
          min: matchedRange.minRank,
          max: matchedRange.maxRank,
        },
        predictedRankAvg: Math.round(rank),
      },
    });

  } catch (error: unknown) {
    console.error("Predict API Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}