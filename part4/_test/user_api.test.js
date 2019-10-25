const helper = require('../utils/user_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/User')
const app = require('../app')

const api = supertest(app)

beforeEach( async () => {
    await User.deleteMany({})

    for(let user of helper._initalUsers){
        let newUser = new User(user)
        await newUser.save()
    }
})

describe("User Query: HTTP Get Request", () => {
    test('Get All User Test', async () => {
        const response = await api.get('/api/users') 
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(helper._initalUsers.length)
    })

})

describe("User Creation: HTTP POST Request", () => {
    test('User Creation Test', async () => {
        const response = await api.post('/api/users')
            .send(helper._newUser)
            .expect(204)

        const userInDb = await helper.userInDb()
       
        expect(userInDb.length).toBe(helper._initalUsers.length + 1)
        expect(helper.noPassHash(userInDb[2])).not.toBeDefined()
    
    })

    test('Reject Duplicate User Test', async() => {
        await api.post('/api/users')
            .send(helper._duplicateUser)
            .expect(500)
    })

})

afterAll(() => {
    mongoose.connection.close()
})