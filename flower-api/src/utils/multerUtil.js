import config from '../../config/basic.config'
import uuid from 'uuid'
import path from 'path'
import multer from 'koa-multer'
import fs from 'fs'

let storage = multer.diskStorage({
  // 设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    const uploadPathType = (req._parsedUrl.path).split('/')[2]
    let uploadPath
    if (uploadPathType === 'cqfxh') { // 判断什么请求保存至不同文件目录
      uploadPath = config.cqfxhUploadPath
    } else {
      uploadPath = config.uploadPath
    }

    if (!fs.existsSync(uploadPath)) {
      mkdirsSync(uploadPath)
    }
    cb(null, uploadPath)
  },
  // 重命名文件
  filename: function (req, file, cb) {
    const newFilename = uuid.v1() // 根据uuid创建新的文件名
    const suffix = file.originalname.split('.')[file.originalname.split('.').length - 1]
    cb(null, newFilename + '.' + suffix)
  }
})
// 添加配置文件到muler对象。
var upload = multer({
  storage: storage
})

// 递归创建文件目录
function mkdirsSync (dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

// 导出对象
module.exports = upload
