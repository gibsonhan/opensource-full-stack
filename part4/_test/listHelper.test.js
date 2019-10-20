const listHelper = require('../utils/list_helper')

 describe('list helper test', () => {
        test('dummy test returns one', () => {
            const blogs = []
            
            const result = listHelper.dummy(blogs)
            expect(result).toBe(1)
        })
    })