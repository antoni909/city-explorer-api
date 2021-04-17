const superagent = require('superagent');

class DailyForecast {
  constructor(description, date){
    this.description = description;
    this.date = date;
  }
}

function getWeather(request,response){
  const query = {
    lat: request.query.lat,
    lon: request.query.lon,
    key : process.env.REACT_APP_WEATHER_API_KEY,
  };
  const url = `http://api.weatherbit.io/v2.0/forecast/daily`;
  superagent
    .get(url)
    .query(query)
    .then( results => {
      response.status(200).send(results.body.data.map( day => new DailyForecast( day.weather.description, day.valid_date )));
    }
    ).catch( error => {
      response.status(500).send('internal error', error);
    });
}

// node syntax for what we are exporting
module.exports = getWeather;
