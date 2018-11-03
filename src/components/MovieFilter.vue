<template>
<div id="movie-filter">
  <h2>Filter Results</h2>
  <check-filter></check-filter>
</div>
</template>

<script>
import CheckFilter from './CheckFilter.vue'
export default {
 name: 'movie-filter',
 components: {
   CheckFilter
 },
 data() {
   return {
     // msg: 'I am movie-filter'
   }
 }
}
</script>
