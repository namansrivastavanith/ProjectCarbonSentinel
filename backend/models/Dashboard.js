const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  carbonSaved: {
    type: Number,
    required: true,
    default: 0
  },
  treesPlanted: {
    type: Number,
    required: true,
    default: 0
  },
  activeProjects: {
    type: [String], // An array of strings
    default: []
  },
  // Mongoose automatically adds a timestamp
}, { timestamps: true });

const Dashboard = mongoose.model('Dashboard', DashboardSchema);

module.exports = Dashboard;