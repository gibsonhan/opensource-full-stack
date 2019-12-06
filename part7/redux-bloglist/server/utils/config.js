const Port = 3003
let MongoUrl = 'mongodb+srv://fullstackNoob:fullstacknoob123@cluster0-guhsy.mongodb.net/bloglist?retryWrites=true&w=majority'
const TEST_MongoUrl = 'mongodb+srv://fullstackNoob:fullstacknoob123@cluster0-guhsy.mongodb.net/bloglist-test?retryWrites=true&w=majority'
const SECERT = 'nani_nani_nani'

if(process.env.NODE_ENV === 'test') {
    MongoUrl = TEST_MongoUrl
}

module.exports = { 
    MongoUrl, 
    Port,
    SECERT,
}