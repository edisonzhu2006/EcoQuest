const mongoose = require('mongoose');
// User model
const UserSchema = mongoose.Schema(
    {
        name: { 
            type: String, 
            required: [true , "Please enter product name" ],
            default: "Sample name", 
        },
        coins: { 
            type: Number, 
            required: true, 
            default: 0,
        },
        inventory: [ItemSchema],
        tasks: [TaskSchema],
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
