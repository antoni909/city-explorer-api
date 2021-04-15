require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const { response } = require('express');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

class DailyForecast {
  constructor(description, date){
    this.description = description;
    this.date = date;
  }
}

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
      response.status(200).send(results.body.data.map( day => new DailyForecast( day.weather.description, day.valid_date )));
    }
    ).catch( error => {
      // console.log(error);
      response.status(500).send('internal error', error);
    });
});

// base url
// https://api.themoviedb.org/3/search/movie

// query params: api key, query
// https://api.themoviedb.org/3/search/movie?api_key=7da92528f88d7ced5a0ecd25f1d5f992&query=seattle

app.get('/movies', (request,response) => {

  // city is hardcoded need the property passed from front end
  // console.log('request.query',request.query);

  const city = 'yuma';
  const url = 'https://api.themoviedb.org/3/search/movie';
  const query = {
    api_key: process.env.REACT_APP_MOVIE_API_KEY,
    query: city,
  };

  superagent
    // .get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=seattle`)
    .get(url)
    .query(query)
    .then( dataObject => {

      // console.log('results.body: ',dataObject.body.results);

      // dataObject.body.results is an array of objects, map here
      response.status(200).send(dataObject.body.results
        .map( movie => new RelatedMovies( movie ) ));
      // response is an array of 17 objects with seven properties each
    })
    .catch( error => {
      // console.log('catch',error);
      response.status(500).send(error);
    });

} );

// Constructor function for movie API Response
function RelatedMovies(movie){
  this.description = movie.overview;
  this.popularity = movie.popularity;
  this.poster = movie.poster_path;
  this.released = movie.release_date;
  this.title = movie.original_title;
  this.votesTotal = movie.vote_count;
  this.voteAverage = movie.vote_average;
}

// listener
app.listen( PORT, ()=> console.log(`server is listening on port: ${PORT}`));
