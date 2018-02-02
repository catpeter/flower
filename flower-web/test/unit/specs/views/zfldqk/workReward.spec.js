import Vue from 'vue'
import ElementUI from 'element-ui'
import store from 'src/store'
import axios from 'axios'
import workReward from 'src/views/zfldqk/workReward'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('workReward', () => {
  const Constructor = Vue.extend({ ...workReward,
    store
  })
  const vm = new Constructor().$mount()

  it('getData操作', done => {
    const reply = new Promise(resolve => {
      resolve({
        data: {
          listCount: {results: 1},
          list: workRewardSearchList
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.get = data
    vm.getData().then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(workRewardSearchList)
      expect(vm.pagesCount).to.equal(1)
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
          results: initWorkReward
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.get = data
    vm.handleEdit(workRewardSearchList[0]).then(() => {
      expect(data.called).to.be.true
      expect(vm.workRewardForm.dialogFormVisible).to.be.true
      // expect(vm.workRewardForm.workReward).to.deep.equal(initWorkReward)
      done()
    })
  })

  it('saveWorkReward操作', done => {
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const data = sinon.stub().returns(mockPost)
    axios.post = data
    vm.saveWorkReward(vm.workRewardForm.workReward).then(() => {
      expect(data.called).to.be.true
      expect(vm.workRewardForm.dialogFormVisible).to.be.false
      done()
    })
  })
  beforeEach(() => {
    vm.$store.state.userInfo.userInfo = {
      area: '5993fcf823a4e96683015947',
      prison: '598a66fd23a4e966830158ea'
    }

    vm.workRewardForm = {
      workReward: {
        name: 'TEST2',
        area: '5993fd4923a4e96683015949',
        workerLevel: '',
        countActual: 0,
        basicPay: '310',
        levelPay: '130',
        modulusPay: '10',
        _id: '59ad027e9c407d2c64d1b1e5',
        policeManageId: '596eb7de01919d3bc0abeee1',
        prison: '598a66fd23a4e966830158ea',
        deleted: 0,
        areaName: '',
        countQuota: 0,
        rate: '0%',
        workLevel: '无等级',
        time: '2017-08',
        criminalId: '59a75cf51b00e65b0592304b',
        state: '积极',
        countPay: 440
      }
    }
  })
  const workRewardSearchList = [{
    _id: '59ad03aab826192ddcb30a30',
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
    levelPay: '130',
    basicPay: '310',
    modulusPay: 0,
    countPay: 440
  }]
  const initWorkReward = {
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
    levelPay: '130',
    basicPay: '310',
    modulusPay: 0,
    countPay: 440
  }
})
