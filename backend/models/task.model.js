//Task model
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  id: String,
  title: String,
  type: String,
  completed: Boolean
});