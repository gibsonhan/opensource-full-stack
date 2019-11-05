import React from 'react'
import '@testing-library/jest-dom'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'
//import BlogList from './BlogList'

/** Write an integration test
 *  - user is not logged into applicaiton 
 *      -> then applicaiton only display a login form 
 *      -> no blogs rendered
 */

 describe('<Login />', () => {
    test('If user is not logged on, login form displayed only and no blog rendered', async () => {
        const component = render(
            <App />
        )
        
        //ensure all effects hooks are executed, may not be needed for newever version
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('Login')
        )
       
        const login = component.container.querySelector('.login')
        expect(login).toBeDefined()

        const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(0)
    })

    test('If user is logged on, 3 blogs are rendered on page', async () => {
        const component = render(
            <App />
        )
        
        const user = {
            username: 'testuser',
            token: '231321312',
            name: 'John Doe'
        }
        
        localStorage.setItem('LoggedInBlogUser', JSON.stringify(user))
        console.log(localStorage.getItem('LoggedInBlogUser'))
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('Login')
        )
        
        const bloglist = component.container.querySelector('.bloglist')
        expect(bloglist).toBeDefined()

        const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(3)
    })
})