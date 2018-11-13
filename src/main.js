import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import './style.scss'
import moment from 'moment-timezone'
import {checkFilter, setDay} from './util/bus'
import routes from './util/routes'

Vue.use(VueRouter)
Vue.use(VueResource)

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

import {addClass, removeClass} from './util/helpers'

let mouseOverHandler = function(event) {
  let span = event.target.parentNode.getElementsByTagName('SPAN')[0]
  addClass(span, 'tooltip-show')
}
let mouseOutHandler = function(event) {
  let span = event.target.parentNode.getElementsByTagName('SPAN')[0]
  removeClass(span, 'tooltip-show')
}

Vue.directive('tooltip', {
  bind(el, bindings) {
    let span = document.createElement('SPAN')
    let text = document.createTextNode(`Seats available: ${bindings.value.seats}`)
    span.appendChild(text)
    addClass(span, 'tooltip')
    el.appendChild(span)
    let div = el.getElementsByTagName('DIV')[0]
    div.addEventListener('mouseover', mouseOverHandler)
    div.addEventListener('mouseout', mouseOutHandler)
    div.addEventListener('touchstart', mouseOverHandler)
    div.addEventListener('touchend', mouseOutHandler)
  },
  unbind(el, bindings) {
    let div = el.getElementsByTagName('DIV')[0]
    div.removeEventListener('mouseover', mouseOverHandler)
    div.removeEventListener('mouseout', mouseOutHandler)
    div.removeEventListener('touchstart', mouseOverHandler)
    div.removeEventListener('touchend', mouseOutHandler)
  }
})
