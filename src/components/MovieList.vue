<template>
<div id="movie-list">
  <div class="movie" v-for="movie in movies" v-bind:key="movie.title">
    {{movie.title}}
  </div>
</div>
</template>

<script>
export default {
 name: 'movie-list',
 data() {
   return {
     movies: [
       { title: 'The Avengers'},
       { title: 'Captain America'},
       { title: 'Iron Man'}
     ]
   }
 }
}
</script>
