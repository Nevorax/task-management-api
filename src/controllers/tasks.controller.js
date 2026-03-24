const taskService = require('../services/tasks.service');

const getTaskById = (req, res) => {
    const task = taskService.getTaskById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
};

const getTasks = (req, res) => {
    const tasks = taskService.getTasks();
    res.json(tasks);
}

const createTask = (req, res) => {
    try {
        const newTask = taskService.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTask = (req, res) => {
    const task = taskService.getTaskById(req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(taskService.updateTask(task, req.body));
}

const deleteTask = (req, res) => {
    const task = taskService.getTaskById(req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(taskService.deleteTask(req.params.id, task));
}

module.exports = {
    getTaskById,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};