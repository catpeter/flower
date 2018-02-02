import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from 'src/store'
import confirmPerson from 'src/views/cqfxh/confirmPerson'
import util from 'src/util/util.js'
import echarts from 'echarts'
import routers from 'src/router/index'

Vue.use(ElementUI)
Vue.use(util)
Vue.use(echarts)

describe('confirmPerson', () => {
  const Constructor = Vue.extend({ ...confirmPerson,
    routers,
    store
  })

  const vm = new Constructor().$mount()

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
      expect(vm.assemblyLineList).to.deep.equal(mockData.data)
      done()
    })
  })

  it('initCriminals操作', done => {
    const mockData = {
      data: [{
        name: '包晨辉',
        _id: '599400ce9744420d184df495'
      }, {
        name: '王菲',
        _id: '599400ce9744420d184df496'
      }]
    }
    const reply = new Promise(resolve => {
      resolve(mockData)
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.initCriminals().then(() => {
      expect(data.called).to.be.true
      expect(vm.criminalList).to.equal(mockData.data)
      done()
    })
  })

  it('handleSizeChange操作', () => {
    vm.handleSizeChange(10)
    expect(vm.confirmPersonPagination.pageSize).to.equal(10)
  })

  it('handleCurrentChange操作', () => {
    vm.handleCurrentChange(2)
    expect(vm.confirmPersonPagination.pageIndex).to.equal(2)
  })

  it('getData操作', done => {
    const projectList = [{
      proName: '长江服装公司鞋子',
      _id: '599e86caeabc1f23087ee614',
      code: 'A0004',
      sampleImg: '../../static/upload/1503988411600.jpg',
      personNum: 2,
      personUpdateTime: '2017-08-30 17:48',
      procedures: [{
        name: '一号流水线',
        detail: [{
          pname: '工序1(100秒)',
          personnel: ['张三']
        }],
        Img: '../../static/upload/1503988411600.jpg'
      }]
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
    vm.getData(vm.confirmPersonPagination).then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(projectList)
      expect(vm.pagesCount).to.equal(1)
      done()
    })
  })

  it('handleEdit操作', done => {
    const mockData = {
      data: {
        proName: '长江服装公司鞋子',
        code: 'A0009',
        _id: '599e86caeabc1f23087ee614',
        procedures: [{
          name: '50',
          seconds: '10',
          unit: '',
          personnel: [],
          isDifficulty: 1
        }]
      }
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const addProjectDataPost = sinon.stub().returns(mockPost)
    axios.post = addProjectDataPost
    vm.handleEdit({
      _id: '599e86caeabc1f23087ee614'
    }).then(() => {
      expect(addProjectDataPost.called).to.be.true
      expect(vm.confirmPersonForm.confirmPerson.proName).to.equal(mockData.data.proName)
      expect(vm.confirmPersonForm.confirmPerson.code).to.equal(mockData.data.code)
      expect(vm.confirmPersonForm.confirmPerson._id).to.equal(mockData.data._id)
      expect(vm.confirmPersonForm.confirmPerson.procedures).to.equal(mockData.data.procedures)
      expect(vm.confirmPersonForm.dialogFormVisible).to.be.true
      done()
    })
  })

  it('getProcedure操作', () => {
    vm.getProcedure()
    expect(vm.confirmPersonProcedure.project).to.deep.equal(vm.confirmPersonForm.confirmPerson._id)
    expect(vm.confirmPersonProcedure.procedures).to.deep.equal(vm.confirmPersonForm.confirmPerson.procedures)
  })

  it('getProcedureList操作-有值', done => {
    const calDataStub = sinon.stub(vm, 'calData')
    const drawPicStub = sinon.stub(vm, 'drawPic')
    const mockData = {
      data: addProcedure
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const procedureData = sinon.stub().returns(mockPost)
    axios.post = procedureData
    vm.getProcedureList(vm.confirmPersonProcedure).then(() => {
      expect(procedureData.called).to.be.true
      expect(vm.addProcedures).to.deep.equal(mockData.data)
      done()
    })
    calDataStub.restore()
    drawPicStub.restore()
  })
  it('getProcedureList操作-无值', done => {
    const calDataStub = sinon.stub(vm, 'calData')
    const drawPicStub = sinon.stub(vm, 'drawPic')
    const mockDataNo = {
      data: []
    }
    const mockPostNo = new Promise(resolve => {
      resolve(mockDataNo)
    })
    const procedureDataNo = sinon.stub().returns(mockPostNo)
    axios.post = procedureDataNo
    vm.getProcedureList(vm.confirmPersonProcedure).then(() => {
      expect(procedureDataNo.called).to.be.true
      expect(vm.addProcedures).to.deep.equal([{
        name: '',
        seconds: '',
        personnel: []
      }])
      done()
    })
    calDataStub.restore()
    drawPicStub.restore()
  })
  it('choosePerson操作', () => {
    vm.index = -1
    vm.confirmPersonProcedure.assemblyLine = '5993feec23a4e9668301594c'
    vm.choosePerson(row)
    expect(vm.isSelect).to.be.false
  })

  it('submitProcedures操作', done => {
    const img = 'asdasdqwd54311d324qac' // base64图片
    const reply = new Promise(resolve => {
      resolve({
        data: {
          success: true,
          results: {
            ok: 1,
            nModified: 1,
            n: 1
          }
        }
      })
    })
    const res = sinon.stub().returns(reply)
    axios.post = res
    vm.submitProcedures(img).then(() => {
      expect(res.called).to.be.true
      expect(vm.confirmPersonForm.dialogFormVisible).to.be.false
      done()
    })
    const errdata = sinon.stub().threw('err')
    axios.post = errdata
    vm.submitProcedures(img).catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  it('handleShow操作', done => {
    let row = [{
      assemblyLineId: '5993feec23a4e9668301594c',
      project: '599e86caeabc1f23087ee614'
    }]
    const mockData = {
      data: [{
        pname: '工序1(100秒)',
        personnel: ['张三']
      }]
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const dataPost = sinon.stub().returns(mockPost)
    axios.post = dataPost
    vm.handleShow(row).then(() => {
      expect(dataPost.called).to.be.true
      expect(vm.dialogTableVisible).to.be.true
      expect(vm.dialogData).to.deep.equal(mockData.data)
      done()
    })
  })

  it('showPic操作', () => {
    const charImg = 'c://asdasd.png'
    vm.showPic(charImg)
    expect(vm.chartDialogVisible).to.be.true
    expect(vm.chartImg).to.equal(charImg)
  })

  it('calData操作', () => {
    vm.calData(addProcedure)
    expect(vm.data[0].name).to.equal(addProcedure[0].name + '(' + addProcedure[0].seconds + '秒)' + '\n' + '\n' + addProcedure[0].personnel[0].name + ',')
  })

  it('handleDelete操作', () => {
    vm.handleDelete({
      _id: '599400ce9744420d184df495',
      proName: '长江服装公司裤子'
    })
    expect(vm.projectDelName).to.equal('长江服装公司裤子')
    expect(vm._id).to.equal('599400ce9744420d184df495')
    expect(vm.dialogDelFormVisible).to.be.true
  })
  it('filterMethod操作-首字母', () => {
    vm.filterMethod('bch')
    vm.$nextTick(() => {
      expect(vm.criminalBackUp).to.deep.equal([{
        name: '包晨辉',
        _id: '599400ce9744420d184df495'
      }])
    })
  })

  it('filterMethod操作-首字', () => {
    vm.filterMethod('包')
    vm.$nextTick(() => {
      expect(vm.criminalBackUp).to.deep.equal([{
        name: '包晨辉',
        _id: '599400ce9744420d184df495'
      }])
    })
  })

  it('filterMethod操作-全拼', () => {
    vm.filterMethod('baochenhui')
    vm.$nextTick(() => {
      expect(vm.criminalBackUp).to.deep.equal([{
        name: '包晨辉',
        _id: '599400ce9744420d184df495'
      }])
    })
  })

  it('handleApply操作', done => {
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const projectDataPost = sinon.stub().returns(mockPost)
    axios.post = projectDataPost
    vm.handleApply({
      _id: '599e86caeabc1f23087ee614'
    }).then(() => {
      expect(projectDataPost.called).to.be.true
      done()
    })
  })
  it('delConfirmPerson操作', done => {
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const delProjectDataPost = sinon.stub().returns(mockPost)
    axios.post = delProjectDataPost
    vm.delConfirmPerson({
      _id: '599e86caeabc1f23087ee614'
    }).then(() => {
      expect(delProjectDataPost.called).to.be.true
      expect(vm.dialogDelFormVisible).to.be.false
      done()
    })
    // Error Handling
    const delProjectError = sinon.stub().threw('err')
    axios.post = delProjectError
    vm.delConfirmPerson().catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })
  beforeEach(() => {
    vm.criminalList = [{
      name: '包晨辉',
      _id: '599400ce9744420d184df495'
    }, {
      name: '王菲',
      _id: '599400ce9744420d184df496'
    }]
    vm.confirmPersonProcedure = {
      assemblyLine: '5993feec23a4e9668301594c',
      project: '599e86caeabc1f23087ee614',
      procedures: [{
        name: '50',
        seconds: '10',
        unit: '',
        personnel: [],
        isDifficulty: 1
      }]
    }
    vm._id = '599400ce9744420d184df495'
    vm.$store.state.userInfo.userInfo = {
      area: '5993fcf823a4e96683015947',
      prison: '598a66fd23a4e966830158ea'
    }
    vm.confirmPersonForm.confirmPerson = {
      _id: '599e86caeabc1f23087ee614',
      procedures: [{
        name: 'asdf',
        personnel: [{
          name: '张三',
          _id: '5994019479db5630e8a2e6ae'
        }]
      }]
    }
  })
  var addProcedure = [{
    name: 'asdf',
    seconds: '10',
    personnel: [{
      name: '张三',
      _id: '59a75cf51b00e65b0592304b'
    }]
  }]
  var row = {
    name: 'asdf',
    seconds: '10',
    personnel: [{
      name: '张三',
      _id: '59a75cf51b00e65b0592304b'
    }]
  }
})
