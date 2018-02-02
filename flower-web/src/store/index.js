import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/sys/userInfo'
import enumList from './modules/sys/enumList'
import succulent from './modules/plant/succulent'

Vue.use(Vuex)

export const modules = {
  modules: {
    userInfo,
    enumList,
    succulent
  }
}
export default new Vuex.Store(modules)
