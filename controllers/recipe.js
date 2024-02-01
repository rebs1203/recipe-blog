const Recipe = require('../models/Recipe.js')

const createRecipe = async (req, res) => {
    try {
        await Recipe.create(req.body)
    } catch (error) {
        res.status(500)
        req.flash('error', 'Internal Server Error')
    }
}

module.exports = createRecipe