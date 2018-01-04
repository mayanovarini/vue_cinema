import Vue from 'vue';
import './style.scss';

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
      template: `<div id="movie-filter">
                    <h2>Filter Results</h2>
                    <check-filter></check-filter>
                 </div>`,
      components: {
        'check-filter': {
          template: `<div>Filter</div>`
        }
      }
    }
  }
});
