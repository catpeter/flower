import BaseHandler from '../handlers/baseHandler'

class ReproductiveHandler extends BaseHandler {
  constructor () {
    super()
    this.tableName = 'reproductive'
  }
}
export default new ReproductiveHandler()
