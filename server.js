// === NOVA BACKEND : SELF-HEALING MODE ===
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import fetch from "node-fetch";

dotenv.config();
const app = express();

// ─────────────────────────────────────────────
// MIDDLEWARES
// ─────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(helmet());

// Rate-limiter (safe default)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: "Too many requests, please wait a bit." },
});
app.use(limiter);

// ─────────────────────────────────────────────
// HEALTH & DEBUG ROUTES
// ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("✅ Nova backend is online. Use /api/chat for POST requests.");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/checkenv", (req, res) => {
  const apiKeyLoaded = !!process.env.OPENAI_API_KEY;
  res.json({
    apiKeyLoaded,
    port: process.env.PORT,
    envMode: process.env.NODE_ENV || "development",
  });
});

// ─────────────────────────────────────────────
// MAIN CHAT ENDPOINT
// ─────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "API key missing in environment" });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      console.error("🔴 OpenAI API Error:", data);
      return res
        .status(openaiRes.status)
        .json({ error: data.error?.message || "OpenAI error" });
    }

    const reply = data.choices?.[0]?.message?.content || "No reply from model";
    res.json({ reply });
  } catch (err) {
    console.error("🔴 Server Error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// ─────────────────────────────────────────────
// GLOBAL FAIL-SAFE HANDLERS
// ─────────────────────────────────────────────
process.on("uncaughtException", (err) => {
  console.error("⚠️ Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("⚠️ Unhandled Rejection:", reason);
});

// ─────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Nova backend running on port ${PORT}`);
});
