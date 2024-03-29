
import React, { useEffect, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import Weather from './components/Weather';
import Weeks from './components/Weeks';
import TodayForcast from './components/TodayForcast';
import { useWeatherStore } from './store/store';
import SunMove from './components/SunMove';
import { FaGithub } from "react-icons/fa";


function App() {
  const { fetchWeatherData, weatherData, errorMessage, forecastData } = useWeatherStore();

  const [isActive, setIsActive] = useState(false);        // For ferenhite btn
  const [location, setLocation] = useState(null);         // for user Location

  // this code use to fetch data
  const inputRef = useRef();
  const inputRefMobile = useRef()

  const handleInputChange = () => {
    let newCity;
    if (inputRef.current.value) {
      newCity = inputRef.current.value;
      inputRef.current.value = '';
    } else {
      newCity = inputRefMobile.current.value;
      inputRefMobile.current.value = '';
    }

    fetchWeatherData(newCity)
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleInputChange();
    }
  };


  // this code is for switch to fheranhite 
  const handleButtonClick = () => {
    setIsActive(!isActive);
  };

  function celsiusToFahrenheit(celsius) {
    const fahrenheit = (celsius * 9 / 5) + 32;
    return parseInt(fahrenheit);
  }


  // This code is used to fetch user location 
  useEffect(() => {
    if (navigator.geolocation) {
      // Ask for location permission
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);


  // This code is used fetch data according the user location
  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      fetchWeatherData(null, latitude, longitude);
    }
  }, [location]);


  // These are the icon used in the app
  const weatherIcon = {
    "01d": "./day/clear-sky-1d.svg",
    "02d": "./day/few-cloud-2d.svg",
    "03d": "./day/full-cloudy-3d-4d.svg",
    "04d": "./day/full-cloudy-3d-4d.svg",
    "09d": "./day/shower-rain-9d.svg",
    "10d": "./day/rain-10d.svg",
    "11d": "./day/rainy-thnderstorm-11d.svg",
    "13d": "./day/snow-13d.svg",
    "50d": "./day/mist-50d.svg",

    "01n": "./night/clear-sky-1n.svg",
    "02n": "./night/few-cloud-2n.svg",
    "03n": "./night/full-cloudy-3n-4n.svg",
    "04n": "./night/full-cloudy-3n-4n.svg",
    "09n": "./night/shower-rain-9n.svg",
    "10n": "./night/rain-10n.svg",
    "11n": "./night/rainy-thnderstorm-11n.svg",
    "13n": "./night/snow-13n.svg",
    "50n": "./night/mist-50n.svg",
  }


  return (
    <div>
      <div className="w-full relative text-white">
        <img
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
          src="bg-black.png"
          alt="night"
        />

        <div className="relative banner-section bg-blue-950  text-white">
          <div className='max-w-screen-xl flex items-center justify-between mx-auto p-2'>
            <div className="text-left">
              <p className="min-[600px]:text-base min-[320px]:text-sm">Get the latest weather updates with AstroClima!</p>
            </div>
            <div className="text-right">
              <a href="https://github.com/Itz-Manu/AstroClima"><button className='border-2 flex rounded-md gap-2 text-base p-1 px-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-400 min-[320px]:text-sm'>Github <FaGithub size="1.5em" /></button></a>
            </div>
          </div>

        </div>
        <div className="relative flex flex-col max-w-screen-xl mx-auto p-3">
          <div className="p-2 flex flex-col w-full">
            <div className="top flex justify-between items-center my-2 p-2">
              <img src="../Logo.png" alt="Logo" className="h-[30px] min-[320px]:h-[20px]" />

              <div className="flex gap-4 md:gap-10">
                <div className="bg-slate-800 p-2 md:ml-10 rounded-full w-full md:w-[30rem] flex min-[320px]:hidden min-[600px]:flex">
                  <div className="mt-1 mr-1 text-slate-600">
                    <CiSearch size="1.5em" className="ml-2" />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 rounded-md focus:outline-none bg-slate-800 "
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div className="md:relative inline-block mt-1 mr-3 ">
                  <div className={`relative flex justify-around items-center w-20 h-10 bg-gray-700 rounded-lg cursor-pointer `} onClick={handleButtonClick}>
                    {/* Thumb */}
                    <div className={`absolute p-1 top-0 left-0 w-10 h-10 bg-blue-500 rounded-lg shadow-md flex items-center justify-center transform transition-transform ${isActive ? 'translate-x-full' : 'translate-x-0'}`}>
                      <img src="../air/typ.svg" alt="temp" className="h-[5vh] " />
                    </div>
                    <h1 className="text-white font-semibold text-2xl">°C</h1>
                    <h1 className="text-white font-semibold text-2xl">°F</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-2 md:ml-10 rounded-full w-full md:w-[30rem] flex min-[320px]:flex min-[600px]:hidden">
              <div className="mt-1 mr-1 text-slate-600">
                <CiSearch size="1.5em" className="ml-2" />
              </div>
              <input
                ref={inputRefMobile}
                type="text"
                placeholder="Search..."
                className="w-full px-4 rounded-md focus:outline-none bg-slate-800 "
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="body flex flex-col md:flex-row justify-evenly">
              <div className="todaywether md:w-[45rem] mb-4 md:mb-0">
                <div className="weather">
                  <Weather data={weatherData} error={errorMessage} icon={weatherIcon} fernhite={isActive} celsiusToFahrenheit={celsiusToFahrenheit} />

                </div>

                <div className="info">
                  <TodayForcast data={weatherData} error={errorMessage} forecast={forecastData} icon={weatherIcon} fernhite={isActive} celsiusToFahrenheit={celsiusToFahrenheit} />

                </div>
              </div>

              <div className="weekwether">
                <div className="sun">
                  <SunMove data={weatherData} error={errorMessage} />

                </div>
                <div>
                  <Weeks forecast={forecastData} icon={weatherIcon} fernhite={isActive} celsiusToFahrenheit={celsiusToFahrenheit} />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
