// REST API routes for tasks. Mounted at /api/tasks in server.js
const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');

const router = express.Router();

// Reject malformed ids (e.g. /api/tasks/abc) with 400 before hitting the DB
router.param('id', (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }
  next();
});

// GET /api/tasks - fetch all tasks (oldest first)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
});

// POST /api/tasks - add a new task
router.post('/', async (req, res) => {
  try {
    // Convert to string and trim; "?? ''" stops a missing title becoming "undefined"
    const title = String(req.body.title ?? '').trim();
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const task = await Task.create({ title });
    res.status(201).json(task); // 201 Created
  } catch (err) {
    res.status(500).json({ message: 'Server error while creating task' });
  }
});

// PUT /api/tasks/:id - mark complete/incomplete and/or edit the title
router.put('/:id', async (req, res) => {
  try {
    const updates = {};

    if (req.body.title !== undefined) {
      const title = String(req.body.title).trim();
      if (!title) {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
      updates.title = title;
    }

    if (req.body.completed !== undefined) {
      updates.completed = Boolean(req.body.completed);
    }

    // { new: true } returns the updated document instead of the old one
    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating task' });
  }
});

// DELETE /api/tasks/:id - delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted', id: task._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error while deleting task' });
  }
});

module.exports = router;
