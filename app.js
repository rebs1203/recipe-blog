const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const multer = require('multer')
const connectDB = require('./db/connect.js')
const authMiddleware = require('./middleware/auth.js')
const logonRoutes = require('./routes/logonRoutes.js')
const recipeRoutes = require('./routes/recipeRoutes')

const url = process.env.MONGO_URI

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json())

app.use(cors([{
    origin: 'https://recipe-blog-react.onrender.com'
},
{
    origin: 'http://localhost:3000'

//security
app.use(helmet());
app.use(xss());

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
});
app.use(limiter);

//middleware

const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 30 * 1024 * 1024,
        files: 1,
        fields: 10 
    }
})

//routers 
app.use('/recipe-blog', logonRoutes)
app.use('/recipe-blog', authMiddleware, upload.single('image'), recipeRoutes)

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