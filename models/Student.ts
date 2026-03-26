import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile:String,
    university: String,
    className: String,
    stream: String,
    category: String,
    gender: String,
    rollNumber: String,

    isCoachingStudent: Boolean,

    marks: Number,
    predictedRank: Number,
    isPublicConsent:Boolean
  },
  { timestamps: true }
);

export default mongoose.models.Student || mongoose.model("Student", studentSchema);