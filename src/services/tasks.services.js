let tasks = [];
let idCounter = 1;

const getAllTasks = () => {
  return tasks;
};

const getTaskById = (id) => {
  return tasks.find(t => t.id == id);
};

const createTask = (title) => {
  const safeTitle = String(title).trim();

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

  if (!task) return null;

  const { title, completed } = data;

  if (title !== undefined) task.title = String(title).trim();
  if (completed !== undefined) task.completed = completed;

  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex(t => t.id == id);

  if (index === -1) return false;

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