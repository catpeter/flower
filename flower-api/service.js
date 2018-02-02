import MongoDB from './src/utils/mongodb'
MongoDB.connection()
const Koa = require('koa')
const router = require('koa-router')() // KOA路由
const jwt = require('koa-jwt')
const cors = require('kcors')
const path = require('path')
const autoRreshJWT = require('./src/middlewares/AutoRreshJWT')
const {whiteList} = require('./src/utils/tokenWhiteList')
require('./src/utils/schedule')
const app = new Koa()
const staticServer = require('koa-static')  // 静态资源

// 定义路由
// var stringUtil = require('./src/utils/stringUtil')
// var yaml = require('js-yaml')
// var fs = require('fs')
const async = require('async')

const routerConf = require('./config/router.config')

// log工具
const logUtil = require('./src/utils/logUtil')

// 后端静态资源中间件
app.use(staticServer(path.resolve(__dirname)))

// 跨域
app.use(cors({
  credentials: true,
  exposeHeaders: 'Token'
}))
// JWT校验
app.use(jwt({
  secret: 'secret',
  getToken: ctx => ctx.get('Token')
}).unless({
  path: whiteList
}))
// 刷新JWT
app.use(autoRreshJWT())

// 记录日志
// app.use(async(ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${start} ${ctx.method} ${ctx.ip} ${ctx.url} ${ctx.status} - ${ms}ms`)
// })

// 添加格式化处理响应结果的中间件，在添加路由之前调用
// app.use(response_formatter);
// logger
// app.use(async(ctx, next) => {
//   // 响应开始时间
//   const start = new Date()
//   // 响应间隔时间
//   var ms
//   try {
//     // 开始进入到下一个中间件
//     await next()
//     // ms = new Date() - start
//     // 记录响应日志
//     // logUtil.logResponse(ctx, ms)
//   } catch (err) {
//     ms = new Date() - start
//     // 记录异常日志
//     logUtil.logError(ctx, err, ms)
//   }
// })

// try-catch 中间件
app.use(async (ctx, next) => {
  const start = new Date()
  let ms
  try {
    await next()
  } catch (err) {
    ms = new Date() - start
    logUtil.logError(ctx, err, ms)
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.throw(err.status || 500, err.message)
  }
})

// 暴露接口
async.series([
  // function service.getFiles,
  function (cb) {
    for (var i = 0; i < routerConf.length; i++) {
      const flag = routerConf[i].enable
      const moudleName = routerConf[i].moudleName
      if (flag) {
        const routerMoudles = require('./src/routes/' + moudleName + '/' + moudleName + '.router.js')
        for (var j = 0; j < routerMoudles.length; j++) {
          const moudleInfo = require(routerMoudles[j].file_require)
          router.use('/api' + routerMoudles[j].file_path, moudleInfo.routes(), moudleInfo.allowedMethods())
        }
      }
    }
    cb()
  },
  function (cb) {
    app.use(router.routes(), router.allowedMethods())
    cb()
  }
], function (err, values) {
  console.log(err)
})

module.exports = app
