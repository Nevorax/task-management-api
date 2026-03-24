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

const createTask = (req, res, next) => {
    try {
        if(req.body.title == null || req.body.title.length < 1) {
            const error =  next(new Error('Tasks cannot have empty title'));
            res.status(400).json("Tasks cannot have empty title");

        }
        const newTask = taskService.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
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