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