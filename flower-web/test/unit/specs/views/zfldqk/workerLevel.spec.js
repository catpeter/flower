import Vue from 'vue'
import ElementUI from 'element-ui'
import store from 'src/store'
import axios from 'axios'
import workerLevel from 'src/views/zfldqk/workerLevel'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('workerLevel', () => {
  const Constructor = Vue.extend({ ...workerLevel,
    store
  })
  const vm = new Constructor().$mount()

  it('workLevel操作', () => {
    vm.workLevel()
    expect(vm.workerLevelDialog).to.be.true
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

  it('handleSizeChange操作', () => {
    vm.handleSizeChange(10)
    expect(vm.pagination.pageSize).to.equal(10)
  })

  it('handleCurrentChange操作', () => {
    vm.handleCurrentChange(2)
    expect(vm.pagination.pageIndex).to.equal(2)
  })

  it('handleEdit操作', done => {
    const reply = new Promise(resolve => {
      resolve({
        data: {
          results: initWorkerLevel
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.get = data
    vm.handleEdit(workerLevelSearchList[0]).then(() => {
      expect(data.called).to.be.true
      expect(vm.workerLevelForm.dialogFormVisible).to.be.true
      done()
    })
  })

  it('handleDelete操作', () => {
    vm.handleDelete(workerLevelSearchList[0])
    expect(vm.dialogDelFormVisible).to.be.true
    expect(vm.id).to.deep.equal(workerLevelSearchList[0]._id)
  })

  it('deleteWorkerLevel操作', done => {
    const mockGet = new Promise(resolve => {
      resolve()
    })
    const data = sinon.stub().returns(mockGet)
    axios.get = data
    vm.deleteWorkerLevel().then(() => {
      expect(data.called).to.be.true
      expect(vm.dialogDelFormVisible).to.be.false
      done()
    })
  })

  it('saveWorkerLevel操作', done => {
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const data = sinon.stub().returns(mockPost)
    axios.post = data
    vm.saveWorkerLevel().then(() => {
      expect(data.called).to.be.true
      expect(vm.workerLevelForm.dialogFormVisible).to.be.false
      done()
    })
  })

  it('getData操作', done => {
    const reply = new Promise(resolve => {
      resolve({
        data: {
          listCount: {results: 1},
          list: workerLevelSearchList
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.get = data
    vm.getData().then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(workerLevelSearchList)
      expect(vm.pagesCount).to.equal(1)
      done()
    })
  })

  it('submitForm操作', done => {
    vm.$refs.workerLevelForm.$nextTick(_ => {
      vm.workerLevelForm.workerLevel = {
        name: 'TEST2',
        code: 'a2222',
        area: '5993fd4923a4e96683015949',
        rate: '0%',
        workLevel: '无等级',
        state: '积极'
      }
      vm.$refs.workerLevelForm.$nextTick(_ => {
        vm.submitForm('workerLevelForm')
        vm.workerLevelForm.workerLevel = {
          name: '',
          code: '',
          area: '',
          rate: '',
          workLevel: '',
          state: ''
        }
        vm.$refs.workerLevelForm.$nextTick(_ => {
          vm.submitForm('workerLevelForm')
        })
      })
      done()
    })
  })

  // it('reset操作', () => {
  //   vm.reset()
  //   expect(vm.pagination).to.deep.equal(pageData)
  // })
  beforeEach(() => {
    vm.id = '59ad03aab826192ddcb30a30'

    vm.$store.state.userInfo.userInfo = {
      area: '5993fcf823a4e96683015947',
      prison: '598a66fd23a4e966830158ea'
    }

    vm.workerLevelForm = {
      workerLevel: {
        name: 'TEST2',
        code: 'a2222',
        area: '5993fd4923a4e96683015949',
        rate: '0%',
        workLevel: '无等级',
        state: '积极'
      }
    }
  })
  const workerLevelSearchList = [{
    _id: '59ad027e9c407d2c64d1b1e5',
    name: 'TEST2',
    code: 'a2222',
    policeManageId: '596eb7de01919d3bc0abeee1',
    prison: '598a66fd23a4e966830158ea',
    area: '5993fd4923a4e96683015949',
    deleted: 0,
    areaName: '',
    countQuota: 0,
    countActual: 0,
    rate: '0%',
    workLevel: '无等级',
    time: '2017-08',
    criminalId: '59a75cf51b00e65b0592304b',
    state: '积极',
    workerLevel: '',
    countPay: 440
  }, {
    _id: '59ad03aab826192ddcb30a2e',
    name: '古惑仔',
    code: '',
    policeManageId: '',
    prison: '598a66fd23a4e966830158ea',
    area: '',
    deleted: 0,
    areaName: '',
    countQuota: 0,
    countActual: 0,
    rate: '0%',
    workLevel: '无等级',
    time: '2017-08',
    criminalId: '59a63f713841581658d88e1d',
    state: '积极'}]

  const initWorkerLevel = {
    _id: '59ad027e9c407d2c64d1b1e5',
    name: 'TEST2',
    code: 'a2222',
    policeManageId: '596eb7de01919d3bc0abeee1',
    prison: '598a66fd23a4e966830158ea',
    area: '5993fd4923a4e96683015949',
    deleted: 0,
    areaName: '',
    countQuota: 0,
    countActual: 0,
    rate: '0%',
    workLevel: '无等级',
    time: '2017-08',
    criminalId: '59a75cf51b00e65b0592304b',
    state: '积极',
    workerLevel: '',
    countPay: 440
  }
  // const pageData = {
  //   pageIndex: '',
  //   pageSize: '',
  //   code: '',
  //   workLevel: '',
  //   area: '',
  //   startTime: '',
  //   endTime: '',
  //   prison: ''
  // }
})

