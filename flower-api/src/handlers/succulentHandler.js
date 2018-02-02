import MongoDB from '../utils/mongodb.js'
import BaseHandler from '../handlers/baseHandler'

class SucculentHandler extends BaseHandler {
  constructor () {
    super()
    this.tableName = 'succulent'
  }

  // 分页查询
  async pagefind (conditions, fields, pageIndex = 1, pageSize = 0, sort = {}) {
    pageIndex = parseInt(pageIndex)
    pageSize = parseInt(pageSize)
    const result = await MongoDB.pagefind(this.tableName, conditions, fields, (pageIndex - 1) * pageSize, pageSize, sort)
    return result
  }
}
export default new SucculentHandler()
