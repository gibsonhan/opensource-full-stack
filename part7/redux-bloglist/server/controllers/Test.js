const testRouter = require('express').Router()
const User = require('../models/User')
const Blog = require('../models/Blog')

testRouter.post('/reset', async (req, resp) => {
	await User.deleteMany({})
	await User.deleteMany({})

	Response.status(204).end()
})

module.exports = testRouter