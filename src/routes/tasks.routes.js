const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/tasks.controller');

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', authMiddleware, createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;