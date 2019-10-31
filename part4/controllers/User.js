const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.get('/', async (request, response) => {
    try {
        const Users = await User
            .find({})
            .populate('blogs')
        response.status(200).json(Users.map(user => user.toJSON()))
    }
    catch(exception) {
        response.status(400).send({ error: exception})
    }
})

userRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const saltRounds = 10
        
        if(body.password.length < 3) {
            return response.status(406).json({ error: 'password length must be greater than 3'})
        }

        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const newUser = new User({
            username: body.username,
            name: (body.name === undefined) ? '' : body.name,
            passwordHash
        })

        await newUser.save()
        response.status(204).end()
    }
    catch(exception) {
        response.status(500).send({ error: exception })
    }
})

module.exports = userRouter