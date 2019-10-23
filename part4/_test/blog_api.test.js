const mongoose = require('mongoose')
const supertest = require('supertest')
const  app = require('../app')
const api = supertest(app)

const Blog = require('../models/Blog')
const helper = require('./test_helper')

/**
 * To make the test REST API test more roboust, avoid test depending on the state of the database
 * Reset the database and generate te needed test data in a controlled manner
 */
beforeEach(async () => {
    await Blog.deleteMany({})
    
    let blogObject = new Blog(helper._blogsData[0])
    await blogObject.save()

    blogObject = new Blog(helper._blogsData[1])
    await blogObject.save()
})

describe('REST API Testing', () => {
    test.only('All Blogs are loaded', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper._blogsData.length)
    })

})

afterAll(() => {
    mongoose.connection.close()
})