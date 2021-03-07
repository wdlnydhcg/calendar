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
}
/* @font-face {
  font-family: 'PuHuiTi';
  src: url('http://cdn.chuyunt.com/Alibaba-PuHuiTi-Medium.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}
@font-face {
  font-family: 'AlibabaSans';
  src: url('http://cdn.chuyunt.com/AlibabaSans-Medium.otf') format('otf');
  font-style: normal;
  font-weight: normal;
} */
* {
  margin: 0;
  padding: 0;
  /* font-family: 'PuHuiTi', 'AlibabaSans'; */
}
</style>
