import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        shortDescription: {
            type: String,
            required: true,
            maxlength: 150,
        },

        fullDescription: {
            type: String,
            required: true,
        },

        features: [
            {
                type: String,
            },
        ],

        image: {
            type: String,
            required: [true, "Project image is required"],
        },

        video: {
            type: String,
        },
        github: {
            type: String,
        },

        liveDemo: {
            type: String,
        },

        dashboard: {
            type: String,
        },

        tech: [
            {
                type: String,
                required: true,
            },
        ],

        stack: {
            type: String,
            required: true,
        },

        images: [
            {
                type: String,
            },
        ],

        order: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;