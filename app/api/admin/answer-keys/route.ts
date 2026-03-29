import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import AnswerKey from "@/models/AnswerKey";
import path from "path";
import fs from "fs"

// ➕ CREATE
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "File required" },
        { status: 400 }
      );
    }

    // 🔥 SAVE FILE
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + "-" + file.name;

    const filePath = path.join(
      process.cwd(),
      "public/uploads/answer-keys",
      fileName
    );

    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/answer-keys/${fileName}`;

    // 🔥 GET FIELDS
    const data = {
      type: formData.get("type"),
      university: formData.get("university"),
      className: formData.get("className"),
      stream: formData.get("stream"),
      year: Number(formData.get("year")), // ✅ convert
      totalQuestions: Number(formData.get("totalQuestions")),
      disputedQuestions: Number(formData.get("disputedQuestions")),
      releaseDate: formData.get("releaseDate"),
      fileUrl,
    };

    const saved = await AnswerKey.create(data);

    return NextResponse.json(saved);

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

// 📥 GET
export async function GET() {
  await connectDB();

  const data = await AnswerKey.find().sort({ createdAt: -1 });

  return NextResponse.json(data);
}