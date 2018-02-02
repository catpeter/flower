import api from '../../../service'
import * as types from '../../mutation-types'

const state = {
  grownList: [],
  breedList: [],
  reproductiveList: []
}

const actions = {
  async listGrown ({
    commit
  }) {
    const result = (await api.enumList.listGrown()).data
    commit(types.GET_GROWNS, result)
  },
  async listBreed ({
    commit
  }) {
    const result = (await api.enumList.listBreed()).data
    commit(types.GET_BREEDS, result)
  },
  async listReproductive ({
    commit
  }) {
    const result = (await api.enumList.listReproductive()).data
    commit(types.GET_REPRODUCTIVES, result)
  }
}

const mutations = {
  [types.GET_GROWNS] (state, data) {
    state.grownList = data
  },
  [types.GET_BREEDS] (state, data) {
    state.breedList = data
  },
  [types.GET_REPRODUCTIVES] (state, data) {
    state.reproductiveList = data
  }
}

export default {
  state,
  actions,
  mutations
}
