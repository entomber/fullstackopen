import React from 'react'

const Persons = ({ persons, clickHandler }) => (
  <div>
    {persons.map(person => 
      <Person key={person.name} 
        person={person} 
        clickHandler={clickHandler} 
      />)}
  </div>
)

const Person = ({ person, clickHandler }) => (
  <div>
    {person.name} {person.number}
    <button onClick={clickHandler(person)}>delete</button>
  </div>
)

export default Persons