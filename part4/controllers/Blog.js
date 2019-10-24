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

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  console.log('backend id', id)
  try {
    let newObject = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(newObject.toJSON())
  }
  catch(exception) {
    console.log('failed to update', exception)
    response.status(404).json({ error: exception })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  
  try {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  }
  catch(exception) {
    response.status(404).json({ error: 'failed to delete blog' })
  }
})
module.exports = blogsRouter