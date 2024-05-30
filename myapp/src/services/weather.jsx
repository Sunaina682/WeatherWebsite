import axios from "axios";
import {DateTime} from 'luxon';

const API_KEY="1fa9ff4126d95b8db54f3897a208e91c";
const BASE_URL="https://api.openweathermap.org/data/2.5";
// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric



const getWeatherdata=async(infoType,searchParams)=>{
    const url=new URL(BASE_URL+'/'+infoType);
    url.search=new URLSearchParams({...searchParams,appid:API_KEY});

    const response=await axios.get(url);
    return response.data;
}


const formatCurrentWeather=((data)=>{
    const {
        coord:{lat,lon},
        main:{feels_like,humidity,temp,temp_max,temp_min},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed}
    }=data;

    const {main:details,icon}=weather[0];

    return {lat,lon,feels_like,humidity,temp,temp_max,temp_min,name,details,icon,dt,country,sunrise,sunset,speed};
})



const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    
    if (!daily || !hourly) {
        return { timezone, daily: [], hourly: [] };
    }
    
    daily = daily.slice(1,6).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "cccc"),
        temp: d.temp.day,
        icon: d.weather[0].icon,
      };
    });
  
    hourly = hourly.slice(1,6).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
        temp: d.temp,
        icon: d.weather[0].icon,
      };
    });
    
    return { timezone, daily, hourly };
};

  

const formatToLocalTime=(secs,zone,format="cccc, dd LLL yyyy' | Local time:'hh:mm a")=>{
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
}

const getFormattedData=async(searchParams)=>{
    const formattedCurrentData=await getWeatherdata("weather",searchParams).then(data=>formatCurrentWeather(data));
    console.log(formattedCurrentData);

    const {lat,lon}=formattedCurrentData;
    

    const formatedForecastWeather=await getWeatherdata("onecall",{
        lat,lon,exclude:'current,minutely,alerts',units:searchParams.units
    }).then(data=>formatForecastWeather(data));

    return {...formattedCurrentData,...formatedForecastWeather};
}

const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedData;
export {formatToLocalTime,iconUrlFromCode};
