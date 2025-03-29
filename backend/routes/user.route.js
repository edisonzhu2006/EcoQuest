const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/user.controller.js");
const {updateWallet} = require("../controllers/user.controller.js");
const {updateInventory} = require("../controllers/user.controller.js");
const {updateTask} = require("../controllers/user.controller.js");
const {deleteTask} = require("../controllers/user.controller.js");

router.post("/signin", createUser);
router.post("/:userId/wallet", updateWallet);
router.post("/:userId/inventory", updateInventory);
router.post("/task", updateTask);
router.delete("/task/:userId/:taskId", deleteTask);

module.exports = router;
