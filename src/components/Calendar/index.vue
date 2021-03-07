<template>
  <div class="calendar">
    <div class="calendar-main" :style="{ width: openSidebar ? '600px' : '850px' }">
      <calendar-header :currentDate="currentDate" @change="monthOrYearChange" @back="backToday"></calendar-header>
      <calendar-content :currentDate="currentDate" @select="selectDay"></calendar-content>
    </div>
    <calendar-sidebar :currentDate="currentDate" :openSidebar="openSidebar" @toggle="openSidebar = !openSidebar"></calendar-sidebar>
  </div>
</template>

<script lang="ts">
import calendarHeader from './calendar-header.vue'
import calendarContent from './calendar-content.vue'
import calendarSidebar from './calendar-sidebar.vue'
import { getYearMonthDay } from './utils.ts'
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Calendar',
  components: {
    calendarHeader,
    calendarContent,
    calendarSidebar
  },
  data() {
    return {
      currentDate: { year: 0, month: 0, day: 0, lunar: {} },
      openSidebar: true
    }
  },
  props: {},
  methods: {
    monthOrYearChange(type: String, unit: String) {
      if (unit === 'month') {
        let month = type === '+' ? this.currentDate.month + 1 : this.currentDate.month - 1
        if (month < 1) {
          this.currentDate.month = 12
          this.currentDate.year = this.currentDate.year - 1
        } else if (month > 12) {
          this.currentDate.month = 1
          this.currentDate.year = this.currentDate.year + 1
        } else {
          this.currentDate.month = month
        }
      } else {
        let year = type === '+' ? this.currentDate.year + 1 : this.currentDate.year - 1
        this.currentDate.year = year
      }
    },
    selectDay(data: Object) {
      this.currentDate = data
    },
    backToday() {
      this.currentDate = getYearMonthDay()
    }
  },
  created() {
    this.currentDate = getYearMonthDay()
  }
})
</script>

<style>
:root {
  --main-color: #1439f6;
  --sub-main-color: #fc684c;
  --bg-color: #ffffff;
  --text-color: #2c2c2e;
  --sub-text-color: #a1a0a3;
  --dis-text-color: #dbdbdb;
}
.calendar {
  background: var(--bg-color);
  color: var(--text-color);
  max-width: 850px;
  min-width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.calendar-main {
  padding: 32px 52px;
  box-sizing: border-box;
  transition: all 0.5s;
}
</style>
