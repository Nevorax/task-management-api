const taskService = require('../services/tasks.services');

// GET /tasks
const getTasks = (req, res) => {
  const tasks = taskService.getAllTasks();
  res.json(tasks);
};

// GET /tasks/:id
const getTaskById = (req, res) => {
  const task = taskService.getTaskById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
};

// POST /tasks
const createTask = (req, res) => {
  const { title } = req.body || {};

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTask = taskService.createTask(title);

  res.status(201).json(newTask);
};

// PUT /tasks/:id
const updateTask = (req, res) => {
  const updated = taskService.updateTask(req.params.id, req.body || {});

  if (!updated) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(updated);
};

// DELETE /tasks/:id
const deleteTask = (req, res) => {
  const deleted = taskService.deleteTask(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json({ message: 'Task deleted' });
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};