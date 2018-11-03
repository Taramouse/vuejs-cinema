import Vue from 'vue'
import MovieList from './components/MovieList.vue'
import MovieFilter from './components/MovieFilter.vue'
import './style.scss'

new Vue({
  el: '#app',
  components: {
    MovieList,
    MovieFilter
  },
  methods: {
    checkFilter(category, title, checked) {
      console.log(category, title, checked)
    }
  }
})
