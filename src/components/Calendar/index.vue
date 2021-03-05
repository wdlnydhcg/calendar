<template>
  <div class="calendar">
    <calendar-header :currentDate="currentDate" @change="monthOrYearChange" @back="backToday"></calendar-header>
    <calendar-content :currentDate="currentDate" @select="selectDay"></calendar-content>
  </div>
</template>

<script lang="ts">
import calendarHeader from './calendar-header.vue'
import calendarContent from './calendar-content.vue'
import { getYearMonthDay } from './utils'
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Calendar',
  components: {
    calendarHeader,
    calendarContent
  },
  data() {
    return {
      currentDate: { year: 0, month: 0, day: 0 }
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
      const { year, month, day } = data
      this.currentDate = { year, month, day }
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
  --main-color: #3a6fff;
  --sub-main-color: #fc684c;
  --bg-color: #ffffff;
  --text-color: #2c2c2e;
  --sub-text-color: #a1a0a3;
  --dis-text-color: #f0f0f0;
}
.calendar {
  background: var(--bg-color);
  color: var(--text-color);
  padding: 32px 52px;
  box-sizing: border-box;
  max-width: 850px;
  min-width: 400px;
}
</style>
