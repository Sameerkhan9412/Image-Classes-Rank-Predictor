import mongoose, { Schema, models } from "mongoose";

const PredictionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    exam: String,
    class: String,
    stream: String,

    marks: Number,

    predictedRankMin: Number,
    predictedRankMax: Number,

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Prediction ||
  mongoose.model("Prediction", PredictionSchema);