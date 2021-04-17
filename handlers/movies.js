const superagent = require('superagent');

function RelatedMovies(movie){
  this.description = movie.overview;
  this.popularity = movie.popularity;
  this.poster = movie.poster_path;
  this.released = movie.release_date;
  this.title = movie.original_title;
  this.votesTotal = movie.vote_count;
  this.voteAverage = movie.vote_average;
}

function getMovies(request,response){
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
      response.status(200).send(dataObject.body.results
        .map( movie => new RelatedMovies( movie ) ));
    })
    .catch( error => {
      response.status(500).send(error);
    });
}

// node syntax for what we are exporting
module.exports = getMovies;
