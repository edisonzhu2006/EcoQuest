const express = require("express");
const router = express.Router();
const {createTask} = require("../controllers/weeklytask.controller.js");
const {updateTask} = require("../controllers/weeklytask.controller.js");
const {getTask} = require("../controllers/weeklytask.controller.js");
const {deleteTask} = require("../controllers/weeklytask.controller.js");
const {getTasks} = require("../controllers/weeklytask.controller.js");


router.post("/", createTask);
router.put("/:id", updateTask);
router.get("/:id", getTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);

module.exports = router;
