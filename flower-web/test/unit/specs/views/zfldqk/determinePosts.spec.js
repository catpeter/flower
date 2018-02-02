import Vue from 'vue'
import ElementUI from 'element-ui'
import store from 'src/store'
import axios from 'axios'
import determinePosts from 'src/views/zfldqk/determinePosts'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('determinePosts', () => {
  const Constructor = Vue.extend({ ...determinePosts,
    store
  })
  const vm = new Constructor().$mount()

  it('handleSizeChange操作', () => {
    vm.handleSizeChange(10)
    expect(vm.pageSize).to.equal(10)
  })

  it('handleCurrentChange操作', () => {
    vm.handleCurrentChange(2)
    expect(vm.pageIndex).to.equal(2)
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
      expect(vm.determinePosts).to.deep.equal(searchDeterminePostsList)
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

  it('initProjects操作', done => {
    const mockData = {
      data: listProjectsByPrison
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

  it('initPoliceList操作', done => {
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
    vm.initPoliceList().then(() => {
      expect(policeData.called).to.be.true
      expect(vm.policeList).to.deep.equal(mockData.data)
      done()
    })
  })

  it('save操作-更新', done => {
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const determinePostData = sinon.stub().returns(mockPost)
    axios.post = determinePostData
    vm.save(vm.determinePosts[0]).then(() => {
      expect(determinePostData.called).to.be.true
      done()
    })
    // Error Handling
    const saveError = sinon.stub().threw()
    axios.post = saveError
    vm.save(vm.determinePosts[0]).catch()
    done()
  })

  it('save操作-新增', done => {
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const query = {
      actual: 0,
      area: '一监区',
      areaId: '5993fcf823a4e96683015947',
      assemblyLine: '5993feec23a4e9668301594a',
      code: 10001,
      criminalId: '5994019479db5630e8a2e6ae',
      name: '张三',
      postType: '直接生产',
      prison: '598a66fd23a4e966830158ea',
      procedure: '52',
      project: '599e86caeabc1f23087ee614',
      projectCode: 'A0004',
      quota: 300,
      time: '2017-09-07',
      workLevel: '',
      yieldRatio: 0 }
    const determinePostData = sinon.stub().returns(mockPost)
    axios.post = determinePostData
    vm.save(query).then(() => {
      expect(determinePostData.called).to.be.true
      done()
    })
    // Error Handling
    const saveError = sinon.stub().threw()
    axios.post = saveError
    vm.save(query).catch()
    done()
  })

  it('handleDelete操作', () => {
    const row = {
      _id: '59b8a0241d9718e156ffb1d3'
    }
    vm.handleDelete(row)
    expect(vm.dialogDelFormVisible).to.be.true
    expect(vm.determinePostId).to.equal(row._id)
  })

  it('delDeterminePost操作-保存过', done => {
    vm.determinePostId = vm.determinePosts[0]._id
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const criminalData = sinon.stub().returns(mockPost)
    axios.post = criminalData
    vm.delDeterminePost().then(() => {
      expect(criminalData.called).to.be.true
      expect(vm.dialogDelFormVisible).to.be.false
      done()
    })
    // Error Handling
    const delError = sinon.stub().threw()
    axios.post = delError
    vm.delDeterminePost().catch()
    done()
  })

  it('delDeterminePost操作-未保存', () => {
    vm.determinePostId = ''
    vm.delDeterminePost()
    expect(vm.determinePosts).to.deep.equal(delDeterminePosts)
    expect(vm.dialogDelFormVisible).to.be.false
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
    const saveError = sinon.stub().threw()
    axios.post = saveError
    vm.importDeterminePost('111').catch()
    done()
  })

  it('handleUpload操作', () => {
    let response = {message: 'Upload'}
    let file
    let fileList = []
    vm.handleUpload(response, file, fileList)
  })
  beforeEach(() => {
    vm.$store.state.userInfo.userInfo = {
      area: '5993fcf823a4e96683015947',
      prison: '598a66fd23a4e966830158ea'
    }

    vm.determinePosts = [{
      actual: 0,
      area: '一监区',
      areaId: '5993fcf823a4e96683015947',
      assemblyLine: '5993feec23a4e9668301594a',
      code: 10001,
      criminalId: '5994019479db5630e8a2e6ae',
      name: '张三',
      postType: '直接生产',
      prison: '598a66fd23a4e966830158ea',
      procedure: '52',
      project: '599e86caeabc1f23087ee614',
      projectCode: 'A0004',
      quota: 300,
      time: '2017-09-07',
      workLevel: '',
      yieldRatio: 0,
      _id: '59b037a123a4e96683015b57'
    }, {
      actual: 0,
      area: '一监区',
      areaId: '5993fcf823a4e96683015947',
      assemblyLine: '5993feec23a4e9668301594a',
      code: 10001,
      criminalId: '5994019479db5630e8a2e6ae',
      name: '张三',
      postType: '直接生产',
      prison: '598a66fd23a4e966830158ea',
      procedure: '52',
      project: '599e86caeabc1f23087ee614',
      projectCode: 'A0004',
      quota: 300,
      time: '2017-09-07',
      workLevel: '',
      yieldRatio: 0,
      _id: ''
    }]
  })
  const delDeterminePosts = [{
    actual: 0,
    area: '一监区',
    areaId: '5993fcf823a4e96683015947',
    assemblyLine: '5993feec23a4e9668301594a',
    code: 10001,
    criminalId: '5994019479db5630e8a2e6ae',
    name: '张三',
    postType: '直接生产',
    prison: '598a66fd23a4e966830158ea',
    procedure: '52',
    project: '599e86caeabc1f23087ee614',
    projectCode: 'A0004',
    quota: 300,
    time: '2017-09-07',
    workLevel: '',
    yieldRatio: 0,
    _id: '59b037a123a4e96683015b57'
  }]
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
  const listProjectsByPrison = [{
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
