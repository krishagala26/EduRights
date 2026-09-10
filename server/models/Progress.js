import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    score: { type: Number, required: true },
    attemptedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    completed: { type: Boolean, default: false },
    bestScore: { type: Number, default: 0 },
    attempts: [attemptSchema],
  },
  { timestamps: true }
);

// A user should only have one progress record per module
progressSchema.index({ userId: 1, moduleId: 1 }, { unique: true });

export default mongoose.model("Progress", progressSchema);
