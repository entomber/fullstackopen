import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogsService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const username = useField('text')
  const password = useField('password')

  const blogFormRef = React.createRef()

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedBlogAppUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedBlogAppUser) {
      const user = JSON.parse(loggedBlogAppUser)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.input.value,
        password: password.input.value
      })

      window.localStorage.setItem(
        'loggedBloguser', JSON.stringify(user)
      )
      blogsService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      console.log(exception)
      setNotification({
        message: exception.response.data.error,
        isError: true
      })
      resetNotification()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloguser')
    setUser(null)
  }

  const resetNotification = () => {
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const getBlogs = async () => {
    const response = await blogsService.getAll()
    setBlogs(response.sort((a, b) => b.likes - a.likes))
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogsService.create({ title, author, url, })
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      setNotification({
        message: `a new blog '${title}' by ${author} added`,
        isError: false
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      resetNotification()
    } catch (exception) {
      setNotification({
        message: exception.response.data.error,
        isError: true
      })
      resetNotification()
    }
  }

  const incrementLike = (blog) => {
    blogsService.incrementLike(blog)
    getBlogs()
  }

  const handleRemove = async blog => {
    if (window.confirm(`remove blog '${blog.title}' by ${blog.author}`)) {
      try {
        await blogsService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setNotification({
          message: `blog '${blog.title} by ${blog.author} removed`,
          isError: false
        })
        resetNotification()
      } catch (exception) {
        setNotification({
          message: exception.response.data.error,
          isError: true
        })
        resetNotification()
      }
    }
  }

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      user={user}
      blog={blog}
      handleIncrementLike={() => incrementLike(blog)}
      handleRemove={() => handleRemove(blog)}
    />
  )

  if (user === null) {
    return (
      <div className='login'>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm
          handleLogin={handleLogin}
          username={username.input}
          password={password.input}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <p>
        {user.username} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          handleCreate={handleCreate}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
      </Togglable>

      {rows()}
    </div>
  )
}

export default App