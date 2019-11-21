const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  if(!request.token || request.token === undefined) {
      return response.status(401).json({ error: 'token missing or invalid'})
    }

  try {
    const decodedToken = jwt.verify(request.token, config.SECERT)
    const user = await User.findById(decodedToken.id)
    const oneUser = user.toJSON() 

    const userObject = {
      name: oneUser.name,
      username: oneUser.username,
      id: oneUser.id
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: userObject
    })
    
    await blog.save()
    response.status(201).json(blog)
  }
  catch(exception) {
    response.status(400).json(exception)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  
  try {
    let newObject = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(newObject.toJSON())
  }
  catch(exception) {
    console.log(exception)
    console.log('failed to update', exception)
    response.status(404).json({ error: exception })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id) 
  
  decodedToken = jwt.verify(request.token, config.SECERT)
  
  if(decodedToken.username !== blog.user.username|| decodedToken.id !== blog.user.id) {
    return response.status(401).json({error: 'Cannot Delete, Invalid Authorization token'})
  }

  try {
    await Blog.findByIdAndRemove(id)
    response.status(202).json({ message: 'Blog was deleted'})
  }
  catch(exception) {
    response.status(404).json({ error: 'failed to delete blog' })
  }
})
module.exports = blogsRouter