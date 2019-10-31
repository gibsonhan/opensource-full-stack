const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: String,
  user: {
    type: mongoose.Schema.Types.Object,
    ref: 'User'
  },
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.user
  }
})

module.exports = mongoose.model('Blog', blogSchema)