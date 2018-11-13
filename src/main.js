import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import './style.scss'
import moment from 'moment-timezone'
import {checkFilter, setDay} from './util/bus'
import routes from './util/routes'
import tooltip from './util/tooltip'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(tooltip)

const router = new VueRouter({ routes })

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
  router,
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
      this.$bus.$on('select-day', setDay.bind(this))
  }
})
