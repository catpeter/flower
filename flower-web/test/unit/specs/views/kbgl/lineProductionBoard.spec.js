import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import { modules } from '../../../../../src/store'
import Vuex from 'vuex'
import lineProductionBoard from 'src/views/kbgl/lineProductionBoard'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('lineProductionBoard', () => {
  const store = new Vuex.Store(modules)
  const Constructor = Vue.extend({ ...lineProductionBoard,
    store
  })
  const vm = new Constructor().$mount()
  beforeEach(() => {
    vm.$store.state.userInfo.userInfo = {
      area: '59b8a0241d9718e156ffb1d3',
      prison: '598a66fd23a4e966830158ea',
      region: '59e6b92d23a4e9668301a902'
    }
  })
  it('initAssemblyLines操作', done => {
    const mockData = {
      data: [{ _id: '5993feec23a4e9668301594c', name: '三号流水线', area: '5993fcf823a4e96683015947', region: '59e6b92d23a4e9668301a902' }]
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const lineData = sinon.stub().returns(mockPost)
    axios.get = lineData
    vm.initAssemblyLines().then(() => {
      expect(lineData.called).to.be.true
      expect(vm.assemblyLineList).to.deep.equal(mockData.data)
      done()
    })
  })

  it('initProjects操作', done => {
    const mockData = {
      data: projects
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const projectData = sinon.stub().returns(mockPost)
    axios.post = projectData
    vm.initProjects().then(() => {
      expect(projectData.called).to.be.true
      expect(vm.projects).to.deep.equal(mockData.data)
      done()
    })
  })

  it('initPolice操作', done => {
    const mockData = {
      data: [{
        _id: '59b8d3ae1d9718e156ffb1d7',
        name: '张某',
        area: '59b8a0241d9718e156ffb1d3',
        prison: '598a66fd23a4e966830158ea',
        region: '59e6b92d23a4e9668301a902',
        assemblyLine: '59b8f05c23a4e966830160a3',
        deleted: 0}]
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const policeData = sinon.stub().returns(mockPost)
    axios.post = policeData
    vm.initPolice().then(() => {
      expect(policeData.called).to.be.true
      expect(vm.policemen).to.deep.equal(mockData.data)
      done()
    })
  })

  it('useTable操作', done => {
    vm.assemblyLineId = '59b8f05c23a4e966830160a3'
    const mockData = {
      data: lineData
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const projectData = sinon.stub().returns(mockPost)
    axios.post = projectData
    vm.useTable().then(() => {
      expect(projectData.called).to.be.true
      expect(vm.line).to.equal(mockData.data)
      done()
    })
  })

  it('submitForm操作', done => {
    vm.lineProductionForm.lineData = lineData
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const addDataPost = sinon.stub().returns(mockPost)
    axios.post = addDataPost
    vm.submitForm().then(() => {
      expect(addDataPost.called).to.be.true
      expect(vm.dialogVisible).to.be.false
      done()
    })
  })

  it('handleEdit操作', () => {
    vm.line = lineData
    vm.handleEdit()
    expect(vm.dialogVisible).to.be.true
    expect(vm.lineProductionForm.lineData).to.deep.equal(vm.line)
  })

  it('initDefault操作-region', () => {
    vm.userInfo.region = '59e6b92d23a4e9668301a902'
    vm.assemblyLineList = [{_id: '5993feec23a4e9668301594c', name: '三号流水线', area: '5993fcf823a4e96683015947', region: '59e6b92d23a4e9668301a902'}]
    vm.initDefault()
    expect(vm.lineUrl).to.equal('/#/lineBoardTable/5993feec23a4e9668301594c')
  })

  it('initDefault操作', () => {
    vm.userInfo.region = ''
    vm.assemblyLineList = [{_id: '5993feec23a4e9668301594c', name: '三号流水线', area: '5993fcf823a4e96683015947', region: '59e6b92d23a4e9668301a902'}]
    vm.initDefault()
    expect(vm.lineUrl).to.equal('/#/lineBoardTable/5993feec23a4e9668301594c')
  })

  // it('systemTime操作', () => {
  // })

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

  var projects = [{
    _id: '59a3711f0151fa2dc480444f',
    proName: '长江服装公司test',
    proType: '日用品',
    code: 'A0007',
    prison: '598a66fd23a4e966830158ea',
    createTime: '2017-08-28 09:25',
    deleted: 0,
    leader: '',
    workHours: '',
    criminal: [],
    police: [],
    workHourCreateTime: null,
    sampleImg: '',
    productImg: '',
    processDetail: '',
    sampleName: '100',
    sampleCreateTime: '2017-08-30 13:52',
    procedures: [],
    procedureCreateTime: '2017-08-29 09:40',
    chartImg: '',
    personUpdateTime: null,
    personNum: ''
  }]
})
