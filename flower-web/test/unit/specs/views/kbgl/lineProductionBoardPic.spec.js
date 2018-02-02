import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import axios from 'axios'
import { modules } from '../../../../../src/store'
import VueRouter from 'vue-router'
import lineProductionBoardPic from 'src/views/kbgl/lineProductionBoardPic.vue'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(util)

describe('lineProductionBoardPic', () => {
  const store = new Vuex.Store(modules)
  const Constructor = Vue.extend({ ...lineProductionBoardPic, store
  })
  const vm = new Constructor().$mount()
  beforeEach(() => {
    vm.$store.state.userInfo.userInfo = {
      area: '59b8a0241d9718e156ffb1d3',
      prison: '598a66fd23a4e966830158ea'
    }
  })
  it('getPic操作', done => {
    let reply = new Promise(resolve => {
      resolve({
        data: 'picUrl'
      })
    })
    let data = sinon.stub().returns(reply)
    axios.post = data
    vm.getPic('asdasdad').then(() => {
      expect(data.called).to.be.true
      expect(vm.picUrl).to.equal('picUrl')
      done()
    })
    reply = new Promise(resolve => {
      resolve({
        data: ''
      })
    })
    data = sinon.stub().returns(reply)
    axios.post = data
    vm.getPic().then(() => {
      expect(data.called).to.be.true
      expect(vm.picUrl).to.equal('')
      done()
    })
  })
})

