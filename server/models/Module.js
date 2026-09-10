import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ageGroup: { type: String, enum: ["8-11", "12-16", "all"], default: "all" },
    content: { type: String, required: true }, // story/lesson body
    order: { type: Number, default: 0 },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  },
  { timestamps: true }
);

export default mongoose.model("Module", moduleSchema);
