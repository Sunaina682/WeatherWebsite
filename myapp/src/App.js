import React, { useEffect, useState } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedData from './services/weather';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import HourlyForcast from './routes/HourlyForcast';

const App = () => {

  const [query,setQuery]=useState({q:"berlin"});
  const [units,setUnits]=useState('metric');
  const [weather,setWeather]=useState(null);

  useEffect(()=>{
    
    const fetchData=async()=>{

      await getFormattedData({...query,units}).then((data)=>{
        setWeather(data);
      });
    }
  
    fetchData();

  },[query,units]);

  // https://img.freepik.com/free-photo/aerial-view-mountain-covered-fog-beautiful-pink-sky_181624-4676.jpg?w=826&t=st=1716974850~exp=1716975450~hmac=77a1516ec8970ed4b055ac2fc94deea5714e51bb32b2a00bc9481f17be8528e4
  // const formatBackgroundImage=()=>{
  //   if(!weather){
  //     return "https://img.freepik.com/free-photo/beautiful-shot-high-white-hilltops-mountains-covered-fog_181624-545.jpg?w=826&t=st=1716974750~exp=1716975350~hmac=8e3c64e316e29362d4d1450a1412e62fa08c9a6a4615a348dc68bdc2b872eae5";
  //   }

  //   const threshold=units=="metric" ? 20:60;

  //   if(weather.temp<=threshold){
  //     return "https://img.freepik.com/free-photo/beautiful-shot-high-white-hilltops-mountains-covered-fog_181624-545.jpg?w=826&t=st=1716974750~exp=1716975350~hmac=8e3c64e316e29362d4d1450a1412e62fa08c9a6a4615a348dc68bdc2b872eae5";
  //   }
  //   else{
  //     return "https://img.freepik.com/free-photo/aerial-view-mountain-covered-fog-beautiful-pink-sky_181624-4676.jpg?w=826&t=st=1716974850~exp=1716975450~hmac=77a1516ec8970ed4b055ac2fc94deea5714e51bb32b2a00bc9481f17be8528e4"
  //   }
  // }

  return (
    <Router>
      <div className="max-auto max-w-screen mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400" style={{backgroundImage: 'url("https://img.freepik.com/free-photo/beautiful-shot-high-white-hilltops-mountains-covered-fog_181624-378.jpg?w=826&t=st=1716975527~exp=1716976127~hmac=ce50111b9f3f505cc508c1b8df825a8878f00020d7b30adfb83285c6f4fc3ea1")',backgroundRepeat: 'no-repeat',backgroundSize: 'cover', backdropFilter: 'blur(25px)'}} >
        <TopButtons setQuery={setQuery}/>
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

        {
          weather && (
            <div>
              <TimeAndLocation weather={weather}/>
              <TemperatureAndDetails weather={weather}/>
              
              <div className='bg-black bg-opacity-50 p-1 rounded-lg'>
                <Forecast title="Daily" items={weather.daily}/> 
                  <Routes>
                    <Route path="/Daily" element={<HourlyForcast weather={weather}/>}/>
                  </Routes>

                  {!window.location.pathname.includes("/daily") && (
                    <Link to="/daily" className='text-white'>Hourly Forecast</Link>
                  )}

              </div>

             
             
            </div>
          )
        }  
      </div>
    </Router>
  )
}

export default App
