// WeatherTable.jsx
import React, { useState, useEffect } from 'react';
import './WeatherTable.css';

const WeatherTable = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTables, setShowTables] = useState(false);
  const [buttonIcon, setButtonIcon] = useState('▶');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latitude = 30.7726;
        const longitude = 79.4953;
        const hourlyParams = "temperature_2m,relative_humidity_2m,dew_point_2m,precipitation_probability,cloud_cover";
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyParams}`;
        
        const response = await fetch(url);
        const data = await response.json();

        // Check if data contains hourly forecast
        if (!data || !data.hourly) {
          throw new Error("Hourly forecast data not available");
        }

        const hourlyData = data.hourly;

        // Construct weatherData array
        const weatherData = hourlyData.time.map((time, index) => ({
          time: new Date(time),
          temperature: hourlyData.temperature_2m[index],
          precipitationProbability: hourlyData.precipitation_probability[index],
          humidity: hourlyData.relative_humidity_2m[index]
        }));

        setWeatherData(weatherData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const toggleTables = () => {
    setShowTables(!showTables);
    setButtonIcon(showTables ? '▶' : '▼' );
  };

  const firstChunk = weatherData.slice(0, 5); // First 10 rows
  const secondChunk = weatherData.slice(5, 10); // Next 10 rows
  const thirdChunk = weatherData.slice(10, 15); // Next 10 rows

  return (
    <div className="weather-table-container">
    <button onClick={toggleTables}> {buttonIcon} </button>
    <h3>Forecast</h3>
    {showTables && (
      <div className="weather-tables ">
      <div className="weather-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature (°C)</th>
              <th>Precipitation Probability (%)</th>
              <th>Relative Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            {firstChunk.map((data, index) => (
              <tr key={index}>
                <td>{data.time.toLocaleString()}</td>
                <td>{data.temperature}</td>
                <td>{data.precipitationProbability}</td>
                <td>{data.humidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="weather-table">
        {/* next ten rows */}
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature (°C)</th>
              <th>Precipitation Probability (%)</th>
              <th>Relative Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            {secondChunk.map((data, index) => (
              <tr key={index}>
                <td>{data.time.toLocaleString()}</td>
                <td>{data.temperature}</td>
                <td>{data.precipitationProbability}</td>
                <td>{data.humidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="weather-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature (°C)</th>
              <th>Precipitation Probability (%)</th>
              <th>Relative Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            {thirdChunk.map((data, index) => (
              <tr key={index}>
                <td>{data.time.toLocaleString()}</td>
                <td>{data.temperature}</td>
                <td>{data.precipitationProbability}</td>
                <td>{data.humidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )}
    
    </div>
  );
};

export default WeatherTable;
