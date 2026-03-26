import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Rule from "@/models/Rule";

// ✅ Define Range Type
type Range = {
  minMarks: number;
  maxMarks: number;
};

// ➕ CREATE
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: { ranges: Range[] } = await req.json();

    const { ranges } = body;

    if (!ranges || !Array.isArray(ranges)) {
      return NextResponse.json(
        { error: "Ranges are required" },
        { status: 400 }
      );
    }

    // 🔥 Overlap validation
    const sorted = [...ranges].sort(
      (a, b) => a.minMarks - b.minMarks
    );

    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].minMarks < sorted[i - 1].maxMarks) {
        return NextResponse.json(
          { error: "Ranges overlapping!" },
          { status: 400 }
        );
      }
    }

    const rule = await Rule.create(body);

    return NextResponse.json(rule);
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

// 📥 GET ALL
export async function GET() {
  await connectDB();

  const rules = await Rule.find().sort({ createdAt: -1 });

  return NextResponse.json(rules);
}