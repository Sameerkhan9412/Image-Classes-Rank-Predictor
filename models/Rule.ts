import mongoose from "mongoose";

const rangeSchema = new mongoose.Schema({
  minMarks: Number,
  maxMarks: Number,
  minRank: Number,
  maxRank: Number,
});

const ruleSchema = new mongoose.Schema(
  {
    university: String,
    className: String,
    stream: String,
    category: String,
    gender: { type: String, default: "All" },

    ranges: [rangeSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Rule || mongoose.model("Rule", ruleSchema);