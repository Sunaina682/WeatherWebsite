import React from 'react';
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { useState } from 'react';


const Inputs = ({setQuery,units,setUnits}) => {
    const [city,setCity]=useState("");

    const handleSearch=()=>{
        if(city!=''){
            setQuery({q:city})
        }
    }

    return (
    <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input type="text" placeholder='search for city' className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
            
            value={city}
            onChange={(event)=>{
                setCity(event.currentTarget.value);
            }}
            
        />

        <UilSearch size={25} className="text-black cursor-pointer transition ease-out hover:scale-125"
        onClick={handleSearch}
        />
        <UilLocationPoint size={25} className="text-black cursor-pointer transition ease-out hover:scale-125"/>

        <div className="flex flex-row w-1/4 items-center justify-center">
            <button
            name="metric"
            className="text-xl text-black font-light transition ease-out hover:scale-125 font-bold"
            onClick={(event)=>{
                setUnits(event.target.name)
            }}
            >
            °C
            </button>
            <p className="text-xl text-black mx-1">|</p>
            <button
            name="imperial"
            className="text-xl text-black font-light transition ease-out hover:scale-125 font-bold"
            onClick={(event)=>{
                if(units!==event.target.name){
                    setUnits(event.target.name)
                }
            }}
            >
            °F
            </button>
      </div>
    
    </div>
    
  )
}

export default Inputs