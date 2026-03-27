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

    stream: {
      type: String,
      default: "", // only for class 11
    },

    category: String,

    gender: {
      type: String,
      default: "All",
    },

    // 🔥 NEW FIELD
    quota: {
      type: String, // Internal / External
      default: "External",
    },

    ranges: [rangeSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Rule || mongoose.model("Rule", ruleSchema);