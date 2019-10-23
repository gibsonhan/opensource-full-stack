const mongoose = require('mongoose')
const supertest = require('supertest')
const  app = require('../app')
const api = supertest(app)

const Blog = require('../models/Blog')
const helper = require('../utils/api_helper')

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
    test('All Blogs are loaded', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper._blogsData.length)
    })

    /**
     * Verify unique id property of the blog post is named id
     * By default mongoose => returns id
     * ---------------------------
     * we need to access the id attribute? 
     *  ---> need to modify mongoose schema/model to output id attribute
     * How do we read the _id attribute from the response.body?
     * 
     * (((Asking the right question is important)))
     * (((Being able to make prediction an expection of input and output)))
     */
    test.only('Verify that ID propery is returned', async () => {
        const response = await api.get('/api/blogs')
        //const result console.log(response.body[0].hasOwnProperty('_id'))
        expect(helper.checkIdProperty(response.body)).toBeDefined()
        //expect(response.body[0]).toBeDefined('_id')
    })


})

afterAll(() => {
    mongoose.connection.close()
})