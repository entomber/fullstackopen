import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().indexOf(newFilter.toLowerCase()) > -1)
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  
  const nameExists = () => {
    const names = persons.map(person => person.name)
    return names.indexOf(newName) > -1 ? true : false
  }

  const resetNotification = () => {
    setTimeout(() =>{
      setNotification(null)
    }, 3000)
  }

  const addName = (event) => {
    event.preventDefault()
    if (nameExists()) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== returnedPerson.id ? person : returnedPerson
            ))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNotification({
      message: `Added ${newName}`,
      isError: false
    })
    resetNotification()
    setNewName('')
    setNewNumber('')
  }
  
  const deletePerson = (person) => {
    return () => {
      if (window.confirm(`Delete ${person.name} ?`)) {
        personService
        .remove(person.id)
        .then(() => {
          setNotification({
            message: `Deleted ${person.name}`,
            isError: false
          })
          resetNotification()
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          setNotification({
            message: `Information of ${person.name} has already been removed from server`,
            isError: true
          })
          resetNotification()
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
    }
  }
  
  console.log(notification)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter 
        newFilter={newFilter} 
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new contact</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={personsToShow} 
        clickHandler={deletePerson}
      />
    </div>
  )
}

export default App