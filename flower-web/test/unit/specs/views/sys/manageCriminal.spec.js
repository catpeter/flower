import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import axios from 'axios'
import { modules } from '../../../../../src/store'
import manageCriminal from 'src/views/sys/manageCriminal'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('manageCriminal', () => {
  const store = new Vuex.Store(modules)
  const Constructor = Vue.extend({ ...manageCriminal,
    store
  })
  const vm = new Constructor().$mount()
  beforeEach(() => {
    vm.$store.state.userInfo.userInfo = {
      area: '5993fcf823a4e96683015947',
      prison: '598a66fd23a4e966830158ea',
      region: '59e6b92d23a4e9668301a902'
    }

    vm.$store.state.userInfo.policeList = [
      {
        _id: '59b8d3ae1d9718e156ffb1d7',
        name: '张某',
        area: '59b8a0241d9718e156ffb1d3',
        prison: '598a66fd23a4e966830158ea',
        region: '59e6b92d23a4e9668301a902',
        assemblyLine: '59b8f05c23a4e966830160a3',
        deleted: 0
      }
    ]
    vm.criminalPagination = {
      pageIndex: 1,
      pageSize: 5,
      prison: '598a66fd23a4e966830158ea',
      keyword: '张三'
    }
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
        deleted: 0
      }]
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const policeData = sinon.stub().returns(mockPost)
    axios.post = policeData
    vm.initPolices().then(() => {
      expect(policeData.called).to.be.true
      expect(vm.policeList).to.deep.equal(mockData.data)
      done()
    })
  })

  it('initRegions操作', done => {
    const mockData = {
      data: [{
        _id: '59e6b92d23a4e9668301a901',
        name: '东区',
        area: '59b8a0241d9718e156ffb1d3',
        prison: '598a66fd23a4e966830158ea'
      }]
    }
    const mockGet = new Promise(resolve => {
      resolve(mockData)
    })
    const regionData = sinon.stub().returns(mockGet)
    axios.get = regionData
    vm.initRegions().then(() => {
      expect(regionData.called).to.be.true
      expect(vm.regionList).to.deep.equal(mockData.data)
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
      expect(vm.assemblyLineList).to.deep.equal(mockData.data)
      done()
    })
  })

  it('handleSizeChange操作', () => {
    vm.handleSizeChange(10)
    expect(vm.criminalPagination.pageSize).to.equal(10)
  })

  it('setRegionForm操作', () => {
    vm.setRegionForm('59b8d3ae1d9718e156ffb1d7')
    expect(vm.criminalForm.region).to.equal('59e6b92d23a4e9668301a902')
  })

  it('setRegion操作', () => {
    vm.setRegion('59b8d3ae1d9718e156ffb1d7')
    expect(vm.criminalPagination.region).to.equal('59e6b92d23a4e9668301a902')
  })

  it('setPoliceFormList操作', () => {
    vm.criminalForm.policeManageId = '59b8d3ae1d9718e156ffb1d7'
    vm.criminalPagination.assemblyLine = '59b8f05c23a4e966830160a2'
    vm.setPoliceFormList('59e6b92d23a4e9668301a901')
    expect(vm.criminalForm.policeManageId).to.equal('')
    expect(vm.criminalForm.assemblyLine).to.equal('')
  })

  it('setPoliceList操作', () => {
    vm.criminalPagination.policeManageId = '59b8d3ae1d9718e156ffb1d7'
    vm.criminalPagination.assemblyLine = '59b8f05c23a4e966830160a2'
    vm.setPoliceList('59e6b92d23a4e9668301a901')
    expect(vm.criminalPagination.assemblyLine).to.equal('')
    expect(vm.criminalPagination.policeManageId).to.equal('')
  })

  it('handleCurrentChange操作', () => {
    vm.handleCurrentChange(2)
    expect(vm.criminalPagination.pageIndex).to.equal(2)
  })

  it('handleAdd操作', done => {
    vm.handleAdd()
    vm.$nextTick(_ => {
      expect(vm.dialogFormVisible).to.be.true
      vm.$refs.criminalForm.$nextTick(_ => {
        expect(vm.criminalForm.region).to.equal('59e6b92d23a4e9668301a902')
        done()
      })
    })
  })

  it('getData操作', done => {
    const criminalList = [{
      area: '59b8a0241d9718e156ffb1d3',
      areaName: '三监区',
      assemblyLineName: '一号流水线',
      assemblyLine: '59b8f05c23a4e966830160a3',
      code: '04138',
      deleted: 0,
      name: '刘胜',
      policeManageId: '59b8d3ae1d9718e156ffb1e3',
      policeName: '郑迪',
      prison: '598a66fd23a4e966830158ea',
      region: 'wangxu',
      regionName: '西区',
      workLevel: '一级工',
      _id: '59b8e18764fe822fecaf08e4'
    }]
    const reply = new Promise(resolve => {
      resolve({
        data: {
          count: 1,
          data: criminalList
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.getData().then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(criminalList)
      expect(vm.pagesCount).to.equal(1)
      done()
    })
  })

  it('handleEdit操作', done => {
    const criminal = {
      area: '59b8a0241d9718e156ffb1d3',
      code: '04138',
      deleted: 0,
      name: '刘胜',
      assemblyLine: '59b8f05c23a4e966830160a3',
      policeManageId: '59b8d3ae1d9718e156ffb1e3',
      prison: '598a66fd23a4e966830158ea',
      region: '59e6b92d23a4e9668301a902',
      workLevel: '一级工',
      _id: '59b8e18764fe822fecaf08e4'
    }
    const reply = new Promise(resolve => {
      resolve({
        data: criminal
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.handleEdit({
      _id: '59b8e18764fe822fecaf08e4'
    }).then(() => {
      expect(vm.dialogFormVisible).to.be.true
      expect(vm.criminalForm).to.deep.equal(criminal)
      done()
    })
  })
  it('submitForm操作', done => {
    vm.dialogFormVisible = true
    vm.criminalForm.area = '59b8a0241d9718e156ffb1d3'
    vm.criminalForm.code = '04138'
    vm.criminalForm.deleted = 0
    vm.criminalForm.name = '刘胜'
    vm.criminalForm.assemblyLine = '59b8f05c23a4e966830160a3'
    vm.criminalForm.policeManageId = '59b8d3ae1d9718e156ffb1d7'
    vm.criminalForm.prison = '598a66fd23a4e966830158ea'
    vm.criminalForm.region = '59e6b92d23a4e9668301a902'
    vm.criminalForm.workLevel = '一级工'
    vm.criminalForm._id = '59b8e18764fe822fecaf08e4'
    vm.$nextTick(_ => {
      vm.$refs.criminalForm.$nextTick(_ => {
        vm.submitForm('criminalForm')
        vm.criminalForm.area = ''
        vm.criminalForm.code = ''
        vm.criminalForm.deleted = 0
        vm.criminalForm.name = ''
        vm.criminalForm.policeManageId = ''
        vm.criminalForm.prison = ''
        vm.criminalForm.region = ''
        vm.criminalForm.workLevel = ''
        vm.criminalForm._id = ''
        vm.criminalForm.assemblyLine = ''
        vm.$refs.criminalForm.$nextTick(_ => {
          vm.submitForm('criminalForm')
          done()
        })
      })
    })
  })

  it('saveCriminal操作', done => {
    vm.criminalForm = {
      area: '59b8a0241d9718e156ffb1d3',
      code: '04138',
      deleted: 0,
      name: '刘胜',
      assemblyLine: '59b8f05c23a4e966830160a3',
      policeManageId: '59b8d3ae1d9718e156ffb1e3',
      prison: '598a66fd23a4e966830158ea',
      region: '59e6b92d23a4e9668301a902',
      workLevel: '一级工',
      _id: '59b8e18764fe822fecaf08e4'
    }
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const data = sinon.stub().returns(mockPost)
    axios.post = data
    vm.saveCriminal().then(() => {
      expect(data.called).to.be.true
      expect(vm.dialogFormVisible).to.be.false
      done()
    })
  })

  it('handleDelete操作', () => {
    const row = {
      _id: '599400ce9744420d184df495',
      name: '张三'
    }
    vm.handleDelete(row)
    expect(vm.dialogDelFormVisible).to.be.true
    expect(vm.criminalId).to.equal(row._id)
    expect(vm.criminalName).to.equal(row.name)
  })

  it('delCriminal操作', done => {
    vm.criminalId = '599400ce9744420d184df495'
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const delCriminalPost = sinon.stub().returns(mockPost)
    axios.post = delCriminalPost
    vm.delCriminal().then(() => {
      expect(delCriminalPost.called).to.be.true
      expect(vm.dialogDelFormVisible).to.be.false
      done()
    })
    // Error Handling
    const delCriminalError = sinon.stub().threw('err')
    axios.post = delCriminalError
    vm.delCriminal().catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })
  it('importCriminal操作', done => {
    const reply = new Promise(resolve => {
      resolve({
        data: {
          success: true,
          results: {ok: 1, nModified: 1, n: 1}
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.importCriminal('111').then(() => {
      expect(data.called).to.be.true
      done()
    })
    const errdata = sinon.stub().threw('err')
    axios.post = errdata
    vm.importCriminal('111').catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  // it('handleImport操作成功', () => {
  //   const criminal = {
  //     area: '59b8a0241d9718e156ffb1d3',
  //     code: '04138',
  //     deleted: 0,
  //     name: '刘胜',
  //     policeManageId: '59b8d3ae1d9718e156ffb1e3',
  //     prison: '598a66fd23a4e966830158ea',
  //     region: '59e6b92d23a4e9668301a902',
  //     workLevel: '一级工',
  //     _id: '59b8e18764fe822fecaf08e4'
  //   }
  //   sinon.stub(manageCriminal, 'analysisFile').returns(criminal)
  //   vm.handleImport('111')
  //   sinon.restore()
  // })
})
