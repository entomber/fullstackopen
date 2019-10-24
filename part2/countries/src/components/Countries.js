import React, { useState } from 'react'
import Weather from './Weather'

const Countries = ({ countries, enteredValue }) => {
  if (!enteredValue) {
    return (
      <Error newError='Specify a filter' />
    )
  }
  
  if (countries.length > 10) {
    return (
      <Error newError='Too many matches, specify another filter' />
    )
  } else if (countries.length === 0) {
    return (
      <Error newError='No countries found, specify another filter' />
    )
  } else {
    return (
      <CountryList countries={countries} />
    )
  }
}

const CountryList = ({ countries }) => {
  const [visibleCountries, setVisibleCountries] = useState(
    new Array(countries.length).fill(false))

  const showHideHandler = (index) => () => {
    const newVisibleCountries = [...visibleCountries]
    newVisibleCountries[index] = !newVisibleCountries[index]
    setVisibleCountries(newVisibleCountries)
  }

  if (countries.length === 1) {
    return (
      <Country
        country={countries[0]}
        show={true}
      />
    )
  }

  return (
    <div>
      {countries.map((country, index) =>
        <div key={country.name}>
          {country.name}
          <ShowHideButton
            clickHandler={showHideHandler(index)}
            show={visibleCountries[index]}
          />
          <Country
            country={country}
            show={visibleCountries[index]}
          />
        </div>)}
    </div>
  )
}

const ShowHideButton = ({ clickHandler, show }) => (
  <>
    <button onClick={clickHandler}>{show ? 'hide' : 'show'}</button>
  </>
)

const Country = ({ country, show }) => {
  if (!show) {
    return null
  }
  const { name, capital, population, languages, flag } = country
  
  return (
    <div>
      <h1>{name}</h1>
      <div>capital: {capital ? capital : 'N/A'}</div>
      <div>population: {population.length === 0 ? 'N/A' : population}</div>
      <h2>languages</h2>
      <ul>
        {languages.map(language => 
          <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={flag} width='120' alt={'Flag of ' + name} />
      <Weather country={country} />
    </div>
  )
}

const Error = ({ newError }) => (
  <div>
    {newError}
  </div>
)

export default Countries