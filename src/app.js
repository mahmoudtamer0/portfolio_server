import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import projectsRoutes from "./routers/project.router.js";
import visitorsRoutes from "./routers/visitors.router.js";

const app = express();
app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectsRoutes);
app.use("/api/visitors", visitorsRoutes);


export default app;