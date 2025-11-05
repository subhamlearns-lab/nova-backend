import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // change to "gpt-4-turbo" or other if needed
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API Error:", data);
      return res.status(response.status).json({
        error: data.error?.message || "OpenAI API error",
      });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    res.json({ reply: reply || "No response from model" });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

export default router;
