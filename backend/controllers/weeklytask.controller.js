const {Task} = require('../models/task.model.js');
const mongoose = require('mongoose');

const createTask = async (req, res) => {
    try {
        const {title, type, completed} = req.body; // Extract user details from the request body
        const task = await Task.create({
            title,
            type,
            completed
        } 
        );
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid task ID format' });
        }

        // Find the task by ID and update it
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Return the updated task
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks from the database
        res.status(200).json(tasks); // Send the tasks as a JSON response
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle any errors that occur during the process
    }
}

const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        
        const task = await Task.findById(id);
        
    
        if (!task) {
            return res.status(404).send('Task not found');
        }
    
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid task ID format' });
        }

        // Find the task by ID and delete it
        const task = await Task.findByIdAndDelete(id);

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Return a success message
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createTask,
    updateTask,
    getTask,
    getTasks,
    deleteTask,
}