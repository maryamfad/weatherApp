const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());

const apiKey = "13e3321f56a24b71b30221424230308";
const weatherApiUrl = "http://api.weatherapi.com/v1/current.json";

app.get("/weather/:city", (req, res) => {
  const city = req.params.city;
  axios
    .get(weatherApiUrl, {
      params: {
        q: city,
        Key: apiKey,
        aqi: "no",
      },
    })
    .then((response) => {
      const weatherData = response.data;
      res.json(weatherData);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error.message);
      res.status(500).json({ error: "Something went wrong" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
