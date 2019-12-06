import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import SimpleBlog from './SimpleBlog'

test('Render content', () => {
    
    const blog = {
        title: 'Hello World',
        author: 'Mr. CIA',
        likes: '9999'
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    //method 1
    expect(component.container).toHaveTextContent(
        'Hello World'
    )

    const element = component.getByText(
        'Hello World Mr. CIA'
    )
    expect(element).toBeDefined()

    const div = component.container.querySelector('.likes')
    expect(div).toHaveTextContent(
        '9999'
    )
})

test('Clicking the button twice, event handler function is called twice', () => {
        const blog = {
            title: 'Twice the button test',
            author: 'Mr. Button',
            likes: '2222'
        }

        //mocks event handler
        const mockHandler = jest.fn()

        const { getByText } = render(
            <SimpleBlog blog={blog} onClick={mockHandler}/>
        )
        
        //finds the button
        const button = getByText('like')

        //clicks the element
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls.length).toBe(2)
})
        

/**
 * testing the front end
 *  1. import react
 *  2. import testing library by react
 *  3. import render to render DOM of component
 *  4. import actual note
 *  5. import the test
 * 
 *  
 * 
 *  Asking the right question would
 *  1. what libraries do I need to import to start thest
 *  2. what are the standards to starting a test
 *   
 *  Thoughts -
 *  1. asking the write question to get started and practicing seeking the right ansers 
 */