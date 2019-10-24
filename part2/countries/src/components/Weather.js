import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_APIKEY
const BASE_URL = `http://api.weatherstack.com/current?access_key=${API_KEY}`

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({})
  const [weatherReady, setWeatherReady] = useState(false)

  const { name, capital, latlng } = country
  let location = capital ? capital : name

  // get weather for a country
  const hook = () => {
    console.log('fetching weather for', location)
    axios
      .get(`${BASE_URL}&query=${location}`)
      .then(response => {
        // use latitude and longitude if we get an error with location name
        if (response.data.error) {
          axios
            .get(`${BASE_URL}&query=${latlng[0]},${latlng[1]}`)
            .then(response => {
              if (response.data.error) {
                return
              }
              setWeather(response.data)
              setWeatherReady(true)
            })
        } else {
          setWeather(response.data)
          setWeatherReady(true)
        }
      })
  }

  useEffect(hook, [])

  if (!weatherReady) {
    return null
  }

  return (
    <div>
      <h2>Weather in {location}</h2>
      <WeatherReport weather={weather} />
    </div>
  )
}

const WeatherReport = ({ weather }) => {
  const { temperature, weather_icons, wind_speed, wind_dir } = weather.current
  return (
    <div>
      <div>
        <strong>temperature:</strong> {temperature}° Celcius 
      </div>
      <div>
        <img src={weather_icons[0]} alt={'Weather icon'}/>
      </div>
      <div>
        <strong>wind:</strong> {wind_speed} kph, direction {wind_dir}
      </div>
    </div>
  )
}

export default Weather