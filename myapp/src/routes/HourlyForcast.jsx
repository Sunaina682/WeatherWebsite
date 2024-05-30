import React from 'react'
import Forecast from '../components/Forecast';

const HourlyForcast = ({weather}) => {
  return (
    <div>
        <Forecast title="Hourly" items={weather.hourly}/>
      </div>
  )
}

export default HourlyForcast;