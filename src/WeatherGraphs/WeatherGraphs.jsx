import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import './graph.css'

const WeatherGraphs = () => {
  const [temperatureData, setTemperatureData] = useState(null);
  const [precipitationData, setPrecipitationData] = useState(null);
  const [humidityData, setHumidityData] = useState(null);
  const [cloudCoverData, setCloudCoverData] = useState(null);
  const [surfacePressureData, setSurfacePressureData] = useState(null);
  const [windSpeedData, setWindSpeedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGraphs, setShowGraphs] = useState(false);
  const [buttonIcon, setButtonIcon] = useState('▶');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temperatureUrl = "https://archive-api.open-meteo.com/v1/archive?latitude=30.7726&longitude=79.4953&start_date=2024-02-13&end_date=2024-02-27&hourly=temperature_2m";
        const temperatureResponse = await fetch(temperatureUrl);
        if (!temperatureResponse.ok) {
          throw new Error('Failed to fetch temperature data');
        }
        const temperatureData = await temperatureResponse.json();

        const precipitationUrl = "https://archive-api.open-meteo.com/v1/archive?latitude=30.7726&longitude=79.4953&start_date=2024-02-13&end_date=2024-02-27&hourly=precipitation";
        const precipitationResponse = await fetch(precipitationUrl);
        if (!precipitationResponse.ok) {
          throw new Error('Failed to fetch precipitation data');
        }
        const precipitationData = await precipitationResponse.json();

        const humidityUrl = "https://archive-api.open-meteo.com/v1/archive?latitude=30.7726&longitude=79.4953&start_date=2024-02-13&end_date=2024-02-27&hourly=relative_humidity_2m";
        const humidityResponse = await fetch(humidityUrl);
        if (!humidityResponse.ok) {
          throw new Error('Failed to fetch humidity data');
        }
        const humidityData = await humidityResponse.json();

        const cloudCoverUrl = "https://archive-api.open-meteo.com/v1/archive?latitude=30.7726&longitude=79.4953&start_date=2024-02-13&end_date=2024-02-27&hourly=cloud_cover";
        const cloudCoverResponse = await fetch(cloudCoverUrl);
        if (!cloudCoverResponse.ok) {
          throw new Error('Failed to fetch cloud cover data');
        }
        const cloudCoverData = await cloudCoverResponse.json();

        const surfacePressureUrl = "https://archive-api.open-meteo.com/v1/archive?latitude=30.7726&longitude=79.4953&start_date=2024-02-13&end_date=2024-02-27&hourly=surface_pressure";
        const surfacePressureResponse = await fetch(surfacePressureUrl);
        if (!surfacePressureResponse.ok) {
          throw new Error('Failed to fetch surface pressure data');
        }
        const surfacePressureData = await surfacePressureResponse.json();

        const windSpeedUrl = "https://archive-api.open-meteo.com/v1/archive?latitude=30.7726&longitude=79.4953&start_date=2024-02-13&end_date=2024-02-27&hourly=wind_speed_100m";
        const windSpeedResponse = await fetch(windSpeedUrl);
        if (!windSpeedResponse.ok) {
          throw new Error('Failed to fetch wind speed data');
        }
        const windSpeedData = await windSpeedResponse.json();

        setTemperatureData(temperatureData);
        setPrecipitationData(precipitationData);
        setHumidityData(humidityData);
        setCloudCoverData(cloudCoverData);
        setSurfacePressureData(surfacePressureData);
        setWindSpeedData(windSpeedData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleGraphs = () => {
    setShowGraphs(!showGraphs);
    setButtonIcon(showGraphs ? '▶' : '▼' );
  };

  return (
    <div className="graph-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {(temperatureData && precipitationData && humidityData && cloudCoverData && surfacePressureData && windSpeedData) && (
        <div>
        <button onClick={toggleGraphs}> {buttonIcon} </button>
        <h3>Historical Weather Data</h3>
        {showGraphs && (
          <div className="graphs-wrapper">
          <div className="graph">
            <Graph
              id="temperatureChart"
              labels={temperatureData.hourly.time}
              data={temperatureData.hourly.temperature_2m}
              label="Temperature (°C)"
              color="255, 99, 132"
            />
          </div>
          <div className="graph">
            <Graph
              id="precipitationChart"
              labels={precipitationData.hourly.time}
              data={precipitationData.hourly.precipitation}
              label="Precipitation (mm)"
              color="54, 162, 235"
            />
          </div>
          <div className="graph">
            <Graph
              id="humidityChart"
              labels={humidityData.hourly.time}
              data={humidityData.hourly.relative_humidity_2m}
              label="Relative Humidity (%)"
              color="75, 192, 192"
            />
          </div>
          <div className="graph">
            <Graph
              id="cloudCoverChart"
              labels={cloudCoverData.hourly.time}
              data={cloudCoverData.hourly.cloud_cover}
              label="Cloud Cover (%)"
              color="255, 206, 86"
            />
          </div>
          <div className="graph">
            <Graph
              id="surfacePressureChart"
              labels={surfacePressureData.hourly.time}
              data={surfacePressureData.hourly.surface_pressure}
              label="Surface Pressure (hPa)"
              color="153, 102, 255"
            />
          </div>
          <div className="graph">
            <Graph
              id="windSpeedChart"
              labels={windSpeedData.hourly.time}
              data={windSpeedData.hourly.wind_speed_100m}
              label="Wind Speed (m/s)"
              color="255, 159, 64"
            />
          </div>
        </div>
        )}
        </div>
      )}
    </div>
  );
};

export default WeatherGraphs;
