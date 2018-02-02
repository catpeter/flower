import BaseHandler from '../handlers/baseHandler'

class GrownHandler extends BaseHandler {
  constructor () {
    super()
    this.tableName = 'grown'
  }
}
export default new GrownHandler()
