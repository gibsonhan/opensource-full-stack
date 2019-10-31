const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getAuthTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  //console.log('backendblogs', blogs)
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body
  const decodedToken = jwt.verify(request.token, config.SECERT)
  
  if(!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid'})
    }

  try {
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