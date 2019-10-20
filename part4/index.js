const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const blogsRouter = require('./controllers/Blog')

mongoose.connect(config.MongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

app.listen(config.Port, () => {
  console.log(`Server running on port ${config.Port}`)
})