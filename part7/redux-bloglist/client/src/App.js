import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'

import Login from './components/Login'
import Message from './components/Message'
import BlogList from './components/BlogList'

import { get_initalBlogs } from './reducers/blog'

const App = (props) => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [showMessage, setShowMessage] = useState(null)
  const [message, setMessage] = useState('')
  const [mColor, setMColor] = useState('green')

  useEffect(() => {
    const userTokenJSON = window.localStorage.getItem('LoggedInBlogUser')
    if(userTokenJSON) {
      props.get_initalBlogs()
      const userToken = JSON.parse(userTokenJSON) // this is seomthing I need to review
      blogService.setToken(userToken.token) 
      setBlogs(userToken)
    }
  }, [])

  return (
    <div>
    {(showMessage !== null) && <Message message={message} color={mColor} />}
    {(user === null) 
      ? <Login 
         className="login"
         setUser={setUser}
         setMessage={setMessage}
         setShowMessage={setShowMessage}
         setMColor={setMColor}
        /> 
      : <BlogList 
          className="bloglist"
          user={user}
          setUser={setUser}
          setBlogs={setBlogs}
          blogs={blogs} 
        />
    }
    </div>
  )
}

export default connect(
  null,
  {get_initalBlogs}) (App)
