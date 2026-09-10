import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    ageGroup: { type: String, enum: ["8-11", "12-16"], default: "8-11" },
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
