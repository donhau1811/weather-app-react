import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  key: "f903705c5322278d9d8adc72ea844667",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      //Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(
            <div className="infor-weather">
              <div className="city">
                {data.name}, {data.sys.country}
              </div>
              <div className="description">
                Feel like {data.main.feels_like}℃.{" "}
                {data.weather[0].description.charAt(0).toUpperCase() +
                  data.weather[0].description.slice(1)}{" "}
              </div>
              <div className="templature">
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt=""
                />
                <div>{data.main.temp}℃</div>
              </div>
            </div>
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  return (
    <div className="weather-app">
      <form onSubmit={handleSubmit}>
        <input className='input'
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="myButton">Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
      </div>
  );
}

export default App;
