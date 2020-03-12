const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (!body.password || body.password.length < 3) {
      return response
        .status(400)
        .json({ 
          error: 'password must be at least 3 characters long'
        })
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter