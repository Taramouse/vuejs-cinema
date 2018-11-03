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
  data: {
    genre: [],
    time: []
  },
  methods: {
    checkFilter(category, title, checked) {
      if(checked) {
        this[category].push(title)
      } else {
        let index = this[category].indexOf(title)
        if(index > -1) {
          this[category].splice(index, 1)
        }
      }
    }
  }
})
