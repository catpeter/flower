import breedHandler from '../../handlers/breedHandler'

class BreedController {
  async listBreed () {
    const result = await breedHandler.find()
    return result
  }
}

export default new BreedController()
