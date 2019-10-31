const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const middleware = require('./utils/tokenExtractor')

const blogsRouter = require('./controllers/Blog')
const usersRouter = require('./controllers/User')
const loginRouter = require('./controllers/Login')


console.log('connecting to', config.MongoUrl)
console.log('process enviorment is', process.env.NODE_ENV)

mongoose.connect(config.MongoUrl, { useNewUrlParser: true })
    .then(result => {
        console.log('connection to DB successful')
    })
    .catch(error => {
        console.log('failed to connect to db')
    })

const requestLogger = (request, response, next) => {
    console.log(request.path)
    next()
}

app.use(cors())
app.use(bodyParser.json())
app.use(requestLogger)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.tokenExtrator)
app.use('/api/blogs', blogsRouter)
module.exports = app