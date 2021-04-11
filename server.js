// place here: require imports
require('dotenv').config();
const express = require('express');
const app = express();
const weatherX = require( './data/weather.json' );

// env port is 3002, safety is 3001
const PORT = process.env.PORT || 3001;

// run npm start on terminal to see if port is being listened to
// terminal will return(above console log): "server is listening on port: 3001"
app.listen( PORT, ()=> console.log(`server is listening on port: ${PORT}`));

// the adding the '/' root path, will allow the server to get the response via the '/' assigned root path and should render the following response.send() console log
// app.get( '/', ( request, response ) => {
//   return response.send( 'I am the server and here is your app.get() response: hi :)' );
// } );

// Create an API endpoint of `/weather` that processes a `GET` request that contains `lat` and `lon` information.

app.get( '/weatherX', ( request, response ) => {
  // console.log(weatherX.lat, weatherX.lon);
  let city = weatherX.city_name;
  let lat = weatherX.lat;
  let lon = weatherX.lon;

  let dailyForcast = weatherX.data.map( element => new DailyForcast( element.weather.description, element.valid_date));

  response.json(dailyForcast);
} );

class DailyForcast {
  constructor(description, date){
    this.description = description;
    this.date = date;
  }
}
