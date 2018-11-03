<template>
<div id="movie-list">
  <div class="movie" v-for="movie in filteredMovies" v-bind:key="movie.title">
    {{movie.title}}
  </div>
</div>
</template>

<script>
import Genres from '../util/genres'

export default {
 name: 'movie-list',
 props: ['genre', 'time'],
 data() {
   return {
     movies: [
       { title: 'The Avengers', genre: Genres.FANTASY },
       { title: 'Pulp Fiction', genre: Genres.CRIME },
       { title: 'Austin Powers', genre: Genres.COMEDY }
     ]
   }
 },
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
