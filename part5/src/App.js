import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'

import Login from './components/Login'
import Message from './components/Message'
import BlogList from './components/BlogList'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [showMessage, setShowMessage] = useState(null)
  const [message, setMessage] = useState('')
  const [mColor, setMColor] = useState('green')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage
        .setItem('LoggedInBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }

    catch(exception) {
      setMessage(exception.response.data.error)
      setMColor('red')
      setShowMessage(true)
      
      await setTimeout(()=> {
        setShowMessage(null)
        setMColor('red')  
      }, 5000)
    }
  }
  
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
         password={password}
         setPassword={setPassword}
         username={username}
         setUsername={setUsername}
         handleLogin={handleLogin} 
        /> 
      : <BlogList 
          user={user}
          setUser={setUser} 
          setBlogs={setBlogs}
          blogs={blogs}
        />}
    </div>
  )
}

export default App;

