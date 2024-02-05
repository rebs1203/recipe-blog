const Recipe = require('../models/Recipe.js')

const getUserRecipes = async (req, res) => {
    try {
        const userRecipes = await Recipe.find({createdBy:req.user.userId})
        res.json({userRecipes})
    } catch (error) {
        res.status(500)
        console.log(error)
        req.flash('error', 'Internal Server Error')
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const allRecipes = await Recipe.find()
        res.json({allRecipes})
    } catch (error) {
        res.status(500)
        console.log(error)
        req.flash('error', 'Internal Server Error')
    }
}


const createRecipe = async (req, res) => {
    try {
        await Recipe.create(req.body)
        req.flash('info', 'Your recipe was successfully created.')
    } catch (error) {
        res.status(500)
        req.flash('error', 'Internal Server Error.')
    }
}

const editRecipe = async (req, res) => {
    const id = req.params._id

    const existingRecipe = Recipe.findById(id)

    const updatedData = { $set: {
        name: req.body.recipeName || existingRecipe.recipeName,
        cuisineType: req.body.cuisineType || existingRecipe.cuisineType,
        estTimeOfPrep: req.body.estTimeOfPrep || existingRecipe.estTimeOfPrep,
        ingredients: req.body.ingredients || existingRecipe.ingredients,
        prepInstructions: req.body.prepInstructions || existingRecipe.prepInstructions
    }}

    try {
        await Recipe.updateOne({_id: id}, updatedData)
        req.flash('info', 'Your recipe was successfully updated.')
    } catch (error) {
        res.status(500)
        console.log(error)
        req.flash('error', 'Recipe could not be updated.')
    }
}

const deleteRecipe = async (req, res) => {
    const id = req.params._id

    try {
        await Recipe.deleteOne({_id: id})
        req.flash('info', 'Your recipe was successfully deleted.')
    } catch (error) {
        res.status(500)
        console.log(error)
        req.flash('error', 'Could not delete recipe.')
    }
}

module.exports = {
    getUserRecipes,
    getAllRecipes,
    createRecipe,
    editRecipe,
    deleteRecipe,
}