// Mongoose model for a To-Do task
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  // Task text - must be provided
  title: { type: String, required: true },
  // Whether the task is done - defaults to false for new tasks
  completed: { type: Boolean, default: false },
  // When the task was created - defaults to the current date/time
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
