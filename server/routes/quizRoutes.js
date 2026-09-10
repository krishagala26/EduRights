import express from "express";
import { getQuizByModule, submitQuiz } from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:moduleId", getQuizByModule);
router.post("/:id/submit", protect, submitQuiz);

export default router;
