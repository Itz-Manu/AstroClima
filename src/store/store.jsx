import create from 'zustand';
import conf from './conf';

export const useWeatherStore = create((set) => ({
    weatherData: null,
    errorMessage: null,
    forecastData: null,

    fetchWeatherData: (city, latitude, longitude) => {
        const apiKey = conf.weatherKey;
        
        let apiUrl;
        let todayForecast;

        if (city) {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            todayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&excluded=hour&appid=${apiKey}&units=metric`
        }else if (latitude && longitude) {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            todayForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&excluded=hour&appid=${apiKey}&units=metric`
        }else {
            throw new Error("Invalid parameters for fetching weather data.");
        }

        const weatherPromise = fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });

        const forecastPromise = fetch(todayForecast)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });


        return Promise.all([weatherPromise, forecastPromise])
            .then(([weatherData, forecastData]) => {
                set({
                    weatherData,
                    forecastData,
                    errorMessage: null,
                });
                return { weatherData, forecastData };
            })
            .catch((error) => {
                set({
                    weatherData: null,
                    forecastData: null,
                    errorMessage: `Error: ${error.message}`,
                });
                throw error;
            });
    },
}));

export default useWeatherStore;