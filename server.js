require('dotenv').config();
const express = require('express');
const app = express();
const weatherX = require( './data/weather.json' );


const PORT = process.env.PORT || 3001;

app.listen( PORT, ()=> console.log(`server is listening on port: ${PORT}`));

app.get( '/weatherX', ( request, response ) => {

  // let city = weatherX.city_name;
  // let lat = weatherX.lat;
  // let lon = weatherX.lon;

  let dailyForcast = weatherX.data.map( element => new DailyForcast( element.weather.description, element.valid_date));

  response.json(dailyForcast);
} );

class DailyForcast {
  constructor(description, date){
    this.description = description;
    this.date = date;
  }
}
