const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  getTask,
  getTasks,
  deleteTask
} = require("../controllers/task.controller");

const { WeeklyTask } = require("../models/task.model");

router.post("/", createTask(WeeklyTask));
router.get("/", getTasks(WeeklyTask));
router.get("/:id", getTask(WeeklyTask));
router.put("/:id", updateTask(WeeklyTask));
router.delete("/:id", deleteTask(WeeklyTask));

module.exports = router;
