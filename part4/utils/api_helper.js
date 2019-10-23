const Blog = require('../models/Blog')

const _blogs = [
    {
        title: "How Dogs Fly",
        author: "Mr. Ruff",
        url: "wwww.dogs are the best",
        likes: 100
    },
    {
        title: "How Cats Swim",
        author: "Mr. Snake",
        url: "1000.cat.com",
        likes: 32
    }
]

const _newBlog = {
    title: "New Blog Test",
    author: "Mr. New Guy",
    url: "333.com",
    likes: 999
}

const _newBlogNoLikes = {
    title: "Mr. No Likes",
    author: "Twice",
    url: "LikelyLikely.com",
}

const _newBlogNoTitleAndUrl = {
    author: "Mr. SandMan",
    likes: 1902382
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}

const checkIdProperty = async (blogs) => {
    let idExist = undefined
    
    await blogs.forEach(blog => {
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
    _blogs,
    _newBlog,
    _newBlogNoLikes,
    _newBlogNoTitleAndUrl,
    checkIdProperty,
}