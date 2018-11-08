import Vue from 'vue'
import './style.scss'
import Overview from './components/Overview.vue'
import VueResource from 'vue-resource'
import moment from 'moment-timezone'
import {checkFilter} from './util/bus'

Vue.use(VueResource)

// Set default timezone with moment
moment.tz.setDefault('UTC')
// Moment is not a vue module so cannot do Vue.use()
// To make moment globally accessible to all components.
Object.defineProperty(Vue.prototype, '$moment', { get() {
    return this.$root.moment
  }
})

// Special Vue instance to share events between components.
const bus = new Vue()
Object.defineProperty(Vue.prototype, '$bus', { get() {
    return this.$root.bus
  }
})

new Vue({
  el: '#app',
  components: {
    Overview
  },
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment(),
    bus
  },
  created() {
    this.$http.get('/api')
      .then(response => {
        this.movies = response.data
      })
      this.$bus.$on('check-filter', checkFilter.bind(this))
  }
})
