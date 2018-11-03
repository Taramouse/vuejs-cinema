<template>
<div class="check-filter">
  <span class="checkbox"></span>
  <span class="check-filter-title">{{title}}</span>
</div>
</template>

<script>
export default {
  name: 'check-filter',
  props: ['title']
}
</script>
