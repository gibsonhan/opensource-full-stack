const mongoose = require('mongoose')
const supertest = require('supertest')
const  app = require('../app')
const data = require('./testData')
const api = supertest(app)

test.only('HTTP Get request to /api/blogs', async () => {
    const response =  await api.get('/api/blogs')
    expect(response.body.length).toBe(data.hardData.length)
})

afterAll(() => {
    mongoose.connection.close()
})