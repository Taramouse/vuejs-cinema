<template>
<div id="movie-list">
  <movie-item
    class="movie"
    v-for="movie in filteredMovies"
    v-bind:movie="movie"
    v-bind:key="movie.id"
  >
  </movie-item>
</div>
</template>

<script>
import genres from '../util/genres'
import MovieItem from './MovieItem.vue'

export default {
 name: 'movie-list',
 props: ['genre', 'time', 'movies'],
 methods: {
   moviePassesGenreFilter(movie) {
     if(!this.genre.length) {
       return true
     } else {
       return this.genre.find(genre => movie.genre === genre)
     }
   }
 },
 computed: {
   filteredMovies() {
     return this.movies.filter(this.moviePassesGenreFilter)
   }
 },
 components: {
   MovieItem
 }
}
</script>
