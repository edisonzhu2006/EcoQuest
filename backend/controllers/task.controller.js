const mongoose = require("mongoose");

const createTask = (TaskModel) => async (req, res) => {
  try {
    const { title, type, completed } = req.body;
    const task = await TaskModel.create({ title, type, completed });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = (TaskModel) => async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }

    const task = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasks = (TaskModel) => async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTask = (TaskModel) => async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);

    if (!task) return res.status(404).send("Task not found");

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = (TaskModel) => async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }

    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  updateTask,
  getTask,
  getTasks,
  deleteTask
};