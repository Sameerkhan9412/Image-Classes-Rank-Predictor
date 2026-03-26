import mongoose, { Schema, models } from "mongoose";

const DataPointSchema = new Schema({
  marks: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const DatasetSchema = new Schema(
  {
    exam: { type: String, required: true },      // AMU / JMI
    class: { type: String, required: true },     // 6 / 9 / 11
    stream: { type: String, required: true },    // PCM / Commerce etc

    data: [DataPointSchema], // marks vs rank array

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Dataset || mongoose.model("Dataset", DatasetSchema);