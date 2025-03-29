const mongoose = require('mongoose');
const { ItemSchema } = require('./item.model'); // Import ItemSchema
const { TaskSchema } = require('./task.model'); // Import TaskSchema

// User model
const UserSchema = mongoose.Schema(
    {
        username: { 
            type: String, 
            required: [true, "Please enter product name"],
            default: "Sample name", 
        },
        
        email: { 
            type: String, 
            required: [true, "Please enter an email address"],
            unique: true, // Ensure no duplicate emails
        },
        
        password: { 
            type: String, 
            required: [true, "Please enter a password"],
        },

        coins: { 
            type: Number, 
            required: true, 
            default: 0,
        },

        inventory: [UserItemSchema], // Embed ItemSchema
        tasks: [TaskSchema], // Embed TaskSchema
        imageUrl: { 
            type: String, 
            required: true, 
            default: "/images/sample.jpg",
        }, 
    },

    {
        timestamps: true,
    }
);

const UserItemSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    quantity: Number
  });

const bcrypt = require('bcrypt');

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Skip if password is not modified
    }

    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', UserSchema); // Export User model