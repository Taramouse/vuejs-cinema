import Vue from 'vue'
import './style.scss'
import MovieList from './components/MovieList.vue'
import MovieFilter from './components/MovieFilter.vue'
import VueResource from 'vue-resource'
import moment from 'moment-timezone'

Vue.use(VueResource)

// Set default timezone with moment
moment.tz.setDefault('UTC')
// Moment is not a vue module so cannot do Vue.use()
// To make moment globally accessible to all components.
Object.defineProperty(Vue.prototype, '$moment', {get() {
    return this.$root.moment
  }
})

new Vue({
  el: '#app',
  components: {
    MovieList,
    MovieFilter
  },
  data: {
    genre: [],
    time: [],
    movies: [],
    moment
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
  },
  created() {
    this.$http.get('/api')
      .then(response => {
        this.movies = response.data
      })
  }
})
