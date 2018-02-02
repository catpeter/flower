import Vue from 'vue'
import ElementUI from 'element-ui'
import store from 'src/store'
import axios from 'axios'
import workHours from 'src/views/zfldqk/workHours'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('workHours', () => {
  const Constructor = Vue.extend({ ...workHours,
    store
  })
  const vm = new Constructor().$mount()

  it('initAreas操作', done => {
    const mockData = {
      data: [{
        _id: '5993fd4923a4e96683015949',
        name: '三监区',
        prison: '598a66fd23a4e966830158ea'
      }]
    }
    const mockGet = new Promise(resolve => {
      resolve(mockData)
    })
    const areasData = sinon.stub().returns(mockGet)
    axios.get = areasData
    vm.initAreas().then(() => {
      expect(areasData.called).to.be.true
      expect(vm.areas).to.deep.equal(mockData.data)
      done()
    })
  })

  it('handleSizeChange操作', () => {
    const stub = sinon.stub(vm, 'getData')
    vm.handleSizeChange(10)
    expect(vm.pageSize).to.equal(10)
    stub.restore()
  })

  it('handleCurrentChange操作', () => {
    const stub = sinon.stub(vm, 'getData')
    vm.handleCurrentChange(2)
    expect(vm.pageIndex).to.equal(2)
    expect(vm.currentpage).to.equal(2)
    stub.restore()
  })

  it('getData操作', done => {
    vm.pageSize = 10
    vm.pageIndex = 2
    vm.code = '10001'
    vm.area = '5993fcf823a4e96683015947'
    vm.postType = '直接'
    vm.police = '12345'
    vm.assemblyLine = '12345'
    vm.project = '12345'
    const reply = new Promise(resolve => {
      resolve({
        data: {
          count: 2,
          data: searchDeterminePostsList
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.getData().then(() => {
      expect(data.called).to.be.true
      expect(vm.workHours).to.deep.equal(searchDeterminePostsList)
      expect(vm.pageCount).to.equal(2)
      done()
    })
  })

  it('initAreas操作', done => {
    const mockData = {
      data: [{
        _id: '5993fd4923a4e96683015949',
        name: '三监区',
        prison: '598a66fd23a4e966830158ea'
      }]
    }
    const mockGet = new Promise(resolve => {
      resolve(mockData)
    })
    const areasData = sinon.stub().returns(mockGet)
    axios.get = areasData
    vm.initAreas().then(() => {
      expect(areasData.called).to.be.true
      expect(vm.areas).to.deep.equal(mockData.data)
      done()
    })
  })

  it('initPolices操作', done => {
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
    vm.initPolices().then(() => {
      expect(policeData.called).to.be.true
      expect(vm.polices).to.deep.equal(mockData.data)
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

  it('initAssemblyLines操作', done => {
    const mockData = {
      data: [{
        _id: '59b8f05c23a4e966830160a3',
        area: '59b8a0241d9718e156ffb1d3',
        deleted: 0,
        region: '59e6b92d23a4e9668301a902'
      }]
    }
    const mockGet = new Promise(resolve => {
      resolve(mockData)
    })
    const assemblyLineData = sinon.stub().returns(mockGet)
    axios.get = assemblyLineData
    vm.initAssemblyLines().then(() => {
      expect(assemblyLineData.called).to.be.true
      expect(vm.assemblyLines).to.deep.equal(mockData.data)
      done()
    })
  })

  it('closeDialog操作', () => {
    const stub = sinon.stub(vm, 'getData')
    vm.closeDialog()
    expect(vm.dialogFormVisible).to.be.false
    stub.restore()
  })

  it('importDeterminePost操作', done => {
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const importData = sinon.stub().returns(mockPost)
    axios.post = importData
    vm.importDeterminePost('111').then(() => {
      expect(importData.called).to.be.true
      done()
    })
    // Error Handling
    const importError = sinon.stub().threw()
    axios.post = importError
    vm.importDeterminePost('111').catch()
    done()
  })

  it('save操作', done => {
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const determinePostData = sinon.stub().returns(mockPost)
    axios.post = determinePostData
    vm.save(vm.workHours[0]).then(() => {
      expect(determinePostData.called).to.be.true
      done()
    })
    // Error Handling
    // const saveError = sinon.stub().threw()
    // axios.post = saveError
    // vm.save(vm.workHours[0]).catch()
    // done()
  })

  const searchDeterminePostsList = [
    {
      assemblyLine: '48956',
      areaId: '5993fcf823a4e96683015947',
      postType: '直接',
      quota: 0,
      criminalId: '5994019479db5630e8a2e6ae',
      time: '2017-09-05',
      actual: 0,
      name: '张三',
      code: 10001,
      yieldRatio: 0,
      area: '一监区'
    },
    {
      _id: '59b037a123a4e96683015b59',
      prison: '598a66fd23a4e966830158ea',
      project: '599e86caeabc1f23087ee614',
      procedure: '561',
      workLevel: '',
      assemblyLine: '5993feec23a4e9668301594a',
      areaId: '5993fcf823a4e96683015947',
      postType: '直接生产',
      quota: 700,
      criminalId: '59ad348237c6cc315485f09e',
      time: '2017-09-07',
      actual: 0,
      name: '刘六',
      code: 10006,
      yieldRatio: 0,
      projectCode: 'A0004',
      area: '一监区'
    }
  ]
  beforeEach(() => {
    vm.workHours = [{
      actual: 500,
      area: '三监区',
      areaId: '59b8a0241d9718e156ffb1d3',
      assemblyLine: '59b8f05c23a4e966830160a3',
      assemblyLineName: '一号流水线',
      code: '36015',
      criminalId: '59b8e18764fe822fecaf08e1',
      name: '楼伟晓',
      police: '59b8d3ae1d9718e156ffb1e3',
      policeName: '郑迪',
      postType: '辅助生产',
      prison: '598a66fd23a4e966830158ea',
      procedure: '盖子削毛',
      project: '59b8c78b488ab6466be22d93',
      projectCode: 'R11-821',
      quota: 1109,
      region: '59e6b92d23a4e9668301a901',
      regionName: '东区',
      time: '2017-11-15',
      workLevel: '三级工',
      _id: '5a0b989d23a4e9668301ad85'
    }]
  })
})

