let tasks = [];
let idCounter = 1;

const getAllTasks = () => {
  return tasks;
};

const getTaskById = (id) => {
  return tasks.find(t => t.id == id);
};

const createTask = (data = {}) => {
  const safeTitle = String(data.title || '').trim();

  if (!safeTitle) {
    const error = new Error('Title is required');
    error.status = 400;
    throw error;
  }

  const newTask = {
    id: idCounter++,
    title: safeTitle,
    completed: false
  };

  tasks.push(newTask);

  return newTask;
};

const updateTask = (id, data = {}) => {
  const task = tasks.find(t => t.id == id);

  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }

  const { title, completed } = data;

  if (title !== undefined) {
    const safeTitle = String(title).trim();
    if (!safeTitle) {
      const error = new Error('Title cannot be empty');
      error.status = 400;
      throw error;
    }
    task.title = safeTitle;
  }
  if (completed !== undefined) task.completed = completed;

  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex(t => t.id == id);

  if (index === -1) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }

  tasks.splice(index, 1);

  return true;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};