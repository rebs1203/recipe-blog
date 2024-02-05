const express = require('express')
const router = express.Router()

const {
    getUserRecipes,
    getAllRecipes,
    createRecipe,
    editRecipe,
    deleteRecipe
} = require('../controllers/recipe.js')

router.route('/').get(getAllRecipes)
router.route('/mypage/:id').get(getUserRecipes).post(createRecipe).patch(editRecipe).delete(deleteRecipe)


module.exports = router 