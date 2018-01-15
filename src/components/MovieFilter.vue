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
  }
</script>
