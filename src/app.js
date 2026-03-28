const express = require('express');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

const taskRoutes = require('./routes/tasks.routes');
const userRoutes = require('./routes/users.routes');

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// Middleware global de errores
app.use(errorHandler);

module.exports = app;