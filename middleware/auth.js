const auth = (req, res, next) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch (error) {
        res.status(401)
        console.log(error)
        req.flash('error', 'Something went wrong, please try logging in again.')
    }
}