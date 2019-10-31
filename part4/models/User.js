const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    blogs: [{
        type: mongoose.Schema.Types.Object,
        ref: 'Blog'
    }], 
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    passwordHash: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    }
})


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)