const express = require('express');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

const taskRoutes = require('./routes/tasks.routes');

app.use('/tasks', taskRoutes);

// Middleware global de errores
app.use(errorHandler);

module.exports = app;