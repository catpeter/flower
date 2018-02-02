import _ from 'lodash'
const pager = {}

pager.getResult = (count, data) => {
  return {
    count: count,
    data: data
  }
}

/**
 * 筛选、分页、排序
 * @param collection The collection to search.
 * @param start The start position.
 * @param limit The length of pagination.
 * @param predicate The function invoked per iteration.
 * @param property The iteratees to sort by.
 * @param direction The sort orders of iteratees.
 * @return Returns the pager element.
 */
pager.query = (collection, start, limit, predicate, property, direction) => {
  let result = _.filter(collection, predicate)
  const count = result.length
  result = _(result).orderBy(property, direction)
  if (limit !== 0) {
    result = _(result).slice(start, start + limit)
  }
  return pager.getResult(count, result.value())
}

export default pager
