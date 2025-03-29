    const Item = require('../models/item.model');
    const mongoose = require('mongoose');


    const postItem  = async (req,res ) => {
        try {
            const item = await Item.create(req.body);
            res.status(200).json(item);
        }
        catch (error) {
            res.status(500).json({  error: error.message });
        }
    }   

    const updateItem  = async (req,res) => {
        try {
            const { id } = req.params; // Extract the ID from the request parameters
    
            // Validate the ID format
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid item ID format' });
            }
    
            // Find the item by ID and update it
            const item = await Item.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
            // Check if the item exists
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
    
            // Return the updated item
            res.status(200).json({ message: 'Item updated successfully', item });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    const getItems = async (req,res ) => {

        try {
            const items = await Item.find();
            res.status(200).json(items);
        }

        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    const getItem  = async (req,res) => {
        try {
            const {id} =  req.params;
            
            const item = await Item.findById(id);
            
        
            if (!item) {
            return res.status(404).send('item not found');
            }
            
            res.status(200).json(item);
        
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }   

    const deleteItem  = async (req,res ) => {
        try {
            const{id} = req.params;
        
            const item = await Item.findByIdAndDelete(id);
        
            if (!item) {
            return res.status(404).send('item not found');
            }
        
            res.status(200).json({message: "item deleted"});
        }
        
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }   


    module.exports = {
        getItems,
        getItem,
        postItem,
        updateItem,
        deleteItem
    };