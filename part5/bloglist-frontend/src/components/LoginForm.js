import React from 'react'

const LoginForm = (
  {
    handleLogin,
    username,
    password,
  }) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input {...username} />
    </div>
    <div>
      password
      <input {...password} />
    </div>
    <button type="submit">Login</button>
  </form>
)

export default LoginForm