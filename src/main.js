import Vue from 'vue';
import './style.scss';
import genres from './util/genres.js'

new Vue({
  el: '#app',
  components: {
    'movie-list': {
        template: `<div id="movie-list">
                      <div v-for="movie in movies" class="movie">{{ movie.title }}</div>
                   </div>`,
        data() {
          return {
            movies: [
              { title: 'Pulp Fiction' },
              { title: 'Doraemon' },
              { title: 'Jumanji' }
            ]
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
                        <check-filter v-for="genre in genres" v-bind:title="genre"></check-filter>
                      </div>
                   </div>`,
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
                this.$emit('check-filter');
              }
            }
          }
        }
    } // close movie-filter
  }
});
