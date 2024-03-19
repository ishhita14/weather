import React from 'react';

const WeatherTab = ({ title, data }) => {
  return (
    <div className="weather-tab">
      <h5>{title}</h5>
      <div className='parameterValue'>
        <p>{data}</p>
      </div>
      
    </div>
  );
};

export default WeatherTab;
