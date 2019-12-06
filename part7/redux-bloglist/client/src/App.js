import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'

import Login from './components/Login'
import Message from './components/Message'
import BlogList from './components/BlogList'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [showMessage, setShowMessage] = useState(null)
  const [message, setMessage] = useState('')
  const [mColor, setMColor] = useState('green')
  
  useEffect(() => {
      async function fetchData () { 
        const response  = await blogService.getAll()
        setBlogs(response)
      }
      fetchData()
  }, [])

  useEffect(() => {
    const userTokenJSON = window.localStorage.getItem('LoggedInBlogUser')

    if(userTokenJSON) {
      const userToken = JSON.parse(userTokenJSON)
      blogService.setToken(userToken.token) 
      setUser(userToken)
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
        />}
    </div>
  )
}

export default App;

