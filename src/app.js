const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

const taskRoutes = require('./routes/tasks.routes');

app.use('/tasks', taskRoutes);

module.exports = app;