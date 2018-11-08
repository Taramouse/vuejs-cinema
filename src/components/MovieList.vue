<template>
<div id="movie-list">
  <div v-if="filteredMovies.length">
    <movie-item
        v-for="movie in filteredMovies"
        v-bind:movie="movie.movie"
        v-bind:sessions="movie.sessions"
        v-bind:day="day"
        v-bind:time="time"
        v-bind:key="movie.id"
      >
      </movie-item>
  </div>
  <div class="no-results" v-else-if="movies.length">
    No results.
  </div>
  <div class="no-results" v-else>Loading...</div>
</div>
</template>

<script>
import genres from '../util/genres'
import times from '../util/times'
import MovieItem from './MovieItem.vue'

export default {
 name: 'movie-list',
 props: ['genre', 'time', 'movies', 'day'],
 methods: {
   moviePassesGenreFilter(movie) {
     if(!this.genre.length) {
       return true
     } else {
       let movieGenres = movie.movie.Genre.split(", ")
       let matched = true
       this.genre.forEach(genre => {
         if(movieGenres.indexOf(genre) === -1) {
           matched = false
         }
       })
       return matched
     }
   },
   sessionPassesTimeFilter(session) {
     if(!this.day.isSame(this.$moment(session.time), 'day')) {
       // If seesion time is not current day
       return false
     } else if(this.time.length === 0 || this.time.length === 2) {
       // If no filters or both filters are checked
       return true
     } else if(this.time[0] === times.AFTER_6PM ) {
       // After 6pm filter selected
       return this.$moment(session.time).hour() >= 18
     } else {
       // Before 6pm filter selected
       return this.$moment(session.time).hour() < 18
     }

   }
 },
 computed: {
   filteredMovies() {
     return this.movies
      .filter(this.moviePassesGenreFilter)
      .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter))
   }
 },
 components: {
   MovieItem
 }
}
</script>
