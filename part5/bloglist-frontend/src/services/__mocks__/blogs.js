const blogs = [
  {
    title: 'Not an actual blog',
    author: 'University of Helsinki',
    url: 'https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing',
    likes: 3,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5e066d9b4c54f20278e2fbf8'
    },
    __v: 0,
    id: '5e066db84c54f20278e2fbfa'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5e066d9b4c54f20278e2fbf8'
    },
    __v: 0,
    id: '5e066dd94c54f20278e2fbfb'
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'jeff',
      name: 'Jeff Y',
      id: '5e066d9f4c54f20278e2fbf9'
    },
    __v: 0,
    id: '5e066e5c4c54f20278e2fbfd'
  },
  {
    title: 'Moore\'s Law is not Ending Soon and the Reason May Surprise You',
    author: 'Todd Hoff',
    url: 'http://highscalability.com/blog/2020/2/19/moores-law-is-not-ending-soon-and-the-reason-may-surprise-yo.html',
    likes: 1,
    user: {
      username: 'jeff',
      name: 'Jeff Y',
      id: '5e066d9f4c54f20278e2fbf9'
    },
    __v: 0,
    id: '5e6304985cfe6a1d488142ec'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (token) => {}

export default { getAll, setToken }