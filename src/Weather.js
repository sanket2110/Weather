import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [location, setLocation] = useState(""); 
  const [weatherData, setWeatherData] = useState(null); 
  const [error, setError] = useState(null); 

  const apiKey = "5929f060682499490a44d99f39cd81dd"; 
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  
  const defaultLocation = "New York";

  
  const fetchWeatherData = (location) => {
    axios
      .get(`${apiUrl}?q=${location}&appid=${apiKey}&units=metric`)
      .then((response) => {
        setWeatherData(response.data);
        setError(null); 
      })
      .catch((err) => {
        setError("Location not found. Please try again.");
        setWeatherData(null); 
      });
  };

  
  useEffect(() => {
    setLocation(defaultLocation); 
    fetchWeatherData(defaultLocation); 
  }, []); 


  const handleSearch = () => {
    if (location === "") return;
    fetchWeatherData(location); 
  };

  const getIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}.png`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleTimeString();
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Time: {formatTime(weatherData.dt)}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <img
            src={getIconUrl(weatherData.weather[0].icon)}
            alt={weatherData.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default Weather;