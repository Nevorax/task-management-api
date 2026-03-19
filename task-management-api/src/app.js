const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

module.exports = app;

const taskRoutes = require('./routes/tasks.routes');

app.use('/tasks', taskRoutes);