import Visitor from "../models/visitors.schema.js";

export const trackVisitor = async (req, res) => {
    try {
        const { visitorId } = req.body;
        if (!visitorId) return res.sendStatus(400);

        const country = req.headers["x-vercel-ip-country"] || null;
        const rawCity = req.headers["x-vercel-ip-city"];
        const city = rawCity ? decodeURIComponent(rawCity) : null;

        await Visitor.findOneAndUpdate(
            { visitorId },
            {
                $inc: { visits: 1 },
                $set: { lastSeen: new Date() },
                $setOnInsert: { country, city },
            },
            { upsert: true }
        );

        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const getStats = async (req, res) => {
    try {
        if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
            return res.sendStatus(401);
        }

        const total = await Visitor.countDocuments();
        const byCountry = await Visitor.aggregate([
            { $group: { _id: "$country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        res.json({ total, byCountry });
    } catch (err) {
        res.status(500).json({ message: "Error fetching stats" });
    }
};