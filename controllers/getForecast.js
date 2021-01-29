import fetch from "node-fetch";

const getForecast = (req, res) => {
  const lat = req.body.lat;
  const long = req.body.long;
  fetch(`https://api.weatherapi.com/v1/forecast.json?q=${lat},${long}&days=5`, {
    headers: {
      key: process.env.API_KEY,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to reach api"));
};

export default getForecast;
