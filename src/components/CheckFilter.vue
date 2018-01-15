<template>
  <div class="check-filter" v-bind:class="{ active:checked }" v-on:click="checkFilter">
    <span class="checkbox"></span>
    <span class="check-filter-title">{{ title }}</span>
  </div>
</template>

<script>
  import genres from '../util/genres.js';

  export default {
    data() {
      return {
        checked: false
      }
    },
    props: ['title'],
    methods: {
      checkFilter() {
        this.checked = !this.checked;
        this.$emit('check-filter', 'genre', this.title, this.checked);
      }
    }
  }
</script>
