import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'

import { sendMessage, clearMessage } from '../reducers/notification'
import { loginUser } from '../reducers/login'

import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = (props) => {
  const username = useField('text')
  const password = useField('text')
  const handleLogin = async (event) => {
    event.preventDefault()
    let response;
    try {
      response = await loginService.login({
          username: username.input().value,
          password: password.input().value 

      })
      window.localStorage
        .setItem('LoggedInBlogUser', JSON.stringify(response))

      blogService.setToken(response.token)
      console.log(response.token)
      props.setUser(response)
      props.login(response)
    }
    catch(exception) {
      const error = exception.response.data.error;
      if(error) {
        props.sendMessage(exception.response.data.error, 'red')
        props.clearMessage()
      } 
      
      username.reset()
      password.reset()
    }
    finally {
      console.log('end')
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

const mapDispatchToProp = {
  loginUser,
  sendMessage,
  clearMessage,
}

export default connect(
  null,
  mapDispatchToProp,
)(Login)