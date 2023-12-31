import React, { useEffect, useState } from 'react'
import L from 'leaflet';
import Map from './Map';

export default function SunMove({ data, error }) {

    const [position, setPosition] = useState(0);

    // This code is used to format time come from API
    function timeEval(time) {
        const suntime = new Date(time * 1000);
        const sunmoveement = suntime.toLocaleTimeString();
        const [hours, minutes] = sunmoveement.split(':');
        return `${hours}:${minutes}`;
    }

    let currentTime = data ? timeEval(data.dt) : "1";
    let sunriseTime = data ? timeEval(data.sys.sunrise) : "1";
    let sunsetTime = data ? timeEval(data.sys.sunset) : "1";


    // This block of code is responsible for sun movement
    useEffect(() => {
        if (data) {
            const calculatePosition = () => {
                const sunrise = new Date(data.sys.sunrise * 1000).getTime();
                const sunset = new Date(data.sys.sunset * 1000).getTime();
                const currentTime = new Date(data.dt * 1000).getTime();

                const totalDaytime = sunset - sunrise;
                const elapsedTime = currentTime - sunrise;

                const newPosition = (elapsedTime / totalDaytime) * 100;
                setPosition(newPosition);
            };

            calculatePosition();

            // Update position every minute
            const interval = setInterval(calculatePosition, 60000);

            return () => clearInterval(interval);
        }
    }, [data]);


    return (
        <div className='p-3 flex flex-col gap-5'>
            <div className='bg-slate-900 rounded-lg p-3'>
                <div className='icon flex justify-between px-3'>
                    <div className=''>
                        <img src="./air/sunrise.svg" alt="sunrise" className='h-[4vh]' />
                    </div>
                    <div>
                        <img src="./air/sunset.svg" alt="sunset" className='h-[4vh]' />
                    </div>
                </div>

                <div className='movement h-[13vh] overflow-hidden p-3'>
                    <div className='border-t-2 rounded-full h-[50vh] relative mt-5 border-slate-500 shadow-2xl shadow-slate-100'>
                        {parseInt(currentTime) > parseInt(sunriseTime) ? (
                            <div className={`absolute w-14 h-14 rounded-full top-[-5px] min-[600px]:left-24 min-[320px]:left-20 transform translate-x-1/2 -translate-y-1/2 transition-all duration-1000`}>
                                <img src="./air/Moon.svg" alt="moon" />
                            </div>
                        ) : (
                            <div className={`absolute w-14 h-14 rounded-full ${position > 50 ? 'top-8 right-16' : position > 25 ? "top-0 left-28" : 'top-6 left-5'} transform translate-x-1/2 -translate-y-1/2 transition-all duration-1000 `}>
                                <img src="./air/Sun.svg" alt="sun" />
                            </div>
                        )}
                    </div>
                </div>

                <div className='time flex justify-between text-sm p-3 text-center'>
                    <div className='sunrise'>
                        <h3 className='text-gray-400'>Sunrise</h3>
                        <h3 className='font-semibold'>{data ? sunriseTime : "-.-"}</h3>
                    </div>
                    <div className='sunset'>
                        <h3 className='text-gray-400'>Sunset</h3>
                        <h3 className='font-semibold'>{data ? sunsetTime : "-.-"}</h3>
                    </div>
                </div>
            </div>

            <div className='map mt-5'>
                <div className="map bg-slate-900 h-[40vh] md:w-[25vw] overflow-hidden rounded-md flex justify-center items-center text-gray-500">
                    {data ? (
                        <Map latitude={data.coord.lat} longitude={data.coord.lon} />
                    ) : (
                        'Your Location...'
                    )}
                </div>
            </div>
        </div>

    )
}
