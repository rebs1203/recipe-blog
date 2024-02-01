const User = require('../models/User.js')

const register = async (req, res, next) => {
    let validationError = false
    try {
        await User.create(req.body)
    } catch (e) {
        if (e.constructor.name === 'ValidationError') {
            req.flash('error', 'Incorrect e-mail or password')
        } else if (e.name === "MongoServerError" && e.code === 11000) {
            req.flash("error", "That email address is already registered.");
        } else {
            return next(e);
        }
        validationError = true
    }

    if (!validationError) {
        res.redirect('/')
    } 
}

const logoff = (req, res) => {
    if (err) { 
        console.log(err)
    }
    res.redirect('/')
}

const logon = (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }
}

module.exports = {
    register,
    logon,
    logoff,
}