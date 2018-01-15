import Vue from 'vue';
import './style.scss';
import genres from './util/genres.js'

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: []
  },
  methods: {
    checkFilter(category, title, checked){
      if (checked) {
        // this[..] is an accessor syntax that allows dynamic selection of an object property,
        // in this case it will be genre or time
        this[category].push(title);
      } else {
        let index = this[category].indexOf(title);
        if (index > -1) {
          this[category].splice(index, 1);
        }
      }
    }
  },
  components: {
    'movie-list': {
        template: `<div id="movie-list">
                      <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
                   </div>`,
        data() {
          return {
            movies: [
              { title: 'Pulp Fiction', genre: genres.CRIME },
              { title: 'Doraemon', genre: genres.COMEDY },
              { title: 'Jumanji', genre: genres.COMEDY }
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
    },
    'movie-filter': {
        data() {
          return {
            genres
          }
        },
        template: `<div id="movie-filter">
                      <h2>Filter Results</h2>
                      <div class="filter-group">
                        <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
                      </div>
                   </div>`,
        methods: {
          checkFilter(category, title, checked){
            this.$emit('check-filter', category, title, checked);
          }
        },
        components: {
          'check-filter': {
            data() {
              return {
                checked: false
              }
            },
            props: ['title'],
            template: `<div class="check-filter" v-bind:class="{ active:checked }" v-on:click="checkFilter">
                        <span class="checkbox"></span>
                        <span class="check-filter-title">{{ title }}</span>
                      </div>`,
            methods: {
              checkFilter() {
                this.checked = !this.checked;
                this.$emit('check-filter', 'genre', this.title, this.checked);
              }
            }
          }
        }
    } // close movie-filter
  }
});
