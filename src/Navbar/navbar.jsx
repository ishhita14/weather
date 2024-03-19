import React from 'react';
import './navbar.css'; // Import CSS file for styling
import { FaSearch } from 'react-icons/fa'; // Import search icon from react-icons library

const WeatherNavbar = () => {
  return (
    <nav className="weather-navbar">
      <div className="weather-navbar-container">
        <h1 className="weather-navbar-logo">
          <i className="fas fa-sun"></i> AUTOMATIC WEATHER MONITORING STATION
        </h1>
        <form className="search-form">
          <input type="text" placeholder="Customise your report " />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default WeatherNavbar;
