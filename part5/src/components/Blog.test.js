import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import Blog from './Blog'

describe('<Blog /> ', () => {
    let component

    beforeEach(() => {
        const blog = {
            url: 'Catch 999.com',
            title: 'Only the blog',
            author: 'and the author',
            user: {
                name: 'Mr. Author and Blog',
                username: 'testing'
            }
        }

        const user = {
            username: 'testing'
        }

        component = render(
            <Blog blog={blog} user={user} />
        )

    })
    test('Verify name and author render by default', () => {
        expect(component.container).toHaveTextContent(
            'Only the blog and the author'
        )
    })

    test('default render does not show additional blog info', () => {
        const div = component.container.querySelector('.displayBlog')
        expect(div).toHaveStyle('display: none')
    })

    test('Verify Url, Like, Added by, DisplayDelete visible after toggle visible', () => {
        const clickArea = component.getByText('Only the blog and the author')
        fireEvent.click(clickArea)

        const div = component.container.querySelector('.displayBlog')
        expect(div).not.toHaveStyle('display: none')

        expect(component.container).toHaveTextContent(
            'Catch 999.com'
        )

        const deleteButton = component.getByText('Remove')
        expect(deleteButton).toBeDefined() 
    })

})


