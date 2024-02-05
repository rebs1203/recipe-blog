const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const connectDB = require('./db/connect.js')
const authMiddleware = require('./middleware/auth.js')
const logonRoutes = require('./routes/logonRoutes.js')
const recipeRoutes = require('./routes/recipeRoutes')

const url = process.env.MONGO_URI

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//middleware
app.use(authMiddleware)

//routers 
app.use('/recipe-blog', logonRoutes)
app.use('/recipe-blog', recipeRoutes)



app.get('/rebeca', (req, res) => {
    res.send('Hello World')
    console.log('hello world')
})

const port = 3000

const start = async () => {
    try {
        await connectDB(url)
        console.log('Connected to MongoDB')
        app.listen( port, () => {
            console.log(`App is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()