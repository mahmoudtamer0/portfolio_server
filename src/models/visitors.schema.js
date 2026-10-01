import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
    {
        visitorId: { type: String, required: true, unique: true },
        country: String,
        city: String,
        referrer: String,
        source: String,
        language: String,
        screen: String,
        userAgent: String,
        visits: { type: Number, default: 1 },
        lastSeen: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;