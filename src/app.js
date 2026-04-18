import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import projectsRoutes from "./routers/project.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectsRoutes);


export default app;