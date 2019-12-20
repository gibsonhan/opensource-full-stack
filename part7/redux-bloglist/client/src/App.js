import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'

import Login from './components/Login'
import Message from './components/Message'
import BlogList from './components/BlogList'

import { get_initalBlogs } from './reducers/blog'

const App = (props) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userTokenJSON = window.localStorage.getItem('LoggedInBlogUser')
    if(userTokenJSON) {
      props.get_initalBlogs()
      const userToken = JSON.parse(userTokenJSON) // this is seomthing I need to review
      blogService.setToken(userToken.token) 
    }
  }, [])

  return (
    <div>
    <Message />
    {(user === null) 
      ? <Login 
         className="login"
        /> 
      : <BlogList 
          className="bloglist"
        />
    }
    </div>
  )
}

export default connect(
  null,
  {get_initalBlogs}
)(App)
