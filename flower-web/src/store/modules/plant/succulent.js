import api from '../../../service'

const state = {
}

const actions = {
  async addSucculent (_, form) {
    await api.succulent.addSucculent(form)
    return
  },
  async editSucculent (_, form) {
    await api.succulent.editSucculent(form)
    return
  },
  async getSucculent (_, succulentId) {
    const result = (await api.succulent.getSucculentById(succulentId)).data
    return result
  },
  async searchSucculentList (_, query) {
    const result = (await api.succulent.searchSucculentList(query)).data
    return result
  },
  async delSucculent (_, succulentId) {
    const result = await api.succulent.delSucculentById(succulentId)
    return result
  }
}

const mutations = {
}

export default {
  state,
  actions,
  mutations
}
