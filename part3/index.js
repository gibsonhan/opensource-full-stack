const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.use(bodyParser.json())

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if(person) {
        return response.json(person)
    }
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
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
    return persons.find(person => person.name.toLowerCase === name.toLowerCase)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)

    if(!body.name ){
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

    const person = {
        "name": body.name,
        "number": body.number || 'Did Not Enter',
        id: generateID()
    }

    persons = persons.concat(person)
    console.log('person',person)
    console.log('persons', persons)
    response.json(person)

    //parse the request
    //check if basic param is there
    //create new objecct
    //add to server
    //return object is response
})

app.get('/info', (request, response) => {
    const numPeople = persons.length
    const date = new Date()
    response.send(
        `<p>Phone book has info for ${numPeople} people </p>
        <p>${date}</p>`
    )
})

const PORT = 3001
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`)
})