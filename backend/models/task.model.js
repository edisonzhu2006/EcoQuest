//Task model
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  type: String,
  completed: Boolean
});

const Task = mongoose.model("Task", TaskSchema);

// ✅ Export both the schema AND the model
module.exports = { TaskSchema, Task };