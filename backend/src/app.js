const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Health check route
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Start server
app.listen(PORT, () => {
  console.log(`StudySync backend listening on http://localhost:${PORT}`);
});

module.exports = app;

 
