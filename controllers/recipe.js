const { BadRequestError, NotFoundError } = require('../errors/index.js')
const Recipe = require('../models/Recipe.js')

const getUserRecipes = async (req, res) => {
    try {
        const userRecipes = await Recipe.find({createdBy:req.user.id})
        res.json({userRecipes})
    } catch (error) {
        console.log(error)
        throw new BadRequestError('Internal Server Error.')
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const allRecipes = await Recipe.find()
        res.json({allRecipes})
    } catch (error) {
        console.log(error)
        throw new BadRequestError('Internal Server Error.')
    }
}

const getRecipe = async (req, res) => {
    const id = req.params.id

    try {
        const recipe = await Recipe.findById(id)
        if(!recipe) {
            throw new NotFoundError('Recipe not found.')
        }
    } catch (error) {
        throw new BadRequestError('Undefined Error.')
    }
}


const createRecipe =  (req, res) => {
    const {
        body: { recipeName, cuisineType, estTimeOfPrep, ingredients, prepInstructions }
    } = req

    if(!recipeName || !cuisineType || !estTimeOfPrep || !ingredients ||! prepInstructions) {
        throw new BadRequestError('Fields cannot be empty.')
    } else {
        const newRecipe = {
            recipeName: recipeName,
            createdBy: req.user._id,
            cuisineType: cuisineType,
            estTimeOfPrep: estTimeOfPrep,
            ingredients: ingredients,
            prepInstructions: prepInstructions
        }
        Recipe.create(newRecipe)
        res.status(200)
    }
}

const editRecipe = async (req, res) => {

    const updatedData = { $set: {
        name: req.body.recipeName || recipe.recipeName,
        cuisineType: req.body.cuisineType || recipe.cuisineType,
        estTimeOfPrep: req.body.estTimeOfPrep || recipe.estTimeOfPrep,
        ingredients: req.body.ingredients || recipe.ingredients,
        prepInstructions: req.body.prepInstructions || recipe.prepInstructions
    }}

    try {
        await Recipe.findByIdAndUpdate({_id: id}, updatedData, { new: true, runValidators: true })
        res.status(200)
    } catch (error) {
        console.log(error)
        throw new BadRequestError('Recipe could not be updated.')
    }
}

const deleteRecipe = async (req, res) => {
    const id = req.params.id

    try {
        await Recipe.deleteOne({_id: id})
        res.status(200)
    } catch (error) {
        console.log(error)
        throw new BadRequestError('Recipe could not be deleted.')
    }
}

module.exports = {
    getUserRecipes,
    getAllRecipes,
    getRecipe,
    createRecipe,
    editRecipe,
    deleteRecipe,
}