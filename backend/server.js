import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "SUPREME BRAIN AI",
    status: "online",
    message: "Welcome to your own AI backend!",
  });
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] }),
      }
    );
    const data = await r.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.error?.message ||
      "No reply";
    res.json({ reply });
  } catch (e) {
    res.status(500).json({ reply: "Server error" });
  }
});

app.listen(process.env.PORT || 3000);
