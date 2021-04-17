require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const {response} = require('express');
// const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3001;
const getWeather = require('./handlers/weather');
const getMovies = require('./handlers/movies');
app.use(cors());

app.get('/weather', getWeather);
app.get('/movies', getMovies);

app.listen( PORT, ()=> console.log(`server is listening on port: ${PORT}`));
