h1 align="center">🌌 N O V A — AI Growth & Monetization Assistant</h1>

<p align="center">
  <b>The personal AI ecosystem built by <a href="#">Subham Biswas</a></b> <br>
  💼 Productivity • 🎓 Learning • 📈 Finance • 🤖 AI Insight • 💰 Earning
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-4.x-blue?logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/OpenAI-API-black?logo=openai" alt="OpenAI" />
  <img src="https://img.shields.io/badge/Status-Live-brightgreen" alt="Live" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT" />
</p>

---

## 🚀 Overview

**Nova** is a multi-module AI system designed to **learn, guide, and grow with you.**
It acts as your **daily growth engine**, combining **AI intelligence, finance tracking, learning tools, and productivity insights** — all in one ecosystem.

Backend: **Node.js + Express + OpenAI API (via OpenRouter optional)**  
Frontend: *(in progress — Glide / Notion / Custom Web)*  

---

## 🧠 Core Backend Features

| Module | Description |
|:--------|:-------------|
| 🧩 `/api/chat` | AI interaction endpoint (OpenAI / DeepSeek / Gemini ready) |
| 🧭 `/api/health` | System status check |
| 🔒 Security Layer | CORS, Helmet, Rate Limiter |
| ⚙️ Modular Design | Scalable structure for future learning, finance, and analytics modules |
| 🧠 Model Support | gpt-4o-mini / gpt-4-turbo / openrouter |

---

## 📁 Folder Structure

```bash
nova-backend/
│
├── server.js          # Main Express server
├── package.json       # Dependencies and scripts
├── .env               # API keys (not in repo)
├── .gitignore         # Ignore sensitive files
└── README.md          # Project documentation


---

⚙️ Setup Guide

🔧 1️⃣ Clone the repo

git clone https://github.com/your-username/nova-backend.git
cd nova-backend

📦 2️⃣ Install dependencies

npm install

🔑 3️⃣ Create .env

OPENAI_API_KEY=your_api_key_here
PORT=5000

🧩 4️⃣ Run locally

node server.js


---

🌐 API Usage

🧠 Chat Endpoint

POST /api/chat

Request

{
  "message": "Hello Nova!"
}

Response

{
  "reply": "Hey Subham! Nova here, your AI growth partner."
}


---

🛡️ Tech Stack

Node.js — Runtime

Express.js — Backend Framework

dotenv — Environment config

CORS — API security

Helmet — HTTP header protection

node-fetch — External API calls



---

🧩 Future Modules

Module	Codebase	Description

🎓 AskMe AI Tutor	learning.js	Explains any topic in English or Bengali
💰 InvestMate	finance.js	Tracks stocks & expenses
📘 Growth Journal	journal.js	Logs daily progress & emotion trends
🪞 Insight Engine	ai-insight.js	Auto-analyzes your growth data



---

🧭 Vision Statement

> “Nova isn’t just a chatbot —
it’s a digital version of your discipline, learning, and purpose.
A system that grows with you, reflects your habits,
and helps you earn from what you learn.”



— Subham Biswas


---

🧑‍💻 Author

Subham Biswas
📍 India
🌐 Anonymous Developer | Visionary Builder
