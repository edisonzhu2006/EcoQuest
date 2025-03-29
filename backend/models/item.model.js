// models/Item.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true , "Please enter item name" ],
    default: "Sample name", 
} ,
  cost: Number,
  description: String,
  type: String,
  imageUrl: { 
    type: String, 
    required: true, 
    default: "/images/sample.jpg",
  },
});

const item = mongoose.model("Item", ItemSchema);
module.exports = item;
