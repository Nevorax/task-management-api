const taskService = require('../services/tasks.services');

// GET /tasks
const getTasks = (req, res) => {
  const tasks = taskService.getAllTasks();
  res.json(tasks);
};

// GET /tasks/:id
const getTaskById = (req, res, next) => {
  try {
    const task = taskService.getTaskById(req.params.id);

    if (!task) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// POST /tasks
const createTask = (req, res, next) => {
  try {
    const data = req.body || {};
    const newTask = taskService.createTask(data);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// PUT /tasks/:id
const updateTask = (req, res, next) => {
  try {
    const updated = taskService.updateTask(req.params.id, req.body || {});
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE /tasks/:id
const deleteTask = (req, res, next) => {
  try {
    taskService.deleteTask(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};