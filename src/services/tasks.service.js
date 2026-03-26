const prisma = require('../config/prisma');


const getTaskById = async (id) => {
    return prisma.task.findUnique({
        where: {
            id: Number(id)
        }
    });
};

const getTasks = async () => {
    const tasksDatabase = await prisma.task.findMany();
    return tasksDatabase;
};

const createTask = async (data) => {

    const taskDatabase = await prisma.task.create({
        data: {
            title: data.title,
            completed: false
        }
    });

    if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Task not found' });
    }

    return taskDatabase;
};

const  updateTask = async (id, data) => {
    if (data.title === undefined) throw new Error('Title is required');
    if (data.completed === undefined) throw new Error('state is required');


    return prisma.task.update({
        where: {
            id: Number(id),
        },
        data: {
            title: data.title,
            completed: data.completed
        }
    });
};

const deleteTask = async (id) => {

    await prisma.task.delete({
        where: {
            id: Number(id),
        }
    })
    return {message:`Task with ID ${Number(id)} has been deleted`};
};

module.exports = {
    getTaskById,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};