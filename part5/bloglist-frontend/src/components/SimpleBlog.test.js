import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'test title',
  author: 'test author',
  likes: 4
}

describe('<SimpleBlog />', () => {
  let component

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} />
    )
  })

  test('renders the title', () => {
    const div = component.container.querySelector('.titleAndAuthor')
    expect(div).toHaveTextContent(blog.title)
  })

  test('renders the author', () => {
    const div = component.container.querySelector('.titleAndAuthor')
    expect(div).toHaveTextContent(blog.author)

  })

  test('renders the amount of likes', () => {
    const div = component.container.querySelector('.likes')
    expect(div).toHaveTextContent(blog.likes)
  })

  test('clicking the like button twice calls event handler twice', () => {
    const mockHandler = jest.fn()

    const { container } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
