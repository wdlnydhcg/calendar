var crypto = require('crypto')
var querystring = require('querystring')
const http = require('http')
var URL = 'http://api.seniverse.com/v3/'

function Api(uid, secretKey) {
  this.uid = uid || 'U076256763'
  this.secretKey = secretKey || 'WWLXWJGTJL'
}

function request(url, data) {
  let str = ''
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key]
      str += `${key}=${element}&`
    }
  }
  return new Promise((resolve, reject) => {
    http.get(`${url}?${str.slice(0, -1)}`, (res) => {
      const { statusCode } = res
      const contentType = res.headers['content-type']

      let error
      // 任何 2xx 状态码都表示成功的响应，但是这里只检查 200。
      if (statusCode !== 200) {
        error = new Error('请求失败\n' + `状态码: ${statusCode}`)
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('无效的 content-type.\n' + `期望的是 application/json 但接收到的是 ${contentType}`)
      }
      if (error) {
        console.error(error.message)
        // 消费响应的数据来释放内存。
        reject(error)
        return
      }
      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', (chunk) => {
        rawData += chunk
      })
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData)
          resolve(parsedData)
        } catch (e) {
          reject(e.message)
          console.error(e.message)
        }
      })
    })
  })
}

Api.prototype.getSignatureParams = function () {
  var params = {}
  params.ts = Math.floor(new Date().getTime() / 1000) // 当前时间戳（秒）
  params.ttl = 3000 // 过期时间
  params.uid = this.uid // 用户ID

  var str = querystring.encode(params) // 构造请求字符串
  // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串进行加密
  params.sig = crypto.createHmac('sha1', this.secretKey).update(str).digest('base64') // 将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig

  return params
}

Api.prototype.getWeatherNow = function (location) {
  var params = this.getSignatureParams()
  params.location = location || 'hangzhou'

  // 将构造的 URL 直接在后端 server 内调用
  return request(URL + 'weather/now.json', {
    ...params
  })
}

Api.prototype.getWeatherDaily = function (location) {
  var params = this.getSignatureParams()
  params.location = location || 'hangzhou'

  // 将构造的 URL 直接在后端 server 内调用
  return request(URL + 'weather/daily.json', {
    ...params
  })
}

window.exports = {
  request: new Api()
}
