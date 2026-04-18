import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "My CV",
        },

        fileUrl: {
            type: String,
            required: true,
        },

        publicId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const CV = mongoose.model("CV", cvSchema);

export default CV;