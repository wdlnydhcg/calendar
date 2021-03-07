<template>
  <div class="calendar-header">
    <div class="calendar-date">{{ currentDate.year }} 年 {{ currentDate.month }} 月 {{ currentDate.day }} 日</div>
    <div class="calendar-change-btn">
      <i class="iconfont icon-jintian icon-jin" @click="back" v-if="showJin"></i>
      <i class="iconfont icon-Arrow-LeftCircle icon-arrow" @click="change('-')"></i>
      <i class="iconfont icon-nianbao icon-select" :class="{ 'icon-color': unit === 'year' }" @click="unit = 'year'"></i>
      <i class="iconfont icon-yuebao icon-select" :class="{ 'icon-color': unit === 'month' }" @click="unit = 'month'"></i>
      <i class="iconfont icon-Arrow-RightCircle icon-arrow" @click="change('+')"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { getYearMonthDay } from './utils.ts'
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'CalendarHeader',
  data() {
    return {
      unit: 'month' // month or year
    }
  },
  props: {
    currentDate: {
      type: Object,
      required: true
    }
  },
  computed: {
    showJin(): Boolean {
      const now = getYearMonthDay()
      return now.year !== this.currentDate.year || now.month !== this.currentDate.month || now.day !== this.currentDate.day
    }
  },
  methods: {
    change(type: String) {
      this.$emit('change', type, this.unit)
    },
    back() {
      this.$emit('back')
    }
  }
})
</script>

<style scoped>
.calendar-header {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  height: 60px;
}
.calendar-date {
  line-height: 36px;
  font-size: 22px;
  font-weight: bold;
}
.calendar-change-btn {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
.iconfont {
  transition: all 0.3s;
  color: var(--dis-text-color);
}
.icon-select {
  font-size: 30px;
}
.icon-color {
  color: var(--main-color);
}
.icon-arrow {
  margin: 0 6px;
  font-size: 24px;
  color: var(--sub-text-color);
}
.icon-arrow:hover {
  color: var(--main-color);
}
.icon-jin {
  color: var(--sub-main-color);
  font-size: 30px;
  margin-right: 15px;
}
</style>
