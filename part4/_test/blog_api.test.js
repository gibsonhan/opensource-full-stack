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
    
    let blogObject = new Blog(helper._blogs[0])
    await blogObject.save()

    blogObject = new Blog(helper._blogs[1])
    await blogObject.save()
})

describe('REST API Testing', () => {
    test('All Blogs are loaded', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper._blogs.length)
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
     * 
     * After thoughts--
     * --> Using load dash to verify all object contains id?
     */
    test('Verify that ID propery is returned', async () => {
        const response = await api.get('/api/blogs')
        expect(helper.checkIdProperty(response.body)).toBeDefined()
    })

    /** 
     * 1.Verifty HTTP Post Request -> create new Blog
     * 2.Verify total number of blogs in system increase by one
     * 3.Verify the content of blogs are saved correctly in blog 
     * 
     */
    describe('Verify HTTP POST Resquest', () => {
        /**
         * 1. sent post request w/ dummy Object?
         * ------
         * rather than calling api.get request again, call the database directly because you are not testing the api get
         * its important to understand what is being called and using the appropriate calls
         */
        test('verify one note successfully saved into database', async () => {
            await api.post('/api/blogs')
                .send(helper._newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const mongoBlogs = await helper.blogsInDb()
            expect(mongoBlogs.length).toBe(helper._blogs.length + 1)

            for (const properties in helper._newBlog) {
                properties === 'likes' 
                    ? expect(mongoBlogs[2].likes).toBe(helper._newBlog.likes)
                    : expect(mongoBlogs[2][properties]).toContain(helper._newBlog[properties]) 
                }
        })
    })

    describe('verify the likes property exist in request', () => {
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
    */

    describe.only('verify http post endpoint', () => {
        test('check if title and url is missing', async () => {

            const response = await api.post('/api/blogs')
            .send(helper._newBlogNoTitleAndUrl)    
                .expect('Content-Type', /json/)
                .expect(400)
            expect(response.body.title).not.toBeDefined()
            expect(response.body.url).not.toBeDefined()
        })
    })

})

afterAll(() => {
    mongoose.connection.close()
})