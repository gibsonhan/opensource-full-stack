const Blog = require('../models/Blog')

const _blogsData = [
    {
        title: "How Dogs Fly",
        author: "Mr. Ruff",
        url: "wwww.dogs are the best",
        likes: "100"
    },
    {
        title: "How Cats Swim",
        author: "Mr. Snake",
        url: "1000.cat.com",
        likes: 32
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}

const checkIdProperty = (blogs) => {
    let idExist = undefined
    
    blogs.forEach(blog => {
        if(blog.hasOwnProperty('id') === true){
            idExist = true
        }
        else {
            idExist = undefined
        }
    })

    return idExist
}

module.exports = {
    blogsInDb,
    _blogsData,
    checkIdProperty
}