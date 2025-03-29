// models/Item.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true , "Please enter product name" ],
    default: "Sample name", 
} ,
  cost: Number,
  description: String,
  type: String
});

const item = mongoose.model("Item", ItemSchema);
module.exports = item;
