<template>
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <div class="filter-group">
      <!-- we use v-for so we just have to type line #7 once -->
      <!-- we use v-bind:title="genre" NOT BIND TO GENRES to bind data from genres, because each check-filter should only have one genre -->
      <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres.js';
  import CheckFilter from './CheckFilter.vue';

  export default {
    data() {
      return {
        genres
      }
    },

    methods: {
      checkFilter(category, title, checked){
        this.$emit('check-filter', category, title, checked);
      }
    },
    components: {
      CheckFilter
    }
  }
</script>
