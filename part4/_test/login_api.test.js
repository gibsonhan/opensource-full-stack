const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/User')
const app = require('../app')
const api = supertest(app)

beforeEach( async() => {
    await User.deleteMany({})
    const user = {
        name: 'LoginUser',
        username: 'LoginUser',
        password: 'LoginUser'
    }

    await api.post('/api/users')
        .send(user)
        .expect(204)

    const usersInDb = async () => {
        const users = await User.find({})
        return users.map(user => user.toJSON())
    }
    
    const getUsers = await usersInDb()
    console.log(getUsers)
})

test('Login test Error', async() => {
    const user = {
        username: 'Hello World',
        password: 'false'
    }

    const response = await api.post('/api/login')
        .send(user)
        .expect(401)

    expect(response.body.error).toContain('invalid username or password')
})

test('Login success', async () => {
    const userLogin = {
        username: 'LoginUser',
        password: 'LoginUser'
    }

    const response = await api
        .post('/api/login')
        .send(userLogin)
        .expect(200)

    expect(response.body.token).toBeDefined()
    console.log(response.body)

})

afterAll( async () => {
    await mongoose.connection.close()
})