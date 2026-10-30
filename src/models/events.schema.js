import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        visitorId: { type: String, required: true, index: true },
        type: { type: String, required: true },
        meta: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model("Event", eventSchema);