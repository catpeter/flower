// import log4js from 'log4js'
// import logConfig from '../../config/log.config'
// import schedule from 'node-schedule'
// import determinePostsController from '../controllers/zfldqk/determinePosts_controller'
// import LineProductionController from '../controllers/kbgl/lineProductionBoard_controller'
// import WorkerLevelController from '../controllers/zfldqk/workerLevel_controller'

// log4js.configure(logConfig)
// const errorLogger = log4js.getLogger('errorLogger')

// // 每天凌晨2点更新定岗定位数据
// schedule.scheduleJob('0 0 2 * * *', () => {
//   determinePostsController.updateDailyJob().then(() => {
//   }).catch((err) => {
//     console.log(err)
//     errorLogger.error(err)
//   })
//   LineProductionController.updateDailyLineProduction().then(() => {
//   }).catch((err) => {
//     console.log(err)
//     errorLogger.error(err)
//   })
// })

