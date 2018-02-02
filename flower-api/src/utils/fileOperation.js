import config from '../../config/basic.config'
import uuid from 'uuid'
const uploadPath = config.cqfxhUploadPath
var FileOperation = function () {}
const fs = require('fs')

// 删除文件
FileOperation.prototype.deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

// 保存前端传输的流程图base64文件
FileOperation.prototype.convertAndSaveBase64 = (base64Pic) => {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath)
  }
  const base64Data = base64Pic.replace(/^data:image\/\w+;base64,/, '')
  const chartImg = uuid.v1() + '.png'
  var dataBuffer = Buffer.from(base64Data, 'base64')
  fs.writeFile(uploadPath + chartImg, dataBuffer, function (err) {
    if (err) {
      throw (err)
    }
  })
  return chartImg
}

module.exports = new FileOperation()
