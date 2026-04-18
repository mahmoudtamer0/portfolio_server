import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DB_URL;
const env = process.env.NODE_ENV


if (env == "development") {

    mongoose
        .connect(MONGO_URI, {
            maxPoolSize: 3,
        })
        .then(() => {
            console.log("MongoDB connected");

            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        })
        .catch((err) => {
            console.error("DB connection error:", err);
        });
}