// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Root check
app.get("/", (req, res) => {
  res.send("✅ Nova backend is running fine!");
});

// Quick debug route (you can delete later)
app.get("/checkenv", (req, res) => {
  res.json({
    apiKeyLoaded: !!OPENROUTER_API_KEY,
  });
});

// Main chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });

    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "API key missing in environment" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return res.status(response.status).json({ error: data.error?.message || "OpenRouter API error" });
    }

    res.json({ reply: data.choices?.[0]?.message?.content || "No reply from model" });
  } catch (err) {
    console.error("Server crash:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server ready on port ${PORT}`));
