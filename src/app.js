const express = require('express');

const app = express();

const errorMiddleware = require('./middlewares/error.middleware');

app.use(errorMiddleware);
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API funcionando 🚀');
});

const taskRoutes = require('./routes/tasks.routes');
const userRoutes = require('./routes/users.routes');

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

module.exports = app;