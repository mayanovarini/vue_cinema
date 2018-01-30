<template>
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <h3>By time of day</h3>
    <div class="filter-group">
      <check-filter v-for="time in times" v-bind:title="time" v-on:check-filter="checkFilter"></check-filter>
    </div>
    <h3>By genre</h3>
    <div class="filter-group">
      <!-- we use v-for so we just have to type line #7 once -->
      <!-- we use v-bind:title="genre" NOT BIND TO GENRES to bind data from genres, because each check-filter should only have one genre -->
      <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres.js';
  import times from '../util/times.js';

  import CheckFilter from './CheckFilter.vue';

  export default {
    data() {
      return {
        genres,
        times
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
