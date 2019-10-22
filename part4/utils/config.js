const Port = 3003
let MongoUrl = 'mongodb+srv://fullstackNoob:fullstacknoob123@cluster0-guhsy.mongodb.net/bloglist?retryWrites=true&w=majority'
let TEST_MongoUrl = 'mongodb+srv://fullstackNoob:fullstacknoob123@cluster0-guhsy.mongodb.net/bloglist-test?retryWrites=true&w=majority'

if(process.env.NODE_ENV === 'test') {
    MongoUrl = TEST_MongoUrl
}

module.exports = { 
    MongoUrl, 
    Port
}