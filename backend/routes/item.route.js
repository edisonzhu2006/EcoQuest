const express =  require('express');
const Item = require('../models/item.model');
const router =  express.Router();
const {getItems} = require('../controllers/item.controller.js');
const {getItem} = require('../controllers/item.controller.js');
const {postItem} = require('../controllers/item.controller.js');
const {updateItem} = require('../controllers/item.controller.js');
const {deleteItem} = require('../controllers/item.controller.js');



router.get ('/', getItems);
router.get("/:id", getItem);
router.post('/', postItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;