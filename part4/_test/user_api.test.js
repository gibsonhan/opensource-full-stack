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

        const usersInDb = await helper.usersInDb()
        expect(usersInDb.length).toBe(helper._initalUsers.length + 1)
        
        const addedUser = usersInDb[2]
        expect(addedUser.username).toBeDefined()
        expect(helper.noPassHash(addedUser)).not.toBeDefined()
        expect(addedUser.blogs).toBeDefined()
    })
    
    test('Username and Password length > 3', async () => {
        await api.post('/api/users')
            .send(helper._notLenReq)
            .expect(406)
    })

    test('Must Contain Username and Password', async() => {
        await api.post('/api/users')
            .send(helper._noUsernamePass)
            .expect(500)
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