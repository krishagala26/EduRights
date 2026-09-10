import express from "express";
import { getModules, getModuleById } from "../controllers/moduleController.js";

const router = express.Router();

router.get("/", getModules);
router.get("/:id", getModuleById);

export default router;
