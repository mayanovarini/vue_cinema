<template>
  <div id="movie-list">
    <!-- modify the interpolated text into a format that is corresponding to the API data -->
    <movie-item v-for="movie in filteredMovies" class="movie" v-bind:movie="movie"></movie-item>
  </div>
</template>

<script>
  import genres from '../util/genres.js';
  import MovieItem from './MovieItem.vue';

  export default {
    // add movies props which will connect main component data into movie-list component, making them reactive
    props: ['genre', 'time', 'movies'],
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
    },
    components: {
      MovieItem
    }
  }
</script>
