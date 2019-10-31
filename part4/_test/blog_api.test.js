const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/User')
const Blog = require('../models/Blog')
const helper = require('../utils/api_helper')

/**
 * To make the test REST API test more roboust, avoid test depending on the state of the database
 * Reset the database and generate te needed test data in a controlled manner
 */
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const user = {
        name: 'LoginUser',
        username: 'LoginUser',
        password: 'LoginUser'
    }

    await api.post('/api/users')
        .send(user)
        .expect(204)

    for(let blog of helper._blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('REST API Testing', () => {
    test('All Blogs are loaded', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper._blogs.length)
    })

    test('Verify that ID propery is returned', async () => {
        const response = await api.get('/api/blogs')
        expect(helper.checkIdProperty(response.body)).toBeDefined()
    })
})
/
describe.only('Verify HTTP POST Resquest', () => {
   
    test.only('verify one note successfully saved into database', async () => {
        
        const login = {
            username: 'LoginUser',
            password: 'LoginUser',
        }

        const response = await api.post('/api/login')
            .send(login)
            .expect(200)

        await api.post('/api/blogs')
            .set('Authorization', 'bearer ' + response.body.token)
            .send(helper._newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsInDb = await helper.blogsInDb()
        expect(blogsInDb.length).toBe(helper._blogs.length + 1)
        
        const addedBlog = blogsInDb[2]
        expect(addedBlog.likes).toBeDefined()
        expect(addedBlog.user).toBeDefined()
        /*
        for (const properties in helper._newBlog) {
            properties === 'likes' 
                ? expect(mongoBlogs[2].likes).toBe(helper._newBlog.likes)
                : expect(mongoBlogs[2][properties]).toContain(helper._newBlog[properties]) 
            }
            */
    })

    test('Invalid Token', async () => {
        const newBlog = {
            url: 'InvalidToken.com',
            title: 'No Token',
            author: 'Hello',
            likes: 0,
            token: 'failed'
        }

        const response = await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)

        expect(response.body.message).toContain('jwt must be provided')
    })
})

describe('Verify the likes property exist in request', () => {
    test("check like properties", async () => {
        
        let response = await api.post('/api/blogs')
            .send(helper._newBlogNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        expect(response.body.likes).toBeDefined()
        expect(response.body.likes).toBe(0)
    })
    
})

/*
    Durring TDDD you can refined skill by writing expectation of request and response objects    
    supertest.set and so forth: the con
*/

describe('verify http post endpoint', () => {
    test('check if title and url is missing', async () => {

        const response = await api.post('/api/blogs')
        .send(helper._newBlogNoTitleAndUrl)    
            .expect('Content-Type', /json/)
            .expect(400)
        expect(response.body.title).not.toBeDefined()
        expect(response.body.url).not.toBeDefined()
    })
})

describe('verify http delete endpoint', () => {
    test ('delete one post', async() => {

        const Blogs = await helper.blogsInDb()
        const firstblog = Blogs[0]

        await api
            .delete(`/api/blogs/${firstblog.id}`)
            .expect(204)

        const checkDB = await helper.blogsInDb()
        expect(checkDB.length).toBe(helper._blogs.length - 1)
    })
})

describe('verify HTTP PUT Request', () => {
    test('update one blog', async () => {

        const Blogs = await helper.blogsInDb()
        const _firstBlog = Blogs[0]
     
        const response = await api
            .put(`/api/blogs/${_firstBlog.id}`)
            .send(helper._updateBlog)
            .expect('Content-Type', /json/)
            .expect(200)
        
        expect(response.body.likes).toBe(helper._updateBlog.likes)
    })
})

afterAll(() => {
    mongoose.connection.close()
})