import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const user = {
  username: 'jeff',
  name: 'jeff y'
}

const blog = {
  url: 'www.google.com',
  title: 'google homepage',
  author: 'jeff',
  user: {
    username: user.username,
    name: user.name
  }
}

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('at start only title and author are shown', () => {
    const div = component.container.querySelector('.blogDetails')
    expect(div).toHaveStyle('display: none')
  })

  test('details are shown after clicking title and author', () => {
    const titleAndAuthor = component.container.querySelector('.titleAndAuthor')
    fireEvent.click(titleAndAuthor)

    const div = component.container.querySelector('.blogDetails')
    expect(div).not.toHaveStyle('display: none')
  })
})