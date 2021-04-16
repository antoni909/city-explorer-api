require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const { response } = require('express');
const superagent = require('superagent');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// class for day objects
class DailyForecast {
  constructor(description, date){
    this.description = description;
    this.date = date;
  }
}
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

app.get('/movies', (request,response) => {

  // console.log('request.query',request.query.citySearchTextField);

  const url = 'https://api.themoviedb.org/3/search/movie';
  const query = {
    api_key: process.env.REACT_APP_MOVIE_API_KEY,
    query: request.query.citySearchTextField,
  };

  superagent
    .get(url)
    .query(query)
    .then( dataObject => {
      console.log('results.body: ',dataObject.body);
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

// listener
app.listen( PORT, ()=> console.log(`server is listening on port: ${PORT}`));
