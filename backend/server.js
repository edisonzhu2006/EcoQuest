const express = require('express');
const mongoose = require('mongoose');
const connectDB = require("./config/db");
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON

// Example route
app.get('/', (req, res) => {
  res.send('API is working');
});


const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is undefined");
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

require("dotenv").config();

connectDB();

app.use(express.json());

// routes here...

// ✅ Use Render's assigned port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


module.exports = connectDB;
