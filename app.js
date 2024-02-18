const express = require('express')
const app = express()
require('dotenv').config()
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
app.use(express.json())

// app.use(cors({
//     origin: 'https://recipe-blog-react.onrender.com'
// }));

app.use(cors({
    origin: 'http://localhost:3000'
}))

//security
app.use(helmet());
app.use(xss());

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
});
app.use(limiter);

//routers 
app.use('/recipe-blog', logonRoutes)
app.use('/recipe-blog', authMiddleware, recipeRoutes)

app.get('/rebeca', (req, res) => {
    res.send('Hello World')
    console.log('hello world')
})

const port = 3001

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