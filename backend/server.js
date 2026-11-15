
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "SUPREME BRAIN AI",
    status: "online",
    message: "Welcome to your own AI backend!"
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy"
  });
});

app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({
      success: false,
      error: "Please enter a message."
    });
  }

  res.json({
    success: true,
    ai: "SUPREME BRAIN AI",
    message: "Your message received successfully!",
    received: message
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SUPREME BRAIN AI running on port ${PORT}`);
});
