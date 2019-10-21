const listHelper = require('../utils/list_helper')
const data = require('./testData')

 describe('list helper Dummy Test', () => {
        test('dummy test returns one', () => {
            const blogs = []
            
            const result = listHelper.dummy(blogs)
            expect(result).toBe(1)
        })
    })

describe('Blog with most likes', () => {
    test('of empty list is zero', () => {
        const zeroBlogs = []
        const result = listHelper.totalLikes(zeroBlogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(data.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(data.blogs)
        expect(result).toBe(36)
    })  
})

describe('Favorite Blog Individual Blog', () => {
    test('Favorite blog check is titled: Canonical String Reduction by Mr. E . Dijkstrsa', () => {
        const result = listHelper.favoriteBlog(data.blogs)
        expect(result).toEqual(data.favorite)
    })
})

describe('Author With Most Blog Test', () => {
    test('most blog test', () => {
        const result = listHelper.mostBlogs(data.blogs)
        expect(result).toEqual(data.mostBlogs)
    })
})

describe('Author with most likes', () => {
    test('total most likes', () => {
        const result = listHelper.mostLikes(data.blogs)
        expect(result).toEqual(data.mostLikes)
    })
})