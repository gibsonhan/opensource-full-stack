import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'

import { sendMessage, clearMessage } from '../reducers/notification'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = (props) => {
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
      //setUser(user)
    }

    catch(exception) {
      props.sendMessage(exception.response.data.error, 'red')
      props.clearMessage()
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

const mapDispatchToProp = {
  sendMessage,
  clearMessage,
}

export default connect(
  null,
  mapDispatchToProp,
)(Login)