import Vue from 'vue';
import './style.scss';
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

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
    MovieFilter
  }
});
