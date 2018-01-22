import Vue from 'vue';
import './style.scss';
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';
import VueResource from 'vue-resource';
import moment from 'moment-timezone';

moment.tz.setDefault("UTC"); // to set our timezone to be UTC, same like in api.js

// define a new property called $moment, of Vue.prototype object
// Vue.prototype will make $moment available across all components
// Vue knows how every component can connect to the $root
Object.defineProperty(Vue.prototype, '$moment', {
  get() { return this.$root.moment }
});

// we want the vue instance will be able to use objects (e.g $http) from VueResource
// .use method installs VueResource to be the instance method of our main Vue object
Vue.use(VueResource);

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    moment // destructuring assignment
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
  },

  created() {
    // $http is an object from vue-resource that is imported at the top
    // $http will take care of all the http requests

    this.$http.get('/api').then(response => {
      this.movies = response.data;
    }); // attaching the vue instance (this) to the $http object from vue-resource
  }
});
