import path from 'path'
import os from 'os'
const config = {
    // 程序运行端口
  service_port: 8060,
    // 域名
  service_dns: '127.0.0.1',

    // 静态资源路径
  resource_url: '/build',
    // 数据库地址
  mongodb_url: 'mongodb://@localhost:27017/SucculentPlant',
    // 是否加载第三方插件配置项
  webpack_hot: false,

  urlHearder: 'http://' + getServiceAdress() + ':8060/upload', // 用于前端加载监狱相关后端静态资源路径拼接
  uploadPath: path.resolve('.') + '/upload' // 监狱相关图片上传地址
}

function getServiceAdress () {
  var interfaces = os.networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

export default config
