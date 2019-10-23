const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  //console.log('backendblogs', blogs)
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })

  try {
    await blog.save()
    response.status(201).json(blog)
  }
  catch(exception) {
    response.status(400).json(exception)
  }
})

module.exports = blogsRouter