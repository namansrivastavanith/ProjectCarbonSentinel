require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Dashboard = require('./models/Dashboard'); // Import the model

const app = express();
const PORT = 3001;

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---

// GET: Fetch the latest dashboard data
app.get('/api/dashboard', async (req, res) => {
  try {
    // Find the newest document in the collection and send it
    const latestData = await Dashboard.findOne().sort({ createdAt: -1 });
    res.json(latestData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new dashboard data entry
app.post('/api/dashboard', async (req, res) => {
  const dashboardEntry = new Dashboard({
    carbonSaved: req.body.carbonSaved,
    treesPlanted: req.body.treesPlanted,
    activeProjects: req.body.activeProjects
  });

  try {
    const newData = await dashboardEntry.save();
    res.status(201).json(newData); // 201 means "Created"
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 means "Bad Request"
  }
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});