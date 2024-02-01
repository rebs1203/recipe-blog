const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the name of your recipe']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
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