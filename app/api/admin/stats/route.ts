import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Prediction from "@/models/Prediction";
import Dataset from "@/models/Dataset";

export async function GET() {
  try {
    await connectDB();

    const users = await User.countDocuments();
    const predictions = await Prediction.countDocuments();
    const datasets = await Dataset.countDocuments();

    return NextResponse.json({
      users,
      predictions,
      datasets,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}