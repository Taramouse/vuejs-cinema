import Vue from 'vue'
import MovieList from './components/MovieList.vue'
import MovieFilter from './components/MovieFilter.vue'
import './style.scss'

new Vue({
  el: '#app',
  components: {
    MovieList,
    MovieFilter
  }
})
