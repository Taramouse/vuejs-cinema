<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item
        v-for="movie in filteredMovies"
        v-bind:movie="movie.movie"
        v-bind:key="movie.id"
      >
        <div class="movie-sessions">
          <div
            class="session-time-wrapper"
            v-for="session in filteredSessions(movie.sessions)"
            v-bind:key="session.id"
          >
            <div class="session-time">
              {{ formatSessionTime(session.time) }}
            </div>
          </div>
        </div>
      </movie-item>
    </div>
    <div class="no-results" v-else-if="movies.length">{{ noResults }}</div>
    <div class="no-results" v-else>Loading...</div>
  </div>
</template>

<script>
import genres from '../util/genres'
import times from '../util/times'
import MovieItem from './MovieItem.vue'

export default {
  name: 'movie-list',
  props: ['genre', 'time', 'movies', 'day'],
  methods: {
    formatSessionTime(raw) {
      return this.$moment(raw).format('h:mm A')
    },
    filteredSessions(sessions) {
      return sessions.filter(this.sessionPassesTimeFilter)
    },
    moviePassesGenreFilter(movie) {
      if (!this.genre.length) {
        return true
      } else {
        let movieGenres = movie.movie.Genre.split(', ')
        let matched = true
        this.genre.forEach(genre => {
          if (movieGenres.indexOf(genre) === -1) {
            matched = false
          }
        })
        return matched
      }
    },
    sessionPassesTimeFilter(session) {
      if (!this.day.isSame(this.$moment(session.time), 'day')) {
        // If seesion time is not current day
        return false
      } else if (this.time.length === 0 || this.time.length === 2) {
        // If no filters or both filters are checked
        return true
      } else if (this.time[0] === times.AFTER_6PM) {
        // After 6pm filter selected
        return this.$moment(session.time).hour() >= 18
      } else {
        // Before 6pm filter selected
        return this.$moment(session.time).hour() < 18
      }
    }
  },
  computed: {
    filteredMovies() {
      return this.movies
        .filter(this.moviePassesGenreFilter)
        .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter))
    },
    noResults() {
      // Join each time together seperated by a comma and a space
      let times = this.time.join(', ')
      let genres = this.genre.join(', ')
      // Only add a comma and a space betweeen times and genres if they are both present
      return `No Results for ${times}${
        times.length && genres.length ? ', ' : ''
      }${genres}.`
    }
  },
  components: {
    MovieItem
  }
}
</script>
