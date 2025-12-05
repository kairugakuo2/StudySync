import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import tutorController from "./features/tutor-tab/tutorController.js";
const { addStudentLogic, listStudentsLogic, reset } = tutorController;

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;


//middleware
app.use(express.json());

//serve files from backend/public
app.use(express.static("backend/public"));

// Health check route
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Start server
app.listen(PORT, () => {
  console.log(`StudySync backend listening on http://localhost:${PORT}`);
});

//export default app;

app.get("/api/tutor-tab/students", (req, res) => {
  res.json(listStudentsLogic());
});

app.post("/api/tutor-tab/students", (req, res) => {
  const { name } = req.body;
  try {
    const student = addStudentLogic(name);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.post("/api/tutor-tab/reset", (req, res) => {
  try {
    reset(); // this calls tutorController.reset()
    res.status(200).json({ message: "All students cleared." });
  } catch (err) {
    res.status(500).json({ error: "Reset failed." });
  }
});