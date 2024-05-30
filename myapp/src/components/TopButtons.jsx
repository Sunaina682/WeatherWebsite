import React from 'react'

const TopButtons = ({setQuery}) => {
    
    const cities=[
        {
            id:1,
            title:"Rome"
        },
        {
            id:2,
            title:"Sydney"
        },
        {
            id:3,
            title:"Paris"
        },
        {
            id:4,
            title:"Moscow"
        },
        {
            id:5,
            title:"Tokyo"
        }
    ];

  return (
    <div className='flex items-center justify-around my-6'>
        {cities.map((city)=>(
                <button key={city.id} className='text-black text-lg font-medium' 
                onClick={()=>setQuery({q:city.title})}
                >{city.title}</button>
            ))}
    </div>
  )
}

export default TopButtons;