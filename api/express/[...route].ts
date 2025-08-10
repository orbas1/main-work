import express, { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { reverseGeocode } from "../../lib/services/geolocation";

const app = express();
app.use(express.json());

app.get("/testimonials", async (_req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: "Failed to load testimonials" });
  }
});

// Placeholder chat endpoints to avoid 404s during development
app.get("/chats", (_req: Request, res: Response) => {
  res.json([{ id: 1 }]);
});

app.get("/chats/:id/messages", (_req: Request, res: Response) => {
  res.json([]);
});

app.post("/chats", (_req: Request, res: Response) => {
  res.status(201).json({ id: Date.now() });
});

app.post("/chats/:id/messages", (req: Request, res: Response) => {
  const { content } = req.body;
  res.status(201).json({
    id: Date.now(),
    senderId: 0,
    content,
    createdAt: new Date().toISOString(),
  });
});

app.post("/messages/ai", (req: Request, res: Response) => {
  const { prompt } = req.body;
  res.json({ message: `AI response to: ${prompt}` });
});

app.get("/location", async (req: Request, res: Response) => {
  const lat = parseFloat(req.query.lat as string);
  const lon = parseFloat(req.query.lon as string);
  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return res.status(400).json({ error: "Invalid coordinates" });
  }
  try {
    const location = await reverseGeocode(lat, lon);
    res.json({ location });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch location" });
  }
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
