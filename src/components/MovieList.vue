<template>
  <div id="movie-list">
    <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
  </div>
</template>

<script>
  import genres from '../util/genres.js'

  export default {
    data() {
      return {
        movies: [
          { title: 'Pulp Fiction', genre: genres.CRIME },
          { title: 'Doraemon', genre: genres.COMEDY },
          { title: 'Jumanji 2', genre: genres.COMEDY }
        ]
      }
    },
    props: ['genre', 'time'],
    methods: {
      moviePassesGenreFilter(movie) {
        // this.genre is from the props 'genre' which contains genres selected from the check-filter -> movie-filter -> app component
        // checking if the movie.genre exists in genre prop
        if (!this.genre.length) {  // if empty
          return true;
        } else {
          return this.genre.find(genre => movie.genre === genre);
        }
      }
    },
    computed: {
      filteredMovies() {
        // filtering ALL movies from movie-list data and run moviePassesGenreFilter function on each movie
        return this.movies.filter(this.moviePassesGenreFilter); // returns all MOVIES when the moviePassesGenreFilter returns true
      }
    }
  }
</script>
