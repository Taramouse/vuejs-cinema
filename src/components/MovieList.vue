<template>
<div id="movie-list">
  <div class="movie" v-for="movie in movies" v-bind:key="movie.title">
    {{movie.title}}
  </div>
</div>
</template>

<script>
import genres from '../util/genres'

export default {
 name: 'movie-list',
 props: ['genre', 'time'],
 data() {
   return {
     genres,
     movies: [
       { title: 'The Avengers', genre: genres.FANTASY },
       { title: 'Pulp Fiction', genre: genres.CRIME },
       { title: 'Austin Powers', genre: genres.COMEDY }
     ]
   }
 }
}
</script>
