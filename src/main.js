import Vue from 'vue';
import './style.scss';
import genres from './util/genres.js'
import MovieList from './components/MovieList.vue';

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
    MovieList, // vue will turn this into movie-list, and using destructuring assignment, because variable and property name are the same, use one of them
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
