const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

describe('viewing a specific blog', () => {
  test('blog unique identifier is named \'id\'', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    
    expect(blog.id).toBeDefined()
    expect(blog._id).not.toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Best Practice for Creating Indexes on your MySQL Tables',
      author: 'Kristi Anderson',
      url: 'http://highscalability.com/blog/2019/12/3/best-practice-for-creating-indexes-on-your-mysql-tables.html',
      likes: 3,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(newBlog.title)
  })

  test('if likes property is missing, default to 0', async () => {
    const newBlog = {
      title: 'Best Practice for Creating Indexes on your MySQL Tables',
      author: 'Kristi Anderson',
      url: 'http://highscalability.com/blog/2019/12/3/best-practice-for-creating-indexes-on-your-mysql-tables.html',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    
    const blogsAtEnd = await helper.blogsInDb()
    const lastAddedBlog = blogsAtEnd[blogsAtEnd.length - 1]
  
    expect(lastAddedBlog.likes).toBe(0)
  })

  test('a blog without title and url cannot be added', async () => {
    const newBlog = {
      author: 'Kristi Anderson',
      likes: 3
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update information of a blog', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const likesAtStart = blogToUpdate.likes

    blogToUpdate.likes++

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].likes).toBe(likesAtStart + 1)
  })
})


afterAll(() => {
  mongoose.connection.close()
})