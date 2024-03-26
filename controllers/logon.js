const { BadRequestError, NotFoundError } = require('../errors/index.js')
const { UnauthenticatedError } = require('../errors/index.js')
const User = require('../models/User.js')

const register = async (req, res) => {
    try {
        const user = await User.create({...req.body})
        const token = user.createJWT()
        res.status(200).json({user: {id: user._id, name: user.username}, token})
    } catch (e) {
        if (e.name === "MongoServerError" && e.code === 11000) {
            res.status(400).json({message: 'Email already in use.'})
        } else if(e.name == "ValidationError") {
            res.status(400).json({message: e.message})
        } else {
            res.status(500).json({ message: 'Internal Server Error.' });
        }
    }
}

const logoff = (req, res) => {
    req.headers.authorization = '';
    res.status(200).json({ message: "Logged off successfully" });
}


const logon = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new BadRequestError('Please provide email and password.');
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new UnauthenticatedError('Incorrect email or password.');
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Incorrect email or password.');
        } else {
            const token = user.createJWT();
            res.status(200).json({ user: {id: user._id, name: user.username }, token });
        }

    } catch (error) {
        if (error instanceof BadRequestError || error instanceof UnauthenticatedError) {
            res.status(400).json({ message: error.message });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error.' });
        }
    }
};

module.exports = {
    register,
    logon,
    logoff,
}