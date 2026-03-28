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
        const newTask = await taskService.createTask(
            req.body,
            req.user.id
        );

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

    res.status(200).json(await taskService.updateTask(task.id, req.body));
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