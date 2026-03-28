const prisma = require('../config/prisma');

const getAllTasks = async () => {
  try {
    return await prisma.task.findMany();
  } catch (error) {
    const err = new Error('Error retrieving tasks');
    err.status = 500;
    throw err;
  }
};

const getTaskById = async (id) => {
  try {
    return await prisma.task.findUnique({
      where: { id: Number(id) }
    });
  } catch (error) {
    const err = new Error('Error retrieving task');
    err.status = 500;
    throw err;
  }
};

const createTask = async (data, userId) => {
  if (!data.title) {
    const err = new Error('Title is required');
    err.status = 400;
    throw err;
  }

  if (!Number.isInteger(userId) || userId <= 0) {
    const err = new Error('UserId is required and must be a positive integer');
    err.status = 400;
    throw err;
  }

  try {
    return await prisma.task.create({
      data: {
        title: data.title,
        completed: false,
        userId: userId
      }
    });
  } catch (error) {
    const err = new Error('Error creating task');
    err.status = 500;
    throw err;
  }
};

const updateTask = async (id, data) => {
  try {
    return await prisma.task.update({
      where: { id: Number(id) },
      data
    });
  } catch (error) {
    // P2025: Prisma error for record not found
    if (error.code === 'P2025') {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }
    const err = new Error('Error updating task');
    err.status = 500;
    throw err;
  }
};

const deleteTask = async (id) => {
  try {
    return await prisma.task.delete({
      where: { id: Number(id) }
    });
  } catch (error) {
    // P2025: Prisma error for record not found
    if (error.code === 'P2025') {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }
    const err = new Error('Error deleting task');
    err.status = 500;
    throw err;
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};