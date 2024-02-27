const { BadRequestError, NotFoundError } = require('../errors/index.js')
const ObjectId = require('mongodb').ObjectId
const Recipe = require('../models/Recipe.js')

const getUserRecipes = async (req, res) => {
    const { userId } = req.body
    try {
        const userRecipes = await Recipe.find({createdBy: userId})
        res.json({userRecipes})
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error.' });
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const cuisineType = req.query.name
        const allRecipes = await Recipe.find()
        if (cuisineType) {
            const filteredRecipes = allRecipes.filter(recipe => recipe.cuisineType + '=' === cuisineType);
            res.json({filteredRecipes})
        } else {
            res.json({allRecipes})
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error.' });
    }
}

const getRecipe = async (req, res) => {
    const id = req.params.id
    try {
        const recipe = await Recipe.findOne({
            _id: id,
            createdBy: req.user.userId
        });
        if(!recipe) {
            throw new NotFoundError('Recipe not found')
        }
        res.status(200).json({ recipe });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error.' });
    }
}


const createRecipe = async (req, res) => {
    console.log(req.body)
    const {
        body: { recipeName, createdBy, cuisineType, estTimeOfPrep, ingredients, prepInstructions }
    } = req
    try {
            const newRecipe = {
                recipeName: recipeName,
                createdBy: createdBy,
                cuisineType: cuisineType,
                estTimeOfPrep: estTimeOfPrep,
                ingredients: ingredients,
                prepInstructions: prepInstructions
            }
            const recipes = await Recipe.create(newRecipe)
            res.status(200).json({recipes})
        } catch (error) {
            if(error.name == "ValidationError") {
                res.status(400).json({message: error.message})
            } else {
                res.status(500).json({ message: 'Internal Server Error.' });
            }
        }
    }


const editRecipe = async (req, res) => {

    try {
        const id = req.params.id
        const recipe = await Recipe.findOne({
            _id: id,
            createdBy: req.user.userId
        });

        if(!recipe) {
            throw new NotFoundError('Recipe not found')
        }

        const updatedData = { $set: {
            recipeName: req.body.recipeName || recipe.recipeName,
            cuisineType: req.body.cuisineType || recipe.cuisineType,
            estTimeOfPrep: req.body.estTimeOfPrep || recipe.estTimeOfPrep,
            ingredients: req.body.ingredients || recipe.ingredients,
            prepInstructions: req.body.prepInstructions || recipe.prepInstructions
        }}
        const updatedRecipe = await Recipe.findByIdAndUpdate({_id: id}, updatedData, { new: true, runValidators: true })
        res.status(200).json({updatedRecipe})
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else if(error.name == "ValidationError") {
            res.status(400).json({message: error.message})
        } else {
            res.status(500).json({ message: 'Internal Server Error.' });
        }
    }
}

const deleteRecipe = async (req, res) => {
    const id = req.params.id

    try {
        const recipe =  await Recipe.findOneAndDelete({_id: id, createdBy: req.user.userId})
        if(!recipe) {
            throw new NotFoundError('Recipe not found')
        }
        res.status(200).json(`Product with id ${id} was successfully deleted.`)
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        }  else {
            res.status(500).json({message: 'Recipe could not be deleted.'})
        }
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