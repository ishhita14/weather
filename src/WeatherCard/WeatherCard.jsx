import React, { useState, useEffect } from 'react';
import WeatherTab from './WeatherTab';
import './WeatherCard.css';
import { fetchWeatherApi } from 'openmeteo'; // Import fetchWeatherApi from openmeteo

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTabs, setShowTabs] = useState(false);
  const [buttonIcon, setButtonIcon] = useState('▶');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          "latitude": 30.7726,
          "longitude": 79.4953,
          "hourly": ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "precipitation_probability", "cloud_cover", "visibility", "wind_speed_180m"]
        };

        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        // Process the response
        const response = responses[0];
        setWeatherData(response.hourly());
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTabs = () => {
    setShowTabs(!showTabs);
    setButtonIcon(showTabs ? '▶' : '▼' );
  };
  
  return (
    <div className="weather-card">
      {isLoading && <p>Loading weather data...</p>}
      {error && <p>Error fetching weather data: {error.message}</p>}
      {weatherData && (
        <div>
            <button onClick={toggleTabs}> {buttonIcon} </button>
            <h3>Current Conditions</h3>
            {showTabs && (
              <div className='tabs-container'>
                <WeatherTab title="Temperature (°C)" data={`${weatherData.variables(0)?.valuesArray()?.[0].toFixed(2)}`} />
            <WeatherTab title="Humidity (%)" data={`${weatherData.variables(1)?.valuesArray()?.[0].toFixed(1)}`} />
            <WeatherTab title="Precipitation (%)" data={`${weatherData.variables(3)?.valuesArray()?.[0].toFixed(1)}`} />
            <WeatherTab title="Dew Point (°C)" data={`${weatherData.variables(2)?.valuesArray()?.[0].toFixed(2)}`} />
            <WeatherTab title="Cloud Cover (%)" data={`${weatherData.variables(4)?.valuesArray()?.[0].toFixed(1)}`} />
            <WeatherTab title="Wind Speed (Km/Hr)" data={`${weatherData.variables(6)?.valuesArray()?.[0].toFixed(2)}`} />
            <WeatherTab title="Visibility (m)" data={`${weatherData.variables(5)?.valuesArray()?.[0].toFixed(1)} `} />
              </div>
              
            ) }
            
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
