import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('New York');  // Default location
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // OpenWeatherMap API key (sign up for free at https://openweathermap.org/api)
  const apiKey = '5929f060682499490a44d99f39cd8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  // Fetch weather data
  useEffect(() => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch weather data.');
        setLoading(false);
      });
  }, [location]);

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);  // Clean up the interval on component unmount
  }, []);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter a city"
        />
      </div>

      <div>
        <h2>Current Time: {time}</h2>
      </div>

      {loading && <p>Loading weather data...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
