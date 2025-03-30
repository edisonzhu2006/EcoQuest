const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  type: String,
  completed: Boolean
});

// Create separate models backed by different collections
const WeeklyTask = mongoose.model("WeeklyTask", TaskSchema);

module.exports = {
  WeeklyTask,
  TaskSchema
};