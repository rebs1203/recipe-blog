const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const url = process.env.MONGO_URI

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/rebeca', (req, res) => {
    res.send('Hello World')
    console.log('hello world')
})

const port = 3000

const start = async () => {
    try {
        await mongoose.connect(url)
        console.log('Connected to MongoDB')
        app.listen( port, () => {
            console.log(`App is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()