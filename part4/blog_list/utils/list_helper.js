const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

// returns the sum of all likes of all blog posts
const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes
  return blogs.reduce(reducer, 0)
}

// returns the blog title, author, and likes for blog with most likes
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const reducer = (sum, item) => item.likes > sum.likes ? item : sum

  const result = blogs.reduce(reducer, blogs[0])
  return {
    title: result.title,
    author: result.author,
    likes: result.likes,
  }
}

// returns the author who has the largest amount of blogs and includes the
// total number of blogs
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const authors = _.map(blogs, blog => blog.author) // get array of authors
  const count = _.countBy(authors) // get count per author
  // get array of proper format
  const arrayOfAuthors = _.map(count, (value, key) => {
    return {
      author: key,
      blogs: value
    }
  })
  // return array value with most blogs
  const result = _.maxBy(arrayOfAuthors, 'blogs')
  return result
}

// returns the author whose blog posts have the largest amount of likes and
// includes the total number of likes the author has received
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  // get authors and their like count
  const authorsWithLikes = _.reduce(blogs, (result, value) => {
    if (result[value.author]) {
      result[value.author] += value.likes
    } else {
      result[value.author] = value.likes
    }
    return result
  }, {})
  // get array of proper format
  const arrayOfAuthors = _.map(authorsWithLikes, (value, key) => {
    return {
      author: key,
      likes: value
    }
  })
  // return array value with most likes
  const result = _.maxBy(arrayOfAuthors, 'likes')
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}