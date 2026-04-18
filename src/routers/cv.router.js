import express from "express";
import { getCV } from "../controllers/cv.controler.js";

const router = express.Router();

router.get("/", getCV);


export default router;