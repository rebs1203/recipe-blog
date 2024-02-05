const { NotFoundError } = require("../errors/index.js")

const auth = (req, res, next) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch (error) {
        res.status(401)
        console.log(error)
        throw new NotFoundError('User not found. Please try again or click register.')
    }
}