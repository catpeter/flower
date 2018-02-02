import grownHandler from '../../handlers/grownHandler'

class GrownController {
  async listGrown () {
    const result = await grownHandler.find()
    return result
  }
}

export default new GrownController()
