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

app.get( '/weather-data', ( request, response ) => {
  return response.send( weatherX );
} );
