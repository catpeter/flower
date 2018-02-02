import BaseHandler from '../handlers/baseHandler'

class BreedHandler extends BaseHandler {
  constructor () {
    super()
    this.tableName = 'breed'
  }
}
export default new BreedHandler()
