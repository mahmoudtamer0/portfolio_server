import Visitor from "../models/visitors.schema.js";

export const trackVisitor = async (req, res) => {
    try {
        const { visitorId } = req.body;
        if (!visitorId) return res.sendStatus(400);

        const ua = req.headers["user-agent"] || "";
        if (/bot|crawl|spider|headless|preview|scanner|lighthouse|curl|python|node-fetch/i.test(ua)) {
            return res.sendStatus(204);
        }

        const country = req.headers["x-vercel-ip-country"] || null;
        const rawCity = req.headers["x-vercel-ip-city"];
        const city = rawCity ? decodeURIComponent(rawCity) : null;

        await Visitor.findOneAndUpdate(
            { visitorId },
            {
                $inc: { visits: 1 },
                $set: { lastSeen: new Date() },
                $setOnInsert: { country, city, userAgent: ua },
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
        // if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
        //     return res.sendStatus(401);
        // }

        const days = Number(req.query.days) || 0;
        const filter = days
            ? { lastSeen: { $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) } }
            : {};

        const visitors = await Visitor.find(filter)
            .select("country city visits createdAt lastSeen -_id")
            .sort({ lastSeen: -1 });

        res.json({ total: visitors.length, visitors });
    } catch (err) {
        res.status(500).json({ message: "Error fetching stats" });
    }
};