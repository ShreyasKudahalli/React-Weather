import './weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

function Weather() {
    
  return (
    <>
    <div className='weather'>
        <div className='search-bar'>
            <input type='text' placeholder='Search'/>
            <img src={search_icon}/>
        </div>
        <img src={clear_icon} className='weather-icon'/>
        <p className='temperature'>16</p>
        <p className='location'>London</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity_icon}/>
                <div>
                    <p>91%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={wind_icon}/>
                <div>
                    <p>36 kmh</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default Weather
