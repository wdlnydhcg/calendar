import { calendarjs } from './calendar'
export const getYearMonthDay = (time: string | number | Date): object => {
  const now: Date = time ? new Date(time) : new Date()
  const year: Number = now.getFullYear() // 2021
  const month: Number = now.getMonth() + 1 // 0 - 11
  const day: Number = now.getDate()
  const hour: Number = now.getHours()
  const minutes: Number = now.getMinutes()
  const week: Number = now.getDay()
  const lunar: Object = calendarjs.solar2lunar(year, month, day) // 农历信息
  const result = { year, month, day, week, lunar, hour, minutes }
  return result
}

// export const jsonp = (url: string) => {
//   if (!url) {
//     console.error('请传入一个url参数')
//     return
//   }
//   return new Promise((resolve, reject) => {
//     window.showWeather = (result: object ) => {
//       resolve(result)
//     }
//     var JSONP = document.createElement('script')
//     JSONP.type = 'text/javascript'
//     JSONP.src = `${url}&${authCode()}&callback=showWeather`
//     document.getElementsByTagName('head')[0].appendChild(JSONP)
//     setTimeout(() => {
//       document.getElementsByTagName('head')[0].removeChild(JSONP)
//     }, 500)
//   })
// }

// export const authCode = () => {
//   let now = Math.floor(new Date().getTime() / 1000)
//   let ttl = 300 // 失效时间
//   const uid = 'U076256763' // 公钥
//   const privateKey = 'WWLXWJGTJL' // 私钥
//   const message = `ts=${now}&ttl=${ttl}&uid=${uid}`
//   let code1 = CryptoJS.HmacSHA1(message, privateKey).toString(CryptoJS.enc.Base64)
//   let signCode = encodeURIComponent(code1)
//   let code = `${message}&sig=${signCode}`
//   console.log('code', code)
//   return code
// }

export const holidayList = [
  '2021-1-1',
  '2021-1-2',
  '2021-1-3',
  '2021-2-11',
  '2021-2-12',
  '2021-2-13',
  '2021-2-14',
  '2021-2-15',
  '2021-2-16',
  '2021-2-17',
  '2021-4-3',
  '2021-4-4',
  '2021-4-5',
  '2021-5-1',
  '2021-5-2',
  '2021-5-3',
  '2021-5-4',
  '2021-5-5',
  '2021-6-12',
  '2021-6-13',
  '2021-6-14',
  '2021-9-19',
  '2021-9-20',
  '2021-9-21',
  '2021-10-1',
  '2021-10-2',
  '2021-10-3',
  '2021-10-4',
  '2021-10-5',
  '2021-10-6',
  '2021-10-7'
]

export const workdayList = ['2021-2-7', '2021-2-20', '2021-4-25', '2021-5-8', '2021-9-18', '2021-9-26', '2021-10-9']
