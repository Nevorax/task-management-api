const taskService = require('../services/tasks.service');

const getTaskById = async (req, res) => {
    const task = await taskService.getTaskById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
};

const getTasks = async (req, res) => {
    const tasks = await taskService.getTasks();
    res.json(tasks);
}

const createTask = async (req, res, next) => {
    try {
        if(req.body.title == null || req.body.title.length < 1) {
            return next(new Error('Title cannot be empty'));
        }
        const newTask = await taskService.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res) => {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(await taskService.updateTask(task, req.body));
}

const deleteTask = async (req, res) => {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(await taskService.deleteTask(req.params.id, task));
}

module.exports = {
    getTaskById,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};