import React, { useState } from 'react'

const Blog = (
  {
    user,
    blog,
    handleIncrementLike,
    handleRemove
  }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleBlogDetails = () => setVisible(!visible)

  return(
    <div className='blog'>
      <div style={blogStyle}>
        <div className='titleAndAuthor' onClick={() => toggleBlogDetails()}>
          {blog.title} {blog.author}
        </div>
        <div className='blogDetails' style={showWhenVisible}>
          <div><a href={blog.url}>{blog.url}</a></div>
          <div>
            {blog.likes} likes
            <button onClick={handleIncrementLike}>like</button>
          </div>
          <div>added by {blog.user.name}</div>
          {blog.user.username === user.username && blog.user.name === user.name
            ? <button onClick={handleRemove}>remove</button>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default Blog