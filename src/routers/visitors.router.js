import express from "express";
import { trackVisitor, getStats } from "../controllers/visitors.controler.js";

const router = express.Router();

router.post("/track", trackVisitor);
router.get("/stats", getStats);

export default router;