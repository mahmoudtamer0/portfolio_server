import Visitor from "../models/visitors.schema.js";

const clean = (v, max = 200) =>
    typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

const getHost = (url) => {
    try {
        return new URL(url).hostname.replace(/^www\./, "");
    } catch {
        return null;
    }
};

export const trackVisitor = async (req, res) => {
    try {
        const { visitorId, referrer, source, language, screen } = req.body;
        if (!visitorId || typeof visitorId !== "string") return res.sendStatus(400);

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
                $setOnInsert: {
                    country,
                    city,
                    userAgent: ua.slice(0, 300),
                    referrer: getHost(referrer),
                    source: clean(source, 50),
                    language: clean(language, 20),
                    screen: clean(screen, 20),
                },
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
            .select("country city visits createdAt lastSeen referrer source language screen userAgent -_id")
            .sort({ lastSeen: -1 });

        res.json({ total: visitors.length, visitors });
    } catch (err) {
        res.status(500).json({ message: "Error fetching stats" });
    }
};