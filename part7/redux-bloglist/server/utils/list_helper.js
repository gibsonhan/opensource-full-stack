const _ = require('lodash')

const dummy = (blogs) => {
    return blogs.length === 0 
        ? 1
        : blogs.length 
}

const totalLikes = (blogs) => {
    if(blogs.length === 0) return 0
    else if(blogs.length === 1) return blogs[0].likes
    else {
        return blogs.reduce((total, curr) => {
            return total + curr.likes
        }, 0)
    }
}

const favoriteBlog = (blogs) => {
    //iterate through list
    //find the biggest algro?
    //return object with most like

    return blogs.reduce((_fav, curr) => {
        if (curr.likes > _fav.likes) {
            _fav = {
                title: curr.title,
                author: curr.author,
                likes: curr.likes
            }
        }
        
        return _fav
    }, {
        title: "",
        author: "",
        likes: 0
    } )
}

const mostBlogs = (blogs) => {   
    const _max = {
        author: "",
        blogs: 0
    }

    const groupedAuthor = _.groupBy(blogs, function(blog) {
        return blog.author
    }) 

    _.forEach(groupedAuthor, function(blogsArr, author) {
        if (blogsArr.length >= _max.blogs) {
            _max.author = author
            _max.blogs = blogsArr.length
        }
    })

    return _max
}

const mostLikes = (blogs) => {
    const _most = {
        author: "",
        likes: 0
    }

    const groupedAuthor =  _.groupBy(blogs, (blog) => {
        return blog.author
    })

    _.forEach(groupedAuthor, (blogArr, author) => {

        const sumLikes = _.reduce(blogArr, (total, currBlog) => {
            return total + currBlog.likes
        }, 0)

        if(sumLikes >= _most.likes) {
            _most.author = author
            _most.likes = sumLikes
        }
    })

    return _most
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}