// models/AnswerKey.ts
import mongoose from "mongoose";

const answerKeySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["IMAGE", "OFFICIAL"],
      required: true,
    },

    university: String,
    className: String,
    stream: String,
    year: Number,

    totalQuestions: Number,

    // 🔥 IMAGE CLASSES ONLY
    disputedQuestions: Number,
    fileUrl: String,

    // 🔥 OFFICIAL ONLY
    releaseDate: Date,
    answerKeyLink: String,
  },
  { timestamps: true }
);

export default mongoose.models.AnswerKey ||
  mongoose.model("AnswerKey", answerKeySchema);