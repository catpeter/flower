import axios from 'axios'

export const searchSucculentList = (query) => axios.get('/plant/succulents', {params: query})

export const delSucculentById = (id) => axios.delete('/plant/succulents/' + id)

export const addSucculent = (query) => axios.post('/plant/succulents', query)

export const getSucculentById = (id) => axios.get('/plant/succulents/' + id)

export const editSucculent = (query) => axios.put('/plant/succulents/' + query._id, query)

export default {
  searchSucculentList,
  delSucculentById,
  addSucculent,
  getSucculentById,
  editSucculent
}

