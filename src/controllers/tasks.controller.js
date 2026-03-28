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
const createTask = async (req, res, next) => {
  try {
    const newTask = await taskService.createTask(
      req.body || {},
      req.user.id
    );

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// PUT /tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  if (!req.body || (req.body.title === undefined && req.body.completed === undefined)) {
    const error = new Error('At least one field (title or completed) is required');
    error.status = 400;
    throw error;
  }
  
  const updated = await taskService.updateTask(req.params.id, req.body);
  res.json(updated);
});

// DELETE /tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id);
  res.status(200).json({ message: 'Task deleted successfully' });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};