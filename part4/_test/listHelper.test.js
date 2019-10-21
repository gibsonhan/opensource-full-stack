const listHelper = require('../utils/list_helper')
const data = require('./testData')

 describe('list helper Dummy Test', () => {
        test('dummy test returns one', () => {
            const blogs = []
            
            const result = listHelper.dummy(blogs)
            expect(result).toBe(1)
        })
    })

describe('total likes', () => {
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

describe('Favorite Blog', () => {
    test('Favorite blog check is titled: Canonical String Reduction by Mr. E . Dijkstrsa', () => {
        const result = listHelper.favoriteBlog(data.blogs)
        expect(result).toEqual(data.favorite)
    })
})