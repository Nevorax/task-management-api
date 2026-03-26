const taskService = require('../services/tasks.services');
const asyncHandler = require('../middleware/asyncHandler');

// GET /tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
});

// GET /tasks/:id
const getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);

  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }

  res.json(task);
});

// POST /tasks
const createTask = asyncHandler(async (req, res) => {
  const data = req.body || {};
  const newTask = await taskService.createTask(data);
  res.status(201).json(newTask);
});

// PUT /tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  const updated = await taskService.updateTask(req.params.id, req.body || {});
  res.json(updated);
});

// DELETE /tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};