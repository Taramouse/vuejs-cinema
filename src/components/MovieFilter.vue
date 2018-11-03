<template>
<div id="movie-filter">
  <h2>Filter Results</h2>
  <div class="filter-group">
    <check-filter v-for="genre in genres" v-bind:key="genre" v-bind:title="genre"></check-filter>
  </div>
</div>
</template>

<script>
import CheckFilter from './CheckFilter.vue'
import Genres from '../util/genres'

export default {
 name: 'movie-filter',
 components: {
   CheckFilter
 },
 data() {
   return {
     genres: Genres
   }
 }
}
</script>
