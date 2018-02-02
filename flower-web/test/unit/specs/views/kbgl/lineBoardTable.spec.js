import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import { modules } from '../../../../../src/store'
import Vuex from 'vuex'
import lineBoardTable from 'src/views/kbgl/lineBoardTable'
import util from 'src/util/util.js'
import routers from 'src/router/index'

Vue.use(ElementUI)
Vue.use(util)

describe('lineBoardTable', () => {
  const store = new Vuex.Store(modules)
  const Constructor = Vue.extend({ ...lineBoardTable,
    store,
    routers
  })
  const vm = new Constructor().$mount()
  beforeEach(() => {
    vm.$store.state.userInfo.userInfo = {
      area: '59b8a0241d9718e156ffb1d3',
      prison: '598a66fd23a4e966830158ea'
    }
  })
  it('getData操作', done => {
    const mockData = {
      data: lineData
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const projectData = sinon.stub().returns(mockPost)
    axios.post = projectData
    vm.getData('59b8f05c23a4e966830160a3').then(() => {
      expect(projectData.called).to.be.true
      expect(vm.line).to.equal(mockData.data)
      done()
    })
  })
  // it('refresh操作', () => {
  //   var clock = sinon.useFakeTimers()
  //   // var spy = sinon.spy(vm.getTime())
  //   vm.refresh()
  //   clock.tick(60000)
  //   expect(vm.line).to.exist
  //   // console.log(spy.called)
  //   // expect(spy.called).to.be.true
  // })

  it('systemTime操作', () => {
    var clock = sinon.useFakeTimers()
    vm.systemTime()
    clock.tick(1000)
    expect(vm.date).to.exist
  })

  it('extra操作', () => {
    let test = 1
    test = vm.extra(test)
    expect(test).to.equal('01')

    test = 10
    test = vm.extra(test)
    expect(test).to.equal(10)
  })

  var lineData = {
    _id: '59ba40ef546fec1a204440d2',
    police: { policeName: '黄炎龙', policeId: '59b8d3ae1d9718e156ffb1d7' },
    everyHourNum: [ 10, 10, 0, 0, 0, 0, 0, 0, 0, 0 ],
    quota: 100,
    project: { projectId: '59b8ca60488ab6466be22d97', sampleName: '5572' },
    assemblyLine: '59b8f05c23a4e966830160a3',
    date: '2017-09-14'
  }
})
