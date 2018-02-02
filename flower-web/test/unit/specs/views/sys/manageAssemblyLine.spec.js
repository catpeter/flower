import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import axios from 'axios'
import sinon from 'sinon'
import {
  modules
} from '../../../../../src/store'
import manageAssemblyLine from 'src/views/sys/manageAssemblyLine'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('manageAssemblyLine', () => {
  const store = new Vuex.Store(modules)
  const Constructor = Vue.extend({ ...manageAssemblyLine,
    store
  })
  const vm = new Constructor().$mount()
  beforeEach(() => {
    vm.assemblyLinePagination = {
      pageIndex: 1,
      pageSize: 5,
      area: '59b8a0241d9718e156ffb1d3',
      name: '一号',
      region: '59e6b92d23a4e9668301a902'
    }
  })
  it('initAreas操作', done => {
    const mockData = {
      data: [{
        _id: '5993fd4923a4e96683015949',
        name: '三监区',
        prison: '598a66fd23a4e966830158ea',
        areaImg: '',
        deleted: 0
      }]
    }
    const mockGet = new Promise(resolve => {
      resolve(mockData)
    })
    const areasData = sinon.stub().returns(mockGet)
    axios.get = areasData
    vm.initAreas().then(() => {
      expect(areasData.called).to.be.true
      expect(vm.areaList).to.deep.equal(mockData.data)
      done()
    })
  })

  it('initRegions操作', done => {
    const mockData = {
      data: [{
        _id: '59e6b92d23a4e9668301a902',
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

  it('handleSizeChange操作', () => {
    vm.handleSizeChange(10)
    expect(vm.assemblyLinePagination.pageSize).to.equal(10)
  })

  it('handleCurrentChange操作', () => {
    vm.handleCurrentChange(2)
    expect(vm.assemblyLinePagination.pageIndex).to.equal(2)
  })

  it('setAreaForm操作', () => {
    vm.setAreaForm('59e6b92d23a4e9668301a902')
    expect(vm.assemblyLineForm.assemblyLine.area).to.equal('59b8a0241d9718e156ffb1d3')
  })

  it('setArea操作', () => {
    vm.setArea('59e6b92d23a4e9668301a902')
    expect(vm.assemblyLinePagination.area).to.equal('59b8a0241d9718e156ffb1d3')
  })

  it('setRegionFormList操作', () => {
    vm.assemblyLineForm.assemblyLine.region = '59e6b92d23a4e9668301a902'
    vm.setRegionFormList('59b8a0241d9718e156ffb1d6')
    expect(vm.assemblyLineForm.assemblyLine.region).to.equal('')
  })

  it('setRegionList操作', () => {
    vm.assemblyLinePagination.region = '59e6b92d23a4e9668301a902'
    vm.setRegionList('59b8a0241d9718e156ffb1d6')
    expect(vm.assemblyLinePagination.region).to.equal('')
  })

  it('handleAdd操作', done => {
    vm.$store.state.userInfo.userInfo = {
      userName: 'admin',
      area: '59b8a0241d9718e156ffb1d3',
      prison: '598a66fd23a4e966830158ea',
      region: '59e6b92d23a4e9668301a902'
    }
    vm.handleAdd()
    vm.$nextTick(_ => {
      expect(vm.assemblyLineForm.dialogFormVisible).to.be.true
      vm.$refs.assemblyLineForm.$nextTick(_ => {
        expect(vm.assemblyLineForm.assemblyLine.region).to.equal('59e6b92d23a4e9668301a902')
        expect(vm.assemblyLineForm.assemblyLine.area).to.equal('59b8a0241d9718e156ffb1d3')
        done()
      })
    })
  })

  it('getData操作', done => {
    const assemblyLineList = [{
      name: '一号流水线',
      deleted: 0,
      area: '59b8a0241d9718e156ffb1d3',
      region: '59e6b92d23a4e9668301a902',
      _id: '59b8f05c23a4e966830160a3'
    }]
    const reply = new Promise(resolve => {
      resolve({
        data: {
          count: 1,
          data: assemblyLineList
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.getData().then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(assemblyLineList)
      expect(vm.pagesCount).to.equal(1)
      done()
    })
  })

  it('handleEdit操作', done => {
    const assemblyLine = {
      name: '一号流水线',
      deleted: 0,
      area: '59b8a0241d9718e156ffb1d3',
      region: '59e6b92d23a4e9668301a902',
      _id: '59b8f05c23a4e966830160a3'
    }
    const reply = new Promise(resolve => {
      resolve({
        data: assemblyLine
      })
    })
    const data = sinon.stub().returns(reply)
    axios.get = data
    vm.handleEdit({
      _id: '59b8f05c23a4e966830160a3'
    }).then(() => {
      expect(data.called).to.be.true
      expect(vm.assemblyLineForm.dialogFormVisible).to.be.true
      expect(vm.assemblyLineForm.assemblyLine).to.deep.equal(assemblyLine)
      done()
    })
  })

  it('submitForm操作', done => {
    vm.dialogFormVisible = true
    vm.assemblyLineForm.prison = '598a66fd23a4e966830158ea'
    vm.assemblyLineForm.deleted = 0
    vm.assemblyLineForm.name = '三监区'
    vm.assemblyLineForm._id = '59b8a0241d9718e156ffb1d3'
    vm.$nextTick(_ => {
      vm.$refs.assemblyLineForm.$nextTick(_ => {
        vm.submitForm('assemblyLineForm')
        vm.assemblyLineForm.prison = ''
        vm.assemblyLineForm.deleted = 0
        vm.assemblyLineForm.name = ''
        vm.assemblyLineForm._id = ''
        vm.$refs.assemblyLineForm.$nextTick(_ => {
          vm.submitForm('assemblyLineForm')
          done()
        })
      })
    })
  })

  it('saveAssemblyLine操作', done => {
    vm.assemblyLineForm.assemblyLine = {
      name: '一号流水线',
      deleted: 0,
      area: '59b8a0241d9718e156ffb1d3',
      region: '59e6b92d23a4e9668301a902',
      _id: '59b8f05c23a4e966830160a3'
    }
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const data = sinon.stub().returns(mockPost)
    axios.post = data
    vm.saveAssemblyLine().then(() => {
      expect(data.called).to.be.true
      expect(vm.assemblyLineForm.dialogFormVisible).to.be.false
      done()
    })
  })

  it('handleDelete操作', () => {
    const row = {
      name: '一号流水线',
      _id: '59b8f05c23a4e966830160a3'
    }
    vm.handleDelete(row)
    expect(vm.dialogDelFormVisible).to.be.true
    expect(vm.assemblyLineId).to.equal(row._id)
    expect(vm.assemblyLineName).to.equal(row.name)
  })

  it('delAssemblyLine操作', done => {
    vm.assemblyLineId = '59b8f05c23a4e966830160a3'
    const mockPost = new Promise(resolve => {
      resolve({
        data: true
      })
    })
    const delAssemblyLinePost = sinon.stub().returns(mockPost)
    axios.post = delAssemblyLinePost
    vm.delAssemblyLine().then(() => {
      expect(delAssemblyLinePost.called).to.be.true
      expect(vm.dialogDelFormVisible).to.be.false
      done()
    })
    // Error Handling
    const delAssemblyLineError = sinon.stub().threw('err')
    axios.post = delAssemblyLineError
    vm.delAssemblyLine().catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })
})
