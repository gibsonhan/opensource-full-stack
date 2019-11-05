import React from 'react'

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
        <div>username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => { setUsername(target.value) }}
          />
        </div>
        <div>password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => { setPassword(target.value) }}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login