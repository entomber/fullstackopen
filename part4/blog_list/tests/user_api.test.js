const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = await helper.initialUsers.map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some users saved', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialUsers.length)
  })
})

describe('addition of a new user', () => {
  test('a valid user can be added', async () => {
    const newUser = {
      username: 'test',
      name: 'test account',
      password: 'test1234' 
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('with duplicate username results in an error', async () => {
    const duplicateUser = helper.initialUsers[0]

    await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect (usersAtEnd.length).toBe(helper.initialUsers.length)
  })

  test('with username of less than 3 characters results in an error', async () => {
    const newUser = {
      username: 'te',
      name: 'test',
      password: 'test123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAtEnd = await helper.usersInDb()
    expect (usersAtEnd.length).toBe(helper.initialUsers.length)
  })

  test('with password of less than 3 characters results in an error', async () => {
    const newUser = {
      username: 'test',
      name: 'test',
      password: 'te'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAtEnd = await helper.usersInDb()
    expect (usersAtEnd.length).toBe(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})