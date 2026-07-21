import { useEffect, useState } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const ICONS = {
  Clear: clear_icon,
  Clouds: cloud_icon,
  Drizzle: drizzle_icon,
  Rain: rain_icon,
  Snow: snow_icon,
}

function Weather() {
  const [query, setQuery] = useState('London')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_KEY = import.meta.env.VITE_APP_ID

  async function fetchWeather(city) {
    if (!API_KEY) {
      setError('Missing VITE_APP_ID environment variable')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city,
        )}&appid=${API_KEY}&units=metric`,
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Unable to fetch weather')
      }

      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setWeather(null)
      setError(err.message || 'Failed to load weather')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(query)
  }, [])

  function handleSearch() {
    if (!query.trim()) return
    fetchWeather(query.trim())
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const weatherMain = weather?.weather?.[0]?.main
  const iconSrc = ICONS[weatherMain] || clear_icon

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search city'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img src={search_icon} onClick={handleSearch} alt='Search' />
      </div>

      {error ? (
        <p className='error-message'>{error}</p>
      ) : (
        <>
          <img src={iconSrc} className='weather-icon' alt={weatherMain || 'Weather'} />
          <p className='temperature'>
            {loading ? 'Loading...' : weather ? Math.round(weather.main.temp) : '--'}
            °C
          </p>
          <p className='location'>
            {weather ? `${weather.name}, ${weather.sys.country}` : 'No city selected'}
          </p>

          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt='Humidity' />
              <div>
                <p>{weather ? `${weather.main.humidity}%` : '--'}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt='Wind speed' />
              <div>
                <p>{weather ? `${weather.wind.speed} km/h` : '--'}</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather
