import CV from "../models/cv.model.js";

export const getCV = async (req, res) => {
    try {
        const cv = await CV.findOne().sort({ createdAt: -1 });

        if (!cv) {
            return res.status(404).json({ message: "CV not found" });
        }

        res.json(cv);
    } catch (err) {
        res.status(500).json({ message: "Error fetching CV" });
    }
};

