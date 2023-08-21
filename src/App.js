import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { FiWind } from "react-icons/fi";

function App() {
  const [city, setCity] = useState("Toronto");
  const [currentWeatherInfo, setCurrentWeatherInfo] = useState({});
  const [locationInfo, setLocationInfo] = useState({});
  useEffect(() => {
    getWeatherInfo();
  }, []);
  const getWeatherInfo = () => {
    axios
      .get(`http://localhost:3000/weather/${city}`)
      .then((response) => {
        const weatherData = response.data;
        setCurrentWeatherInfo(weatherData.current);
        setLocationInfo(weatherData.location);
        console.log(weatherData);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error.message);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#98B3E7",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50%",
          maxHeight: "50%",
          width: "30%",
          borderRadius: "10px",
          backgroundColor: "#F4EEEE",
          overflow: "auto",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              width: "100%",
              marginBottom: "10%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <input
              style={{
                height: "30px",
                width: "60%",
                borderWidth: "2px",
                borderRadius: "10px",
                paddingLeft: "5%",
              }}
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              style={{
                borderWidth: "2px",
                borderRadius: "10px",
                width: "15%",
                backgroundColor: "#287678",
                borderColor: "#887678",
              }}
              onClick={getWeatherInfo}
            >
              Ok
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <div>
              <div style={{ fontSize: "2rem" }}>{locationInfo.name}</div>
              <div>
                {" "}
                {locationInfo.region}, {locationInfo.country}
              </div>
            </div>
            <div style={{ width: "30%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>{currentWeatherInfo.temp_c} &deg;C</div>
                <div>{currentWeatherInfo.temp_f} &deg;F</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginTop: "10%",
                }}
              >
                <div>
                  <FiWind />
                </div>
                <div
                  style={{
                    marginLeft: "10%",
                    fontSize: "0.7rem",
                    width: "100%",
                  }}
                >
                  {currentWeatherInfo.wind_kph} kph /{" "}
                  {currentWeatherInfo.wind_mph} mph (
                  {currentWeatherInfo.wind_dir})
                </div>
              </div>
            </div>
            <img src={currentWeatherInfo.condition?.icon} alt="weather icon" />
          </div>
          <div style={{ marginTop: "15%", marginLeft: "10%" }}>
            Last update: {currentWeatherInfo.last_updated}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
