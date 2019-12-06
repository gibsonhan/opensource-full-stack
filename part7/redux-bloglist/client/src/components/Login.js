import React from 'react'
import { useField } from '../hooks'

import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({setUser, setMessage, setShowMessage, setMColor}) => {
  const username = useField('text')
  const password = useField('text')
  
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
          username: username.input().value,
          password: password.input().value 

      })

      window.localStorage
        .setItem('LoggedInBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
    }

    catch(exception) {
      setMessage(exception.response.data.error)
      setMColor('red')
      setShowMessage(true)
      
      await setTimeout(()=> {
        setShowMessage(null)
        setMColor('red')  
      }, 5000)

      username.reset()
      password.reset()
    }

  }

  return (
    <div>
      <h1>Login in Application</h1>
      <form onSubmit={handleLogin}>
        <div>username
          <input {...username.input()}/>
        </div>
        <div>password
          <input {...password.input()} />
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login