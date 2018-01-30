<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <!-- modify the interpolated text into a format that is corresponding to the API data -->
      <movie-item v-for="movie in filteredMovies"
                  v-bind:movie="movie.movie"
                  v-bind:sessions="movie.sessions"
                  v-bind:day="day"></movie-item>
    </div>
    <div v-else-if="!filteredMovies.length" class="no-results">
      No results.
    </div>
    <div v-else class="no-results">
      Loading ...
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres.js';
  import times from '../util/times';
  import MovieItem from './MovieItem.vue';

  export default {
    // add movies props which will connect main component data into movie-list component, making them reactive
    props: ['genre', 'time', 'movies', 'day'],
    methods: {
      moviePassesGenreFilter(movie) {
        // this.genre is from the props 'genre' which contains genres selected from the check-filter -> movie-filter -> app component
        // checking if the movie.genre exists in genre prop
        if (!this.genre.length) {  // if empty / nothing is selected
          return true; // all movie should show up unfiltered
        } else {
          let movieGenres = movie.movie.Genre.split(", ");
          let matched = true;
          this.genre.forEach(genre => {
            if (movieGenres.indexOf(genre) === -1) {
              matched = false;
            }
          });
          return matched;
        }
      },
      sessionPassesTimeFilter(session) {
        if (!this.day.isSame(this.$moment(session.time), 'day')) {
            return false;
        } else if (this.time.length === 0 || this.time.length === 2){
            return true;
        } else if (this.time[0] === times.AFTER_6PM){
            return this.$moment(session.time).hour() >= 18;
        } else {
            return this.$moment(session.time).hour() < 18;
        }
      }
    },
    computed: {
      filteredMovies() {
        // filtering ALL movies from movie-list data and run moviePassesGenreFilter function on each movie
        return this.movies
                 .filter(this.moviePassesGenreFilter) // returns all MOVIES when the moviePassesGenreFilter returns true
                 .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
      }
    },
    components: {
      MovieItem
    }
  }
</script>
