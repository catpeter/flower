const TimeUtil = function () {}

TimeUtil.prototype.getYearMonthQuery = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  let time = ''
  if (month < 10) {
    time = new RegExp(year + '-' + month + '-')
  } else {
    time = new RegExp(year + '-0' + month + '-')
  }
  return time
}

// 26-25号
TimeUtil.prototype.getTimeQuery = () => {
  const date = new Date()
  const year = date.getFullYear()
  const lastMonth = date.getMonth()
  const month = date.getMonth() + 1
  let moment1 = ''
  let moment2 = ''
  if (lastMonth < 10) {
    moment1 = year + '-0' + lastMonth + '-26'
  } else {
    moment1 = year + '-' + lastMonth + '-26'
  }
  if (month < 10) {
    moment2 = year + '-0' + month + '-25'
  } else {
    moment2 = year + '-' + month + '-25'
  }
  let query = {}
  query.time = {$gte: moment1, $lte: moment2}
  return query
}

module.exports = new TimeUtil()
