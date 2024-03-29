const express = require('express')
const router = express.Router()

const {
    getUserRecipes,
    getAllRecipes,
    getRecipe,
    createRecipe,
    editRecipe,
    deleteRecipe
} = require('../controllers/recipe.js')

router.route('/').post(getAllRecipes)
router.route('/mypage').post(createRecipe).patch(getUserRecipes)
router.route('/mypage/:id').get(getRecipe).patch(editRecipe).delete(deleteRecipe)


module.exports = router 