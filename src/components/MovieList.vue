<template>
<div id="movie-list">
  <div class="movie" v-for="movie in filteredMovies" v-bind:key="movie.movie.Title">
    {{movie.movie.Title}}
  </div>
</div>
</template>

<script>
import genres from '../util/genres'

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
 }
}
</script>
