const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/user.controller.js");
const {updateWallet} = require("../controllers/user.controller.js");
const {updateInventory} = require("../controllers/user.controller.js");
const {updateTask} = require("../controllers/user.controller.js");
const {deleteTask} = require("../controllers/user.controller.js");

router.post("/signup", createUser);
router.get("/login", checkUser);
router.put("/:userId/wallet", updateWallet);
router.put("/:userId/inventory", updateInventory);
router.put("/task", updateTask);
router.delete("/task/:userId/:taskId", deleteTask);

module.exports = router;
