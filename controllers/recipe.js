const { BadRequestError, NotFoundError } = require('../errors/index.js')
const Recipe = require('../models/Recipe.js')

const getUserRecipes = async (req, res) => {
    try {
        const userRecipes = await Recipe.find({createdBy:req.user.id})
        if (!userRecipes) {
            throw new BadRequestError('Internal Server Error.')
        } else {
            res.json({userRecipes})
        }
    } catch (error) {
        console.log(error)
        if (error instanceof BadRequestError) {
            res.status(500).json({ message: error.message });
        }
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const cuisineType = req.query.name
        const allRecipes = await Recipe.find()
        if (!allRecipes) {
            throw new BadRequestError('Internal Server Error.')
        }
        if (cuisineType) {
            const filteredRecipes = allRecipes.filter(recipe => recipe.cuisineType + '=' === cuisineType);
            res.json({filteredRecipes})
        } else {
            res.json({allRecipes})
        }
    } catch (error) {
        console.log(error)
        if (error instanceof BadRequestError) {
            res.status(500).json({ message: error.message });
        }
    }
}

const getRecipe = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        if (!id) {
            throw new NotFoundError('Recipe not found')
        } else {
            const recipe = await Recipe.findById(id);
                res.status(200).json({ recipe });
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error.' });
        }
    }
}


const createRecipe = async (req, res) => {
    console.log(req.body)
    const {
        body: { recipeName, cuisineType, estTimeOfPrep, ingredients, prepInstructions }
    } = req

    try {
            if(!recipeName || !cuisineType || !estTimeOfPrep || !ingredients || !prepInstructions) {
                throw new BadRequestError('Fields cannot be empty.')
            } else {
                console.log('we got here')
                const newRecipe = {
                    recipeName: recipeName,
                    cuisineType: cuisineType,
                    estTimeOfPrep: estTimeOfPrep,
                    ingredients: ingredients,
                    prepInstructions: prepInstructions
                }
                const recipes = await Recipe.create(newRecipe)
                res.status(200).json({recipes})
            }
        } catch (error) {
            console.log(error)
            if (error instanceof BadRequestError) {
                res.status(500).json({ message: error.message });
            }
        }
    }


const editRecipe = async (req, res) => {
    const id = req.params.id
    const recipe = Recipe.findById(id)

    const updatedData = { $set: {
        name: req.body.recipeName || recipe.recipeName,
        cuisineType: req.body.cuisineType || recipe.cuisineType,
        estTimeOfPrep: req.body.estTimeOfPrep || recipe.estTimeOfPrep,
        ingredients: req.body.ingredients || recipe.ingredients,
        prepInstructions: req.body.prepInstructions || recipe.prepInstructions
    }}

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate({_id: id}, updatedData, { new: true, runValidators: true })
        if (!updatedRecipe) {
            throw new BadRequestError('Recipe could not be updated.')
        } else {
            res.status(200).json({updatedRecipe})
        }
    } catch (error) {
        console.log(error)
        if (error instanceof BadRequestError) {
            res.status(500).json({message: 'Recipe could not be updated.'})
        }
    }
}

const deleteRecipe = async (req, res) => {
    const id = req.params.id

    try {
        if (!id) {
            throw new BadRequestError('Recipe could not be deleted.')
        } else {
            await Recipe.deleteOne({_id: id})
            res.status(200).json(`Product with id ${id} was successfully deleted.`)
        }
    } catch (error) {
        console.log(error)
        if (error instanceof BadRequestError) {
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