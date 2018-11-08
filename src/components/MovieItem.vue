<template>
<div class="movie">
  <div class="movie-col-left">
    <img v-bind:src="movie.Poster">
  </div>
  <div class="movie-col-right">
    <div class="movie-title">
      <h2>{{movie.Title}}</h2>
      <span class="movie-rating">{{movie.Rated}}</span>
    </div>
    <div class="movie-sessions">
      <div class="session-time-wrapper"
        v-for="session in filteredSessions(sessions)"
        v-bind:key="session.id"
      >
        <div class="session-time">{{formatSessionTime(session.time)}}</div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import times from '../util/times'

export default {
  props: ['movie', 'sessions', 'day', 'time'],
  methods: {
    formatSessionTime(raw) {
      return this.$moment(raw).format('h:mm A')
    },
    filteredSessions(sessions) {
      return sessions.filter(this.sessionPassesTimeFilter)
    },
    sessionPassesTimeFilter(session) {
     if(!this.day.isSame(this.$moment(session.time), 'day')) {
       // If seesion time is not current day
       return false
     } else if(this.time.length === 0 || this.time.length === 2) {
       // If no filters or both filters are checked
       return true
     } else if(this.time[0] === times.AFTER_6PM ) {
       // After 6pm filter selected
       return this.$moment(session.time).hour() >= 18
     } else {
       // Before 6pm filter selected
       return this.$moment(session.time).hour() < 18
     }

   }
  }
}
</script>
