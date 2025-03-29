const User = require('../models/user.model');
const Item = require('../models/item.model');
const Task = require('../models/task.model');

const createUser  = async (req,res ) => {
    try {
        const item = await Item.create(req.body);
        res.status(200).json(item);
    }
    catch (error) {
        res.status(500).json({error: error.message });
    }
}   

const updateWallet  = async (req,res) => {
    try { 
        const { id } = req.params; // Extract user ID from the request parameters
        const { coins } = req.body; // Extract the coins value from the request body
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //Find user and update wallet
        const user = await User.findById(id);
        user.coins += coins;
        await user.save();
        res.status(200).json({message: "wallet updated"});
    }

    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const updateInventory = async (req, res) => {
    const { userId, itemId } = req.body;
  
    try {
      const user = await User.findById(userId);
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

const updateTask = async (req, res) => {
    const { userId, taskId } = req.params;
    const { title, type, completed } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      const task = user.tasks.find(task => task.id === taskId);
      if (!task) return res.status(404).json({ error: "Task not found" });
  
      if (title !== undefined) task.title = title;
      if (type !== undefined) task.type = type;
      if (completed !== undefined) task.completed = completed;
  
      await user.save();
  
      res.status(200).json({ message: "Task updated", task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const deleteTask = async (req, res) => {
    const { userId, taskId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      const taskIndex = user.tasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });
  
      user.tasks.splice(taskIndex, 1); // remove task from array
      await user.save();
  
      res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = 
    {updateWallet, 
    updateInventory,
    updateTask, 
    deleteTask}; // Export the functions for use in routes
