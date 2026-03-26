import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    mobile: { type: String, required: true },

    isImageStudent: { type: Boolean, default: false },
    rollNo: String,

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);