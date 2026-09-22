import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import users from "./data/users.js";
import questions from "./questions/questions.json" with { type: "json" };
import seedrandom from "seedrandom";

const app = express();

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// -------------------- SHUFFLE --------------------

function seededShuffle(array, seed) {
  let result = [...array];
  let random = seedrandom(seed);

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

// -------------------- LOGIN --------------------

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({
      error: "Invalid credentials",
    });
  }

  res.json({
    token: user.id,
  });
});

// -------------------- EXAM --------------------

app.post("/exam/start", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      error: "Missing authorization",
    });
  }

  const userId = token.replace("Bearer ", "");

  // Create a new seed for this exam session
  const sessionSeed = `${userId}-${Date.now()}-${Math.random()}`;

  const shuffled = seededShuffle(questions, sessionSeed);

  res.json({
    questions: shuffled,
  });
});

// -------------------- SUBMIT EXAM --------------------

app.post("/exam/submit", (req, res) => {
  const token = req.headers.authorization;
  const { answers } = req.body;

  if (!token) {
    return res.status(401).json({
      error: "Missing authorization",
    });
  }

  if (!answers) {
    return res.status(400).json({
      error: "Missing answers",
    });
  }

  const userId = token.replace("Bearer ", "");

  const results = [];

  for (const question of questions) {
    const userAnswer = answers[question.id];
    const correctAnswer = question.options[question.answer];

    results.push({
      questionId: question.id,
      userAnswer: userAnswer,
      correctAnswer: correctAnswer,
      isCorrect: userAnswer === correctAnswer,
    });
  }

  // -------------------- SAVE RESULTS --------------------

  const filePath = path.join(__dirname, "submissions", "results.json");

  const existingResults = JSON.parse(fs.readFileSync(filePath, "utf8"));

  existingResults.push({
    userId: userId,
    results: results,
    submittedAt: new Date().toISOString(),
  });

  fs.writeFileSync(filePath, JSON.stringify(existingResults, null, 2));

  // -------------------- SEND RESPONSE --------------------

  res.json({
    message: "Exam submitted successfully",
    userId: userId,
    results: results,
  });
});

// -------------------- START SERVER --------------------

app.listen(3000, () => {
  console.log("Server is running ");
});
