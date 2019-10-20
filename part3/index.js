require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const Person = require('./models/person')

app.use(express.static(__dirname + '/build'))

app.use(cors())
app.use(bodyParser.json())
morgan.token('string', function (req, res) {
    const string =  JSON.stringify(req.body)
    return string
})

app.use(morgan(':http-version :method :url :status :res[content-length] - response-time ms :string'))
//Method URL Status content-length response time in MS and body
app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
            console.log(typeof persons)
            response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person) {
                response.status(202).json(person).end()
            }
            else {
                response.status(404).send({
                    error: 'person not found'
                })
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const generateID = () => {
    const min = 1
    const max = 99999
    const random = Math.floor(Math.random() * (max - min)) + min;

    const returnId = persons.length > 0
        ? random
        : 0

    return returnId
}

const exist = (name) => {
    return returnValue = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name){
        return response.status(400).json({
            error: 'Must include name'
        })
    }

    if(!body.number){
        return response.status(400).json({
            error: 'Must include number'
        })
    }

    if(exist(body.name)){
        return response.status(400).json({
            error: 'Already exist'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(person => {
        response.json(person.toJSON())
    })
    .catch(error => next(error))
})

app.get('/api/info', (request, response) => {
    const numPeople = 10
    const date = new Date()
    response.send(
        `<p>Phone book has info for ${numPeople} people </p>
        <p>${date}</p>`
    )
})

//handler of request with unknown endpoint
const unknowEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknowEndpoint)

//handler of request to errors
const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id'})
    }
    else {
        return response.status(404).send({error: error})
    }
}

app.use(errorHandler)

const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`)
})