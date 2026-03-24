let tasks = [];
let idCounter = 1;

const getTaskById = (id) => {
    return tasks.find(t => t.id == id);
};
const getTasks = () => {
    return tasks;
}

const createTask = (data) => {
    if (!data) {
        throw new Error('Task not found');
    }
    const taskObject = {
        id: idCounter,
        title: data.title,
        completed: false,
    }
    idCounter++;
    tasks.push(taskObject);
    return taskObject;
}

const updateTask = (task, data) => {
    if (data.title !== undefined) task.title = data.title;
    if (data.completed !== undefined) task.completed = data.completed;

    return task;
};

const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id == id);

    if (index === -1) return null;

    tasks.splice(index, 1);
    return "Task "+ id +" deleted successfully";
};
module.exports = {
    getTaskById,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};