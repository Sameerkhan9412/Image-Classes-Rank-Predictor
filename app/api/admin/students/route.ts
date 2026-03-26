import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";

// ✅ Define Query Type
type StudentQuery = {
  university?: string;
  className?: string;
  gender?: string;
  isCoachingStudent?: boolean;
  $or?: {
    name?: { $regex: string; $options: string };
    email?: { $regex: string; $options: string };
  }[];
};

// 📥 GET STUDENTS (with filters + pagination)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const university = searchParams.get("university");
    const className = searchParams.get("className");
    const gender = searchParams.get("gender");
    const coaching = searchParams.get("coaching");
    const search = searchParams.get("search");

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;

    const query: StudentQuery = {};

    if (university) query.university = university;
    if (className) query.className = className;
    if (gender) query.gender = gender;

    if (coaching !== null && coaching !== "") {
      query.isCoachingStudent = coaching === "true";
    }

    // 🔍 search by name/email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Student.countDocuments(query);

    const students = await Student.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      students,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (err: unknown) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}


// ➕ CREATE STUDENT
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const student = await Student.create(body);

    return NextResponse.json(student, { status: 201 });

  } catch (err: unknown) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}