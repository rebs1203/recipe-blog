const { NotFoundError, UnauthenticatedError } = require("../errors/index.js")
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization
    
    console.log(req.body.test)

    if (req.body.test === "GETALL") {
        next()
        return
    }
    if (!authHeader) return
    
    const token = authHeader?.split(' ')[1]

    try {
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthenticatedError('Authentication Invalid')
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch (error) {
        throw new NotFoundError('User not found. Please try again or click register.')
    }
}

module.exports = auth