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
describe('Verify HTTP POST Resquest', () => {
   
    test('verify one note successfully saved into database', async () => {
        
        const login = {
            username: 'LoginUser',
            password: 'LoginUser',
        }

        const response = await api.post('/api/login')
            .send(login)
            .expect(200)

        await api.post('/api/blogs')
            .set('Authorization', 'Bearer ' + response.body.token)
            .send(helper._newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsInDb = await helper.blogsInDb()
        expect(blogsInDb.length).toBe(helper._blogs.length + 1)
        
        const addedBlog = blogsInDb[2]
        expect(addedBlog.likes).toBeDefined()
        expect(addedBlog.user).toBeDefined()
       
    })

    test('Invalid Token', async () => {
        const newBlog = {
            url: 'InvalidToken.com',
            title: 'No Token',
            author: 'Hello',
            token: ' ',
            likes: 0,
        }

        const response = await api.post('/api/blogs')
            .send(newBlog)
            .expect(401)

        expect(response.body.error).toContain('token missing or invalid')
    })
})

describe('verify http delete endpoint', () => {
    test('delete one post', async() => {
        const Blogs = await helper.blogsInDb()
        const firstblog = Blogs[0]
        
        const userToken = {
            username: firstblog.user.username,
            id: firstblog.user.id,
        }

        const token = jwt.sign(userToken, config.SECERT)
        //console.log(token) 

        await api
            .delete(`/api/blogs/${firstblog.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(202)

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

describe('Delete without blog Post', () => {
        test('Fail to delete without a token', async () => {
        const blogsInDb = await helper.blogsInDb()
        const firstBlog = blogsInDb[0]
        
        const fakeUser = {
            username: 'Mr.Fake Token',
            id: 309802830283409280 
        }

        const token = jwt.sign(fakeUser, config.SECERT)
        const response = await api.delete(`/api/blogs/${firstBlog.id}`)
            .set('Authorization', 'Bearer ' + token)      
            .expect(401)

        expect(response.body.error).toContain('Invalid Authorization token')
    })

    test('Successful Delete with Appropriate Token', async () => {
        const login = {
            username: 'LoginUser',
            password: 'LoginUser',
        }

        const response = await api.post('/api/login')
            .send(login)
            .expect(200)

        const token = response.body.token

        await api.post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(helper._newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsInDb = await helper.blogsInDb()
        const addedBlog = blogsInDb[2]

        expect(blogsInDb.length).toBe(helper._blogs.length + 1)

        const deleteResponse = await api.delete(`/api/blogs/${addedBlog.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(202) 
        
        expect(deleteResponse.body.message).toContain('Blog was deleted')
        const blogsAfterDelete = await helper.blogsInDb()
        expect(blogsAfterDelete.length).toBe(helper._blogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})