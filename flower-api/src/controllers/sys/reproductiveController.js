import reproductiveHandler from '../../handlers/reproductiveHandler'

class ReproductiveController {
  async listReproductive () {
    const result = await reproductiveHandler.find()
    return result
  }
}

export default new ReproductiveController()
