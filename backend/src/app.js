import express from "express";
import { updateWorkspaceTask } from "./features/shared-workspace-dashboard/sharedWorkspaceController.js";

const app = express();
const PORT = process.env.PORT || 3000;


//middleware
app.use(express.json());

// Health check route
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Shared Workspace Dashboard routes
app.put('/shared-workspace-dashboard/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const taskData = req.body;
  
  const result = updateWorkspaceTask(taskId, taskData);
  
  if (result.message && result.message.includes("Error")) {
    return res.status(400).json(result);
  }
  
  res.json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`StudySync backend listening on http://localhost:${PORT}`);
});

module.exports = app;

 
