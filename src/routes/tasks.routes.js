const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const taskController = require('../controllers/tasks.controller');

router.get('/', taskController.getTasks);
router.post('/', authMiddleware, taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;