import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

/**
 * Shows information about a country including weather
 * - fetches all country information on app load
 * - fetches weather data when a single country is displayed or show button is pressed
 * - fixed edge cases such as:
 *    - fetch weather for countries without capitals
 *    - fetch weather by latitude and longitude if location name fails
 */

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setnewFilter ] = useState('')
  const [ enteredValue, setEnteredValue ] = useState(false)

  const hook = () => {
    console.log('fetching country data')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().indexOf(newFilter.toLowerCase()) > -1)

  const handleFilterChange = (event) => {
    setEnteredValue(event.target.value.length === 0 ? false : true)
    setnewFilter(event.target.value)
  }

  return (
    <div>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <Countries
        countries={countriesToShow}
        enteredValue={enteredValue}
      />
    </div>
  )
}

export default App
