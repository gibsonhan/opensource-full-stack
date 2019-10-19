const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('useFindAndModify', false)

console.log('Connecting to..', url)

mongoose.connect(url, {  useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Failed to connect to MongoDB', error)
    })
    


/*
1.import mongose
2. import string url
3. create mongoose schema
3.5 Clean up mongoose schema?
4. export as model
*/

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)