<template>
  <Calendar />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Calendar from './components/Calendar/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Calendar
  }
})
</script>

<style>
#app {
  background: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
* {
  margin: 0;
  padding: 0;
}
</style>
