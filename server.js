require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const weather = require( './data/weather.json' );
// const { response } = require('express');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.get( '/weather', ( request, response ) => {
  // pass params from front end for lat and lon based on city searched
  // setup consts for superagent
  // const requestedQuery = request.query
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
      // console.log('ln26 results.body.data: ', results.body.data); gives an array of day objects
      response.status(200).send(results.body.data.map( day => new DailyForecast( day.weather.description, day.valid_date )));
    }
    ).catch( error => {
      console.log(error);
    });
});

class DailyForecast {
  constructor(description, date){
    this.description = description;
    this.date = date;
  }
}
// function handleErrors(){
//   response.status(500).send('internal error');
// }

app.listen( PORT, ()=> console.log(`server is listening on port: ${PORT}`));

// response.status(200).send(queryResult.body.results.map( day => {
//   new DailyForcast( day.weather.description, day.valid_date );
// }));

// }).catch(error => {
//   handleErrors(error, response);
// });
// let dailyForcast = weather.data.map( element => new DailyForcast( element.weather.description, element.valid_date));
// response.json(dailyForcast);
// queryResult => {response.status(200).send(queryResult.body.data.map(
//   day => {new DailyForcast(day.weather.description, day.valid_date);
//   }));})
