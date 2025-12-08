import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { updateWorkspaceTask } from "./features/shared-workspace-dashboard/sharedWorkspaceController.js";

// Import Tutor Tab controller logic
import * as tutorController from "./features/tutor-tab/tutorController.js";
const { addStudentLogic, listStudentsLogic, reset } = tutorController;

const app = express();
const PORT = process.env.PORT || 3000;

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../public")));

/* ================================
   Health Check
================================ */
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

/* ================================
    Shared Workspace Dashboard
================================ */
app.put("/shared-workspace-dashboard/tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const taskData = req.body;

  const result = updateWorkspaceTask(taskId, taskData);

  if (result.message && result.message.includes("Error")) {
    return res.status(400).json(result);
  }

  res.json(result);
});

/* ================================
           Tutor Tab API
================================ */

// GET all students
app.get("/api/tutor-tab/students", (req, res) => {
  res.json(listStudentsLogic());
});

// POST add a new student
app.post("/api/tutor-tab/students", (req, res) => {
  try {
    const student = addStudentLogic(req.body?.name);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST reset all Tutor Tab data (students, sessions, notes)
app.post("/api/tutor-tab/reset", (req, res) => {
  reset();
  res.json({ message: "Tutor Tab data reset successfully." });
});

/* ================================
        Start Server
================================ */

app.listen(PORT, () => {
  console.log(`StudySync backend listening on http://localhost:${PORT}`);
});

// ❗ IMPORTANT: Remove CommonJS export — not compatible with ESM
// module.exports = app;  ← DELETE THIS
