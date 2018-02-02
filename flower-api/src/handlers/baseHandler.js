import MongoDB from '../utils/mongodb.js'
class BaseHandler {
  constructor () {
    this.tableName = ''
  }
  async find (conditions = {}, fields = []) {
    const result = await MongoDB.find(this.tableName, conditions, fields)
    return result
  }
  async findOne (conditions = {}) {
    const result = await MongoDB.findOne(this.tableName, conditions)
    return result
  }

  async update (conditions = {}, updateFields = {}) {
    const result = await MongoDB.update(this.tableName, conditions, updateFields)
    return result
  }
  async save (fields = {}) {
    const result = await MongoDB.save(this.tableName, fields)
    return result
  }
  async count (conditions) {
    const count = (await MongoDB.count(this.tableName, conditions))
    return count
  }
  async remove (conditions = {}) {
    const result = await MongoDB.remove(this.tableName, conditions)
    return result
  }
}
export default BaseHandler
