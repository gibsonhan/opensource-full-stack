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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}