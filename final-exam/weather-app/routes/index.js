var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();
var fs = require('fs')

const API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'; // 1 day
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'; // 5 day

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

/* GET weather data */
router.get('/weather', async function(req, res, next) {
  try {
    // Check each radio button & the form
    const { city, unit, forecast } = req.query
    if (!city) {
      return res.redirect('/')
    }

    // Choose API URL based on type
    let apiUrl
    if (forecast === 'fiveday') {
      apiUrl = FORECAST_URL
    } else {
      apiUrl = WEATHER_URL
    }
    
    // API Request
    const response = await axios.get(apiUrl, {
      params: {
        q: city,
        appid: API_KEY,
        units: unit
      }
    });

    // Choose unit of temp based on forecast type
    let tempUnit;
    if (unit === 'imperial') {
      tempUnit = '°F';
    } else {
      tempUnit = '°C';
    }
    
    // Choose which page to show based on forecast type
    let template;
    if (forecast === 'fiveday') {
      template = 'show-forecast';
    } else {
      template = 'show-weather';
    }

    // save response to check how to put data on page
    fs.mkdir("./weather-response", (err) => {
      if (err) console.log("no folder made");
      else {
          fs.writeFileSync("./weather-response/response.json", JSON.stringify(response.data), (err) => {
            if (err) console.log("cannot write response")
          })
      }
    })

    // finally show appropriate page
    res.render(template, { 
      weather: response.data,
      tempUnit: tempUnit
    });

  } catch (error) {
    // No city of that name, go back
    if (error.response && error.response.status === 404) {
      res.render('error', {
        message: 'City not found',
        error: { status: 404, stack: 'Please check the city name and try again' }
      });
    } else {
      next(error);
    }
  }
});

module.exports = router;
