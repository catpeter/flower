import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from 'src/store'
import measureHour from 'src/views/cqfxh/measureHour'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('measureHour', () => {
  const Constructor = Vue.extend({ ...measureHour,
    store
  })
  const vm = new Constructor().$mount()
  beforeEach(() => {
    vm.$store.state.userInfo.userInfo = {
      area: '5993fcf823a4e96683015947',
      prison: '598a66fd23a4e966830158ea'
    }
    vm.measureHourPagination = {
      pageIndex: 1,
      pageSize: 5,
      prison: '598a66fd23a4e966830158ea',
      keyword: '长江',
      workHourDateStart: '2017-08-20 17:37',
      workHourDateEnd: '2017-08-30 17:37',
      workHourSign: true
    }
  })
  it('handleSizeChange操作', () => {
    vm.handleSizeChange(10)
    expect(vm.measureHourPagination.pageSize).to.equal(10)
  })

  it('handleCurrentChange操作', () => {
    vm.handleCurrentChange(2)
    expect(vm.measureHourPagination.pageIndex).to.equal(2)
  })

  it('getData操作', done => {
    const projectList = [{
      _id: '599e86caeabc1f23087ee614',
      proName: '长江服装公司鞋子',
      proType: '日用品',
      code: 'A0004',
      prison: '598a66fd23a4e966830158ea',
      createTime: '2017-08-24 15:56',
      deleted: 0,
      sampleImg: '../../static/upload/1503988411600.jpg',
      productImg: '../../static/upload/1503988212071.jpg',
      processDetail: '舒适',
      sampleName: '鞋子',
      sampleCreateTime: '2017-08-28 11:18',
      procedures: [{
        name: '50',
        seconds: '10',
        unit: '',
        personnel: [],
        isDifficulty: 1
      }],
      procedureCreateTime: '2017-08-30 17:37',
      chartImg: '../../static/upload/1504085847000.png',
      difficultyCreateTime: '2017-08-31 09:23',
      difficultyImg: '../../static/upload/1504142634000.png',
      leader: '111',
      workHours: 111,
      criminal: [{
        name: '张三',
        _id: '59a63f403841581658d88dfb'
      }],
      police: [{
        name: '李明',
        _id: '596eb7de01919d3bc0abeee1'
      }],
      workHourCreateTime: '2017-08-30 17:37',
      productNum: 50,
      startDate: '2017-08-30',
      endDate: '2017-08-31',
      everyDayNum: 25,
      planCreateTime: '2017-08-31 09:24',
      personUpdateTime: '2017-08-30 17:48',
      personNum: 2
    }]
    const reply = new Promise(resolve => {
      resolve({
        data: {
          count: 1,
          data: projectList
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.getData().then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(projectList)
      expect(vm.pagesCount).to.equal(1)
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

  it('initCriminal操作', done => {
    const mockData = {
      data: [{
        _id: '59a75cf51b00e65b0592304b',
        name: 'TEST2',
        area: '5993fd4923a4e96683015949'
      }]
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const criminalData = sinon.stub().returns(mockPost)
    axios.post = criminalData
    vm.initCriminal().then(() => {
      expect(criminalData.called).to.be.true
      expect(vm.criminalList).to.deep.equal(mockData.data)
      done()
    })
  })

  it('handleAdd操作', () => {
    vm.handleAdd()
    expect(vm.measureHourForm.dialogFormVisible).to.be.true
    expect(vm.measureHourForm.projectListVisible).to.be.true
  })

  it('initMeasureHour操作', done => {
    const mockData = {
      data: {
        proName: '长江服装公司鞋子',
        proId: '599e86caeabc1f23087ee614',
        leader: '111',
        workHours: 111,
        polices: [{
          name: '张某',
          _id: '59b8d3ae1d9718e156ffb1d7'
        }],
        criminals: [{
          name: '阿萨德',
          _id: '59a63f403841581658d88dfb'
        }],
        workHourCreateTime: '2017-08-30 17:37'
      }
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const projectData = sinon.stub().returns(mockPost)
    axios.post = projectData
    vm.initMeasureHour({
      _id: '599e86caeabc1f23087ee614'
    }).then(() => {
      expect(projectData.called).to.be.true
      expect(vm.measureHourForm.measureHour).to.deep.equal(mockData.data)
      done()
    })
  })

  it('handleEdit操作', () => {
    vm.handleEdit({
      _id: '59a3711f0151fa2dc480444f'
    })
    expect(vm.measureHourForm.dialogFormVisible).to.be.true
    expect(vm.measureHourForm.projectListVisible).to.be.false
  })

  it('submitForm操作', done => {
    vm.$refs.measureHourForm.$nextTick(_ => {
      vm.measureHourForm.measureHour = {
        proName: '长江帽子',
        proId: '123',
        polices: [{
          name: '张三',
          _id: '123'
        }],
        criminals: [{
          name: '李四',
          _id: '15555'
        }],
        leader: '王厂长',
        workHours: 5
      }
      vm.$refs.measureHourForm.$nextTick(_ => {
        vm.submitForm('measureHourForm')
        vm.measureHourForm.measureHour = {
          proName: '',
          proId: '',
          polices: [],
          criminals: [],
          leader: '',
          workHours: 0
        }
        vm.$refs.measureHourForm.$nextTick(_ => {
          vm.submitForm('measureHourForm')
        })
      })
      done()
    })
  })

  it('saveProject操作', done => {
    vm.measureHourForm.measureHour = {
      proName: '长江服装公司鞋子',
      proId: '599e86caeabc1f23087ee614',
      polices: [{
        name: '张某',
        _id: '59b8d3ae1d9718e156ffb1d7'
      }],
      criminals: [{
        name: '阿萨德',
        _id: '59a63f403841581658d88dfb'
      }],
      leader: '王厂长',
      workHours: 50,
      workHourCreateTime: '2017-08-31 09:24'
    }
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const addProjectDataPost = sinon.stub().returns(mockPost)
    axios.post = addProjectDataPost
    vm.saveProject().then(() => {
      expect(addProjectDataPost.called).to.be.true
      expect(vm.measureHourForm.dialogFormVisible).to.be.false
      expect(vm.measureHourForm.addFormVisible).to.be.false
      done()
    })
  })

  it('handleDelete操作', () => {
    vm.handleDelete({
      _id: '599400ce9744420d184df495',
      proName: '长江服装公司裤子'
    })
    expect(vm.projectDelName).to.equal('长江服装公司裤子')
    expect(vm.proId).to.equal('599400ce9744420d184df495')
    expect(vm.dialogDelFormVisible).to.be.true
  })

  it('delMeasureHour操作', done => {
    vm._id = '599400ce9744420d184df495'
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const delProjectDataPost = sinon.stub().returns(mockPost)
    axios.post = delProjectDataPost
    vm.delMeasureHour().then(() => {
      expect(delProjectDataPost.called).to.be.true
      expect(vm.dialogDelFormVisible).to.be.false
      done()
    })
    // Error Handling
    const delProjectError = sinon.stub().threw('err')
    axios.post = delProjectError
    vm.delMeasureHour().catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })
})
