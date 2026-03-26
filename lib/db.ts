import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI in .env");
}

// global cache (for Next.js hot reload fix)
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using existing DB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Connecting to MongoDB...");

    cached.promise = mongoose.connect(MONGO_URI, {
      // ⚡ IMPORTANT: dbName removed (will use from URI → imageclasses)
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}