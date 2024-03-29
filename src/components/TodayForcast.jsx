import React, { useEffect, useRef, useState } from 'react'

export default function TodayForcast({ forecast, error, icon, data, fernhite, celsiusToFahrenheit }) {

    // This block of code is used to limit the data in today forecast
    const [list, setList] = useState();
    useEffect(() => {
        if (forecast) {
            const limitedList = forecast.list.slice(0, 14);
            setList(limitedList);
        }
    }, [forecast]);

    //console.log(list);

    // This code is used to format time come from API
    function formatTime(time) {                                         // wrong way to use it because it get called every time, insted define it on inside map
        const date = new Date(time * 1000);
        const formattedTime = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: false });
        const [hours, minutes] = formattedTime.split(':')
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${formattedTime} ${ampm}`;
    }

    // Random value for UV or Air Quality - If you want you can use another API
    const RandomAQI= () => {
        const randomNumber = Math.floor(Math.random() * (250 - 150 + 1)) + 150;
        const quality = randomNumber >= 200 ? "Poor" : "Good";
        return `${randomNumber} ${quality}`;
    }

    const RandomUV = () => {
        const randomNumber = Math.random() * 5;
        const quality = randomNumber > 3 ? "High" : "Low";
        const num = parseFloat(randomNumber.toFixed(1)); 
        return `${num} ${quality}`;
      };


    return (
        <div className='p-3'>
            <div className="forcast flex flex-col bg-slate-900 rounded-lg p-3 mb-3">
                <h1 className=' text-gray-600 font-medium pl-3'>Today Forcast</h1>
                <div className='flex items-center text-center gap-5 p-3 text-white overflow-scroll overflow-y-hidden no-scrollbar '>
                    {
                        list ?
                            list.map((day, key) => (
                                <div key={key} className={`${key < list.length - 1 ? 'border-r-2 pr-5 border-gray-700' : ''}`}>
                                    <h3 className='text-sm text-gray-400 font-medium mb-3'>{formatTime(day.dt)}</h3>
                                    <div className='text-center min-[600px]:w-[6vw] h-[15vh] min-[320px]:w-[15vw] flex items-center '>
                                        <img src={icon[day.weather[0].icon]} alt="night" className='h-[10vh]' />
                                    </div>
                                    <h3 className='font-semibold text-sm mb-2 text-gray-300'>{day.weather[0].main}</h3>

                                    <h3 className="text-lg font-semibold">{day ? fernhite ? celsiusToFahrenheit(day.main.temp) : parseInt(day.main.temp) : "-.-"}°</h3>
                                </div>
                            ))
                            : <div className='border-r-2 pr-5 border-gray-700'>
                                <h3 className='text-sm text-gray-400 font-medium mb-3'></h3>
                                <div className='text-center w-[6vw] h-[15vh] flex items-center '></div>
                                <h3 className='font-semibold text-sm mb-2 text-gray-300'></h3>

                                <h3 className="text-lg font-semibold">°</h3>
                            </div>
                    }
                </div>
            </div>

            <div className='conditions flex flex-col rounded-lg p-3'>
                <h1 className='mb-5 text-gray-500 font-semibold pl-3'>Air Conditions</h1>
                <div className='min-[320px]:text-sm'>
                    <div className='flex min-[320px]:justify-between min-[600px]:justify-evenly mb-5'>
                        <div className='text-center bg-slate-900 p-5 h-[9rem] min-[600px]:w-[15rem] min-[320px]:w-[37vw] rounded-lg'>
                            <div className='flex justify-center items-center gap-2 p-2'>
                                <img src="./air/wind.svg" alt="Wind Speed" className='h-[5vh]' />
                                <h3 className=' text-gray-400 font-medium text-xl '>Wind</h3>
                            </div>
                            <h2 className="text-2xl font-semibold min-[320px]:text-xl ">{data ? data.wind.speed : "-.-"} m/s</h2>
                        </div>

                        <div className='text-center bg-slate-900 p-5 h-[9rem] min-[600px]:w-[15rem] min-[320px]:w-[37vw] rounded-lg'>
                            <div className='flex justify-center items-center gap-2 p-2 '>
                                <img src="./air/visibility.svg" alt="Visibility" className='h-[5vh]' />
                                <h3 className=' text-gray-400 font-medium text-xl'>Visibility</h3>
                            </div>
                            <h2 className="text-2xl font-semibold min-[320px]:text-xl">{data ? parseInt(data.visibility / 1000) : "-.-"} Km/h</h2>
                        </div>
                    </div>

                    <div className='flex min-[320px]:justify-between min-[600px]:justify-evenly mb-5'>
                        <div className='text-center bg-slate-900 p-5 h-[9rem] min-[600px]:w-[15rem] min-[320px]:w-[37vw] rounded-lg'>
                            <div className='flex justify-center items-center gap-2 p-2'>
                                <img src="./air/air.svg" alt="Humidity" className='h-[5vh]' />
                                <h3 className=' text-gray-400 font-medium text-xl'>Humidity</h3>
                            </div>
                            <h2 className="text-2xl font-semibold min-[320px]:text-xl">{data ? data.main.humidity : "-.-"} %</h2>
                        </div>

                        <div className='text-center bg-slate-900 p-5 h-[9rem] min-[600px]:w-[15rem] min-[320px]:w-[37vw] rounded-lg'>
                            <div className='flex justify-center items-center gap-2 p-2'>
                                <img src="./air/pressure.svg" alt="Pressure" className='h-[5vh]' />
                                <h3 className=' text-gray-400 font-medium text-xl '>Pressure</h3>
                            </div>
                            <h2 className="text-2xl font-semibold min-[320px]:text-xl">{data ? data.main.pressure : "-.-"} hPa</h2>
                        </div>
                    </div>

                    <div className='flex min-[320px]:justify-between min-[600px]:justify-evenly '>
                        <div className='text-center bg-slate-900 p-5 h-[9rem] min-[600px]:w-[15rem] min-[320px]:w-[37vw] rounded-lg'>
                            <div className='flex justify-center items-center gap-2 p-2'>
                                <img src="./air/UV.svg" alt="Humidity" className='h-[5vh]' />
                                <h3 className=' text-gray-400 font-medium text-xl'>UV</h3>
                            </div>
                            <h2 className="text-2xl font-semibold min-[320px]:text-xl">{data ? RandomUV() : "-.-"}</h2>
                        </div>

                        <div className='text-center bg-slate-900 p-5 h-[9rem] min-[600px]:w-[15rem] min-[320px]:w-[37vw] rounded-lg'>
                            <div className='flex justify-center items-center gap-2 p-2'>
                                <img src="./air/AQI.svg" alt="Pressure" className='h-[5vh]' />
                                <h3 className=' text-gray-400 font-medium text-xl '>AQI</h3>
                            </div>
                            <h2 className="text-2xl font-semibold min-[320px]:text-xl">{data ? RandomAQI() : "-.-"}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
