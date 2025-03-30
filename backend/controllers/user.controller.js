const User = require('../models/user.model');
const Item = require('../models/item.model');
const mongoose = require('mongoose');
const { DailyTask }= require('../models/task.model');
const bcrypt = require("bcrypt");


const createUser = async (req, res) => {
    try {
        const { username, email, password, coins, imageUrl } = req.body; // Extract user details from the request body

        // Create a new user
        const user = await User.create({
            username,
            email,
            password,
            coins: coins, // Default to 0 if coins are not provided
            imageUrl: imageUrl, // Default image URL
        });

        // Respond with the created user
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        // Handle errors (e.g., validation errors, duplicate email)
        res.status(500).json({ error: error.message });
    }
};

const getUserId =  async (req, res) => {
    try{
      const { username } = req.params;
      const user = await User.findOne({username: username});

      if (!user) return res.status(404).json({ error: "User not found" });
      res.status(200).json(user._id);
    }
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getUser = async (req, res) => {
    try {
      const {id} =  req.params;
      console.log(id);
      // Validate the ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }

      const user = await User.findById(id);
      
  
      if (!user) {
      return res.status(404).send('item not found');
      }
      
      res.status(200).json(user);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    }
    
    catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

const updateWallet  = async (req,res) => {
    try { 
        const { id } = req.params; // Extract user ID from the request parameters
        const { coins } = req.body; // Extract the coins value from the request body
        
        //Find user and update wallet
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        user.coins += coins;
        await user.save();
        res.status(200).json({message: "wallet updated"});
    }

    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const updateInventory = async (req, res) => {
    try {
      const { id } = req.params;
      const { itemId } = req.body;
  
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      const item = await Item.findById(itemId);
      if (!item) return res.status(404).json({ error: "Item not found" });
  
      // Check if item already exists in inventory
      const inventoryItem = user.inventory.find(entry => entry.item.toString() === itemId);
  
      if (inventoryItem) {
        // Increase quantity
        inventoryItem.quantity += 1;
      } else {
        // Add new item to inventory
        user.inventory.push({ item: itemId, quantity: 1 });
      }
  
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const addTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, type, completed } = req.body;
  
      const user = await User.findById( id );
      if (!user) return res.status(404).json({ error: "User not found" });
  
      user.dailytasks.push({ title, type, completed });
      await user.save();
  
      res.status(200).json({ message: "Task added", dailyTasks: user.dailyTasks });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const deleteTask = async (req, res) => {
    const { userId, taskId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      if (!user.dailytasks) {
        return res.status(400).json({ error: "User has no tasks" });
      }
  
      const taskIndex = user.dailytasks.findIndex(task => task.id === taskId);
  
      if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      user.dailytasks.splice(taskIndex, 1);
      await user.save();
  
      res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = 
    {createUser,
    getUser,
    getUsers,
    getUserId,
    updateInventory,
    updateWallet,
    addTask, 
    deleteTask}; // Export the functions for use in routes
