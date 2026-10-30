import express from "express";
import { trackVisitor, getStats, getVisitorEvents, trackEvent } from "../controllers/visitors.controler.js";

const router = express.Router();


router.post("/track", trackVisitor);
router.post("/event", trackEvent);
router.get("/stats", getStats);
router.get("/events/:visitorId", getVisitorEvents);

export default router;