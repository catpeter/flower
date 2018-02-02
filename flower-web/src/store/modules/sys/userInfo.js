import api from '../../../service'
import * as types from '../../mutation-types'
import {
  getToken
} from '../../../util/auth'

const state = {
  userInfo: {},
  token: getToken()
}

const actions = {
  async login ({
    commit
  }, loginInfo) {
    const userInfo = (await api.userInfo.login(loginInfo)).data
    commit(types.SET_USERINFO, userInfo.data)
  },
  async changeUserInfo ({
    commit
  }, userInfo) {
    commit(types.SET_USERINFO, userInfo)
  },
  async getUserInfo ({
    commit
  }) {
    const userInfo = (await api.userInfo.getUserInfo()).data
    commit(types.SET_USERINFO, userInfo)
  },
  changeToPath ({commit}, toPath) {
    commit(types.SET_TOPATH, toPath)
  }
}

const mutations = {
  [types.SET_USERINFO] (state, data) {
    state.userInfo = data
  },
  [types.SET_TOPATH] (state, data) {
    state.toPath = data
  }
}

export default {
  state,
  actions,
  mutations
}
