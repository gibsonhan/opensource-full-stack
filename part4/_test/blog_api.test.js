const mongoose = require('mongoose')
const supertest = require('supertest')
const  app = require('../app')
const data = require('./testData')
const api = supertest(app)

const helper = require('./test_helper')

describe('REST API Testing', () => {
    test('All Blogs are loaded', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    expect(response.body.length).toBe(0)
    })

})


afterAll(() => {
    mongoose.connection.close()
})