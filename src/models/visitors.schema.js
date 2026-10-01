import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
    {
        visitorId: {
            type: String,
            required: true,
            unique: true,
        },
        country: String,
        city: String,
        visits: {
            type: Number,
            default: 1,
        },
        userAgent: String,
        lastSeen: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;