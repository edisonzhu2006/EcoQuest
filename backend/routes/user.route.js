const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/user.controller.js");
const { getUser } = require("../controllers/user.controller.js");
const { getUsers } = require("../controllers/user.controller.js");
// const { checkUser } = require("../controllers/user.controller.js");
const {updateWallet} = require("../controllers/user.controller.js");
const {updateInventory} = require("../controllers/user.controller.js");
const {addTask} = require("../controllers/user.controller.js");
const {deleteTask} = require("../controllers/user.controller.js");

router.post("/signup", createUser);
// router.get("/login", checkUser);
router.get("/:id", getUser);
router.get("/", getUsers);
router.put("/:id/wallet", updateWallet);
router.put("/:id/inventory", updateInventory);
router.put("/:id/dailytasks", addTask);
router.delete("/:userId/tasks/:taskId", deleteTask);

module.exports = router;
