# Task-Tracker
## Task Controller.js:
```js
let tasks = [];
let currentId = 1;

// Create Task
const createTask = (req, res) => {
    const { name, completed = false } = req.body;
    const newTask = { id: currentId++, name, completed };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

// Get All Tasks
const getAllTasks = (req, res) => {
    res.json(tasks);
};

// Get Task by ID
const getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

// Update Task
const updateTask = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        const { name, completed } = req.body;
        task.name = name !== undefined ? name : task.name;
        task.completed = completed !== undefined ? completed : task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

// Delete Task
const deleteTask = (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
```

## Task Router:
```js
const express = require('express');
const router = express.Router();
const taskController = require('../controller/Taskcontroller');

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
```

### Task Server
```js
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/Taskroutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Handle root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Task API');
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});
```
## Output:
### GET
![get](https://github.com/Jovita08/Task-Tracker/assets/94174503/1b037e70-a01c-4996-a3ad-bdade994518d)
### POST
![post](https://github.com/Jovita08/Task-Tracker/assets/94174503/06fccaef-7ea8-42bd-b2ea-d181a127c470)
### UPDATE
![update](https://github.com/Jovita08/Task-Tracker/assets/94174503/19ab7a96-b2ad-4766-b8cd-c59313698e5a)
### DELETE
![del](https://github.com/Jovita08/Task-Tracker/assets/94174503/9a47090c-ce2c-4b24-81b3-736ae33037fe)
