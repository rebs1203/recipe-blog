const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
    recipeName: {
        type: String,
        required: [true, 'Please provide the name of your recipe']
    },
    createdBy: {
        type: String,
        ref: 'User',
    },
    cuisineType: {
        type: String,
        enum: ['Italian', 'Japanese', 'Chinese', 'Indian', 'American', 'Other'],
        required: [true, 'Please select the cuisine type']
    },
    estTimeOfPrep: {
        type: String,
        required: [true, 'Please provide the estimate time of preparation for your recipe']
    },
    ingredients: {
        type: String,
        required: [true, "Please provide your recipe's ingredients"]
    },
    prepInstructions: {
        type: String, 
        required: [true, 'Please provide instructions for the preparation of your recipe']
    }
})

module.exports = mongoose.model('Recipe', RecipeSchema)