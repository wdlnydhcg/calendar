<template>
  <div class="calendar-sidebar" :style="{ width: openSidebar ? '250px' : '0px' }">
    <div class="sidebar-open" @click="toggleSidebar">
      <i class="iconfont icon-jiantou" :style="{ transform: openSidebar ? 'rotate(180deg)' : '' }"></i>
    </div>
    <div class="sidebar-weather" v-if="weatherData.daily">
      <img class="weather-img" :src="`http://cdn.chuyunt.com/weather/white/${weatherData.daily[0].code_day}@2x.png`" alt="" />
      <!-- 用于切换黑夜模式 -->
      <!-- <img class="weather-img" :src="`http://cdn.chuyunt.com/weather/black/${weatherData.daily[0].code_day}@2x.png`" alt="" /> -->
      <div class="weather-info">
        <i class="iconfont icon-dingwei"></i>
        {{ weatherData.location.name }} {{ weatherData.daily[0].text_day }} {{ weatherData.daily[0].low }} - {{ weatherData.daily[0].high }} ℃
      </div>
    </div>
    <div class="current-time">{{ time }}</div>
    <div class="sidebar-info-group">
      <div class="sidebar-info">
        <div class="sidebar-info-main">{{ currentDate.lunar.gzYear }}年 农历{{ currentDate.lunar.IMonthCn }}{{ currentDate.lunar.IDayCn }}</div>
        <div class="sidebar-info-sub">第 {{ getWeek }} 周</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getYearMonthDay, jsonp } from './utils.ts'
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'CalendarHeader',
  data() {
    return {
      weatherData: {},
      time: '00:00',
      sI: null
    }
  },
  props: {
    currentDate: {
      type: Object,
      required: true
    },
    openSidebar: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showJin(): Boolean {
      const now = getYearMonthDay()
      return now.year !== this.currentDate.year || now.month !== this.currentDate.month || now.day !== this.currentDate.day
    },
    getWeek(sunday = false): Number {
      const milliseconds = 24 * 3600000
      let start = new Date(this.currentDate.year + '/01/01')
      let offset = start.getDay() > 0 ? 8 - start.getDay() : 1
      offset = sunday ? offset - 1 : offset
      return Math.abs(Math.ceil((new Date(`${this.currentDate.year}/${this.currentDate.month}/${this.currentDate.day}`).getTime() - start.getTime() - offset * milliseconds) / milliseconds / 7))
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle')
    },
    async getWeather() {
      let res = await jsonp('https://api.seniverse.com/v3/weather/daily.json?key=WWLXWJGTJL&location=hangzhou&language=zh-Hans&unit=c&start=0&days=1')
      console.log(res)
      if (res.results && res.results.length) {
        this.weatherData = res.results[0]
        localStorage.setItem(this.weatherData.daily[0].date, JSON.stringify(this.weatherData))
      }
    },
    getTime() {
      this.sI = setInterval(() => {
        let now = new Date()
        this.time = `${this.addZero(now.getHours())}:${this.addZero(now.getMinutes())}`
      }, 1000)
    },
    addZero(num: number) {
      let temp = num.toString()
      return temp.length === 1 ? '0' + num : num
    }
  },
  created() {
    const now = getYearMonthDay()
    let weatherData = localStorage.getItem(`${now.year}-${now.month}-${now.day}`)
    if (weatherData) {
      this.weatherData = JSON.parse(weatherData)
    } else {
      this.getWeather()
    }
    this.getTime()
  },
  beforeUnmount() {
    clearInterval(this.sI)
  }
})
</script>

<style lang="less" scoped>
.calendar-sidebar {
  height: 600px;
  background: var(--main-color);
  padding: 64px 0px;
  color: #ffffff;
  position: relative;
  box-sizing: border-box;
  transition: all 0.5s;
}
.sidebar-open {
  height: 120px;
  width: 24px;
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 240px;
  left: -24px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    transition: all 0.5s;
    font-size: 24px;
  }
}
.sidebar-weather {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 250px;
  .weather-img {
    width: 80px;
    height: auto;
    margin-bottom: 24px;
  }
  .weather-info {
    font-weight: 100;
  }
}
.current-time {
  margin: 48px 0;
  color: #ffffff;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sidebar-info-group {
  height: 240px;
  overflow-x: hidden;
  overflow-y: auto;
}
.sidebar-info {
  width: 250px;
  &::before {
    content: ' ';
    width: 4px;
    height: 4px;
    border-radius: 4px;
    box-shadow: 0px 0px 8px var(--main-color);
    background: var(--main-color);
    position: absolute;
    left: 12px;
    top: 30px;
  }
  position: relative;
  margin: 12px 0px 12px 24px;
  padding: 12px 0 12px 32px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background: #ffffff;
  height: 64px;
  box-sizing: border-box;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  .sidebar-info-sub {
    font-size: 12px;
    color: var(--sub-text-color);
  }
}
</style>
