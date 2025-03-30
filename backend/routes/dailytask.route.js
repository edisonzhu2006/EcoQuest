const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  getTask,
  getTasks,
  deleteTask
} = require("../controllers/task.controller");

const { DailyTask } = require("../models/task.model");

router.post("/", createTask(DailyTask));
router.get("/", getTasks(DailyTask));
router.get("/:id", getTask(DailyTask));
router.put("/:id", updateTask(DailyTask));
router.delete("/:id", deleteTask(DailyTask));

module.exports = router;