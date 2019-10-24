import React from 'react'

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

const Header = ({ name }) =>  (
  <>
    <h2>{name}</h2>
  </>
)

const Content = ({ parts }) => {
  const rows = () => parts.map(part =>
    <Part
      key={part.id}
      part={part}
    />
  )
  
  return (
    <>
      {rows()}
    </>
  )
}

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => {
  const initialValue = 0
  const sum = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises
    , initialValue
  )
  return (
    <>
      <p><strong>Total of {sum} exercises</strong></p>
    </>
  )
}

export default Course