const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const blogsRouter = require('./controllers/Blog')

console.log('connecting to', config.MongoUrl)
console.log('process enviorment is', process.env.NODE_ENV)
mongoose.connect(config.MongoUrl, { useNewUrlParser: true })
    .then(result => {
        console.log('connection to DB successful')
    })
    .catch(error => {
        console.log('failed to connect to db')
    })

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

module.exports = app