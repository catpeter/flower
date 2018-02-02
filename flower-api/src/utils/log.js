// 引入操作mongodb数据库封装DB类
const MongoDB = require('../utils/mongodb')
const jsonUtil = require('../utils/jsonUtil')
const events = require('events')
// 创建了事件监听器的一个对象
const emitter = new events.EventEmitter()
// 监听事件some_event
emitter.on('some_event', function () {
  // 事件触发，调用此回调函数;
  common.common.findById(ctx, id)
})
setTimeout(function () {
  // 触发事件some_event
  emitter.emit('some_event')
}, 3000)
