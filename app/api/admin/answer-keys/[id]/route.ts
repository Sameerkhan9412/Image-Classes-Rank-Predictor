// ➕ CREATE
import { connectDB } from "@/lib/db";
import AnswerKey from "@/models/AnswerKey";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    // 🔥 Save file
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

    // 🔥 Save other fields
    const data = {
      type: formData.get("type"),
      university: formData.get("university"),
      className: formData.get("className"),
      stream: formData.get("stream"),
      year: formData.get("year"),
      totalQuestions: formData.get("totalQuestions"),
      disputedQuestions: formData.get("disputedQuestions"),
      releaseDate: formData.get("releaseDate"),
      fileUrl, // 🔥 important
    };

    const saved = await AnswerKey.create(data);

    return NextResponse.json(saved);
  } catch (err: any) {
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