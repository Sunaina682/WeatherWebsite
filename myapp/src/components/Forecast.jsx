import React from 'react'
import { formatToLocalTime, iconUrlFromCode } from '../services/weather'
import DailyForcast from '../routes/HourlyForcast';
import {Link} from "react-router-dom";

const Forecast = ({title,items}) => {
    console.log(items);
  return (
    <div>
        <div className='flex items-center justify-start mt-6 p-2'>
            <p className='text-white uppercase font-medium'>{title} Forecast</p>
        </div>
        <hr className='my-2'/>

        <div className='flex flex-row items-center justify-between text-white'>
        {
            items.map((item)=>{
                return(
                        <div className='flex flex-col items-center justify-center m-2'>
                            <p className='font-light text-1xl'>{item.title}</p>
                            <img className="w-15 my-1" src={iconUrlFromCode(item.icon)} alt=""/>
                            <p className='text-2xl'>{`${item.temp.toFixed()}°`}</p>
                        </div>
                )
            })
        }
        
        </div>
        
    </div>
  )
}

export default Forecast