import MongoDB from '../../utils/mongodb'
import crypto from 'crypto'

class UserInfoController {
  constructor () {
    this.tableName = 'userInfo'
  }
  async login (query) {
    const userInfo = (await MongoDB.findOne(this.tableName, {
      userName: query.userName
    }))
    return validatorLogin(query, userInfo)
  }

  async getUserInfo (userId) {
    const userInfo = await MongoDB.findById(this.tableName, userId, ['_id', 'userName', 'system', 'prison', 'area', 'region'])
    return userInfo
  }
}

var validatorLogin = (query, userInfo) => {
  const result = {
    success: false,
    message: '',
    data: {}
  }
  if (!userInfo) {
    throw new Error('该用户不存在!')
  }
  if (userInfo.password !== crypto.createHmac('sha256', 'secret')
    .update(query.password)
    .digest('hex')) {
    throw new Error('密码错误!')
  }
  result.success = true
  result.message = '登陆成功!'
  delete userInfo.password
  result.data = userInfo
  return result
}

export default new UserInfoController()
