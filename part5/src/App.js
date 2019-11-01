import React, { useState, useEffect } from 'react'
import loginService from './services/login'

import Blog from './components/Blog'
import { loadOptions } from '@babel/core'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showMessage, setShowMessage] = useState(true)

  const testData = {
    title: 'Hello',
    author: 'World',
    name: 'Gibson Han'
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      //window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception) {
      console.log(exception)
    }
  }
    useEffect(() => {
      //checkLocalForToken()
      console.log('effect')
    }, [])

  return (
    <div>
    {(showMessage !== null) && <Message message= {'Testing'} />}
    {(user === null) 
      ? <Login 
         password={password}
         setPassword={setPassword}
         password={password} 
         setUsername={setUsername}
         handleLogin={handleLogin} 
        /> 
      : <BlogList 
          name={'Gibson Han'}
          setUser={setUser} 
        />}
    </div>
  )
  
}

const BlogList = ({name, setUser}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showMessage, setShowMessage] = useState(true)
  const [blogs, setBlogs] = useState([])
  const handleLogout = () => {
    //window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleCreate = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: setAuthor,
      url: url
    }

    //let returnedObject = blogService.create(newBlog, credential)
    //setBlogs.concat(returnedObject)
  }
  return (
    <div>
      <h1>Blogs</h1>
      {(showMessage !== null) && <Message message= {'Testing'} />} 
      <p>{name} logged in </p> <button onClick={() => handleLogout()}> Logout</button>

      <h2>Create New</h2>
      <form handleSumbit={handleCreate}>
          title <input />
          author <input />
          url <input />
          <button>Create</button>
      </form>
    </div>
  )
}

const Message = ({message}) => {
  
  const messageStyle = {
    color: 'green'

  }
  return(
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const Login = ({
  password, 
  setPassword, 
  username,
  setUsername, 
  handleLogin
}) => {

  return (
    <div>
      <h1>Login in Application</h1>
        <form onSubmit={handleLogin}>
          <div>
            username 
              <input 
                type="text"
                value={username}
                name="Username"
                onChange={({target}) => {setUsername(target.value)}}
              />
          </div>
          <div>
            password
            <input 
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => {setPassword(target.value)}}
            />
          </div>
        <button>Login</button>
      </form>
    </div>
  );
}

export default App;

