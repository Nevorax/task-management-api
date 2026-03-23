const express = require('express');
const router = express.Router();

let tasks = [];
let idCounter = 1;

router.get('/', (req, res) => {
    res.json(tasks);
});

router.get('/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
});

router.put('/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    const { title, completed } = req.body;

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
});
router.post('/', (req, res) => {
    const { title } = req.body;

    const newTask = {
        id: idCounter++,
        title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

router.delete('/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(index, 1);

    res.json({ message: 'Task deleted' });
});
module.exports = router;