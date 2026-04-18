import app from "../app";
import { connectDB } from "../db";

export default async function handler(req, res) {
    await connectDB();
    return app(req, res);
}