// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ItemRoute = require("./routes/item.route.js");
const UserRoute = require("./routes/user.route.js");
const dailyRoutes = require("./routes/dailytask.route");
const weeklyRoutes = require("./routes/weeklytask.route");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON

// MongoDB connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is undefined");
    }
    await mongoose.connect(uri);
    console.log(" MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
};

// Connect to DB
connectDB();

//routes
app.use("/api/items", ItemRoute);
app.use("/api/users", UserRoute);
app.use("/api/dailytasks", dailyRoutes);
app.use("/api/weeklytasks", weeklyRoutes);
app.get("/api/test-users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Example route
app.get("/", (req, res) => {
  res.send("🚀 EcoQuest API is working!");
});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

