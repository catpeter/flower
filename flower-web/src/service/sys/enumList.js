import axios from 'axios'

export const listGrown = () => axios.get('sys/growns')
export const listBreed = () => axios.get('sys/breeds')
export const listReproductive = () => axios.get('sys/reproductives')

export default {
  listGrown,
  listBreed,
  listReproductive
}
