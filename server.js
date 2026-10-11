// Entry point: Express server + MongoDB connection
require('dotenv').config(); // load variables from .env into process.env

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests only from the React app's address (not every origin)
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' }));

// Parse JSON request bodies
app.use(express.json());

// All task endpoints live under /api/tasks
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB (connection string comes from .env), then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
