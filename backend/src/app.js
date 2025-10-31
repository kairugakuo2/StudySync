import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;


//middleware
app.use(express.json());

// Health check route
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Start server
app.listen(PORT, () => {
  console.log(`StudySync backend listening on http://localhost:${PORT}`);
});

module.exports = app;

 
