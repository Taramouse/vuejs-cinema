<template>
<div v-bind:class="{'check-filter': true, active: checked}" v-on:click="checked = !checked">
  <span class="checkbox"></span>
  <span class="check-filter-title">{{title}}</span>
</div>
</template>

<script>
export default {
  name: 'check-filter',
  props: ['title'],
  data() {
    return {
      checked: false
    }
  }
}
</script>
