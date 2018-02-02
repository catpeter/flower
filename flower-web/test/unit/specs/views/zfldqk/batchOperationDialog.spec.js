import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import { modules } from '../../../../../src/store'
import axios from 'axios'
import batchOperationDialog from 'src/views/zfldqk/batchOperationDialog'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('batchOperationDialog', () => {
  const store = new Vuex.Store(modules)
  const Constructor = Vue.extend({ ...batchOperationDialog,
    store
  })
  const vm = new Constructor().$mount()

  it('initCriminals操作', done => {
    vm.formatTime = '2017-11-15'
    vm.form = {project: '59b8c78b488ab6466be22d93', assemblyLine: '59b8f05c23a4e966830160a3'}
    const mockData = {
      data: [{
        actual: 500,
        areaId: '59b8a0241d9718e156ffb1d3',
        assemblyLine: '59b8f05c23a4e966830160a3',
        code: '36015',
        criminalId: '59b8e18764fe822fecaf08e1',
        name: '楼伟晓',
        postType: '辅助生产',
        prison: '598a66fd23a4e966830158ea',
        procedure: '盖子削毛',
        project: '59b8c78b488ab6466be22d93',
        quota: 1109,
        region: '59e6b92d23a4e9668301a901',
        time: '2017-11-15',
        workLevel: '三级工',
        _id: '5a0b989d23a4e9668301ad85'
      },
      {
        actual: 400,
        areaId: '59b8a0241d9718e156ffb1d3',
        assemblyLine: '59b8f05c23a4e966830160a3',
        code: '36015',
        criminalId: '59b8e18764fe822fecaf08e2',
        name: '李明明',
        postType: '直接生产',
        prison: '598a66fd23a4e966830158ea',
        procedure: '盖子削毛',
        project: '59b8c78b488ab6466be22d93',
        quota: 1109,
        region: '59e6b92d23a4e9668301a901',
        time: '2017-11-15',
        workLevel: '三级工',
        _id: '5a0b989d23a4e9668301ad83'
      }]
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const criminalData = sinon.stub().returns(mockPost)
    axios.post = criminalData
    vm.initCriminals().then(() => {
      expect(criminalData.called).to.be.true
      expect(vm.criminals).to.deep.equal(mockData.data)
      done()
    })
  })

  it('initProjects操作', done => {
    const mockData = {
      data: [{
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
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const projectData = sinon.stub().returns(mockPost)
    axios.post = projectData
    vm.initProjects({
      prison: '598a66fd23a4e966830158ea'
    }).then(() => {
      expect(projectData.called).to.be.true
      expect(vm.projects).to.deep.equal(mockData.data)
      done()
    })
  })

  it('filterMethod操作-首字母', () => {
    vm.filterMethod('lmm')
    vm.$nextTick(() => {
      expect(vm.pinyinCriminals).to.deep.equal(criminalFilters)
    })
  })

  it('filterMethod操作-首字', () => {
    vm.filterMethod('李')
    vm.$nextTick(() => {
      expect(vm.pinyinCriminals).to.deep.equal(criminalFilters)
    })
  })

  it('filterMethod操作-全拼', () => {
    vm.filterMethod('limingming')
    vm.$nextTick(() => {
      expect(vm.pinyinCriminals).to.deep.equal(criminalFilters)
    })
  })

  it('initAssemblyLines操作', done => {
    const mockData = {
      data: [{
        _id: '5993feec23a4e9668301594c',
        name: '三号流水线',
        area: '5993fcf823a4e96683015947'
      }]
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const lineData = sinon.stub().returns(mockPost)
    axios.get = lineData
    vm.initAssemblyLines().then(() => {
      expect(lineData.called).to.be.true
      vm.$nextTick()
      expect(vm.assemblyLines).to.deep.equal(mockData.data)
      done()
    })
  })

  it('submitForm操作', done => {
    vm.type = 'actual'
    vm.form = {actual: 100, quota: 50, criminals: ['59b8e18764fe822fecaf08e1']}
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const postData = sinon.stub().returns(mockPost)
    axios.post = postData
    vm.submitForm().then(() => {
      expect(postData.called).to.be.true
      expect(vm.dialogFormVisible).to.be.false
      done()
    })
  })
  const criminalFilters = [{
    actual: 400,
    areaId: '59b8a0241d9718e156ffb1d3',
    assemblyLine: '59b8f05c23a4e966830160a3',
    code: '36015',
    criminalId: '59b8e18764fe822fecaf08e2',
    name: '李明明',
    postType: '直接生产',
    prison: '598a66fd23a4e966830158ea',
    procedure: '盖子削毛',
    project: '59b8c78b488ab6466be22d93',
    quota: 1109,
    region: '59e6b92d23a4e9668301a901',
    time: '2017-11-15',
    workLevel: '三级工',
    _id: '5a0b989d23a4e9668301ad83'}]
})
