var JsonUtil = function () {}

/**
 * 返回成功
 * @param result 数据对象
 */
JsonUtil.prototype.returnSuccessJson = (result) => {
  if (result) {
    if (result.length) {
      return '{"code":0,"message":"","result":' + JSON.stringify(result) + '}'
    } else {
      return '{"code":0,"message":"","result":[' + JSON.stringify(result) + ']}'
    }
  } else {
    return '{"code":1,"message":"暂无数据","result":""}'
  }
}

/**
 * 返回失败
 * @param result 数据对象
 */
JsonUtil.prototype.returnFailureJson = (message) => {
  return '{"code":1,"message":"' + message + '","result":""}'
}

// 判断是否为json对象
JsonUtil.prototype.isJson = (obj) => {
  var isjson = typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length
  return isjson
}

// 判断是否为空对象
JsonUtil.prototype.isEmptyObject = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
    return true
  }
  return true
}

module.exports = new JsonUtil()
