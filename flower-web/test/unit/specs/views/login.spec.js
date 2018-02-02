// 引用vue
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import { modules } from '../../../../src/store'
import axios from 'axios'
// 引用要测试的组件
import login from 'src/views/login.vue'

Vue.use(ElementUI)

// 要测试内容
describe('login', () => {
  // 这里将app生成vue实例，并使用 $mount() 模拟挂载状态
  const store = new Vuex.Store(modules)
  const Constructor = Vue.extend({ ...login,
    store
  })
  const vm = new Constructor().$mount()
  beforeEach(() => {
    vm.$store.state.userInfo.userInfo = {
      area: '5993fcf823a4e96683015947',
      prison: '598a66fd23a4e966830158ea'
    }
  })
  it('检查正常登录操作', function (done) {
    const mockGet = new Promise(resolve => {
      resolve({
        data: {
          data: {
            _id: '597830aaf866d03d70b95a2a',
            userId: '1',
            userName: 'admin',
            system: 2,
            prison: '598a66fd23a4e966830158ea',
            name: '王某',
            area: '5993fcf823a4e96683015947'
          }
        }
      })
    })
    const loginGet = sinon.stub().returns(mockGet)
    axios.post = loginGet
    vm.login().then(() => {
      expect(loginGet.called).to.be.true
      done()
    })
    const loginGetError = sinon.stub().threw('err')
    axios.post = loginGetError
    vm.login().catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })
  it('submitForm操作', done => {
    vm.userMes.userName = 'admin'
    vm.userMes.password = 'admin'
    vm.$refs.userMes.$nextTick(_ => {
      vm.userMes.userName = ''
      vm.userMes.password = ''
      vm.$refs.userMes.$nextTick(_ => {
        vm.submitForm('userMes')
        done()
      })
    })
  })
})
