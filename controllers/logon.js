const User = require('../models/User.js')

const register = async (req, res, next) => {
    let validationError = false
    try {
        const user = await User.create({...req.body})
        const token = user.createJWT()
        res.status(200).json({user: {name: user.username}, token})
    } catch (e) {
        if (e.name === "MongoServerError" && e.code === 11000) {
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

const logon = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        req.flash('error', 'Please provide e-mail and password')
    }

    const user = await User.findOne({email})

    if(!user) {
        res.status(404)
        req.flash('error', 'Incorrect e-mail')
    }

    const isPasswordCorrect = await user.comparePasswords(password)
    
    if (!isPasswordCorrect) {
        res.status(404)
        req.flash('error', 'Incorrect password')
    }

    const token = user.createJWT()
    res.status(200).json({user:{name: user.username}, token})
}

module.exports = {
    register,
    logon,
    logoff,
}