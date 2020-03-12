import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  test('if user not logged in, app only displays login form and no blogs', async () => {
    const component = render(
      <App />
    )
    await waitForElement(
      () => component.container.querySelector('.login')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  test('if user logged in, app displays blog posts', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    await waitForElement(
      () => component.container.querySelector('.blog')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(4)
  })
})