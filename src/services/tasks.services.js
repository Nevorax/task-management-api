const prisma = require('../config/prisma');

const getAllTasks = async () => {
  return await prisma.task.findMany();
};

const getTaskById = async (id) => {
  return await prisma.task.findUnique({
    where: { id: Number(id) }
  });
};

const createTask = async (data) => {
  if (!data.title) {
    throw new Error('Title is required');
  }

  return await prisma.task.create({
    data: {
      title: data.title,
      completed: false
    }
  });
};

const updateTask = async (id, data) => {
  return await prisma.task.update({
    where: { id: Number(id) },
    data
  });
};

const deleteTask = async (id) => {
  return await prisma.task.delete({
    where: { id: Number(id) }
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};