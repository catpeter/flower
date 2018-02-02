const _ = require('lodash')
const moment = require('moment')
class QueryUtil {
  getTableQuery (query, code, name) {
    const condition = {}
    condition.deleted = 0
    _(query).forIn((value, key) => {
      if (value && key !== 'pageIndex' && key !== 'pageSize' &&
       key !== 'code' && key !== 'startTime' && key !== 'endTime') {
        condition[key] = value
      }
    })
    if (query[code]) {
      condition.$or = [{code: query[code]}, {name: new RegExp(query[code])}]
    }
    if (query['startTime']) {
      const start = moment(query['startTime']).format('YYYY-MM')
      condition.time = {'$gte': start}
    }
    if (query['endTime']) {
      const end = moment(query['endTime']).format('YYYY-MM')
      condition.time = {'$lte': end}
    }
    return condition
  }
}
module.exports = new QueryUtil()
