import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from 'src/store'
import VueRouter from 'vue-router'
import fullStaffBoard from 'src/views/kbgl/fullStaffBoard.vue'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(util)

describe('fullStaffBoard', () => {
  const Constructor = Vue.extend({ ...fullStaffBoard,
    store
  })
  const vm = new Constructor().$mount()
  it('handleSizeChange操作', () => {
    // 改变页面大小
    vm.handleSizeChange(10)
    expect(vm.query.pageSize).to.equal(10)
  })

  it('handleCurrentChange操作', () => {
    // 改变页数
    vm.handleCurrentChange(2)
    expect(vm.query.pageIndex).to.equal(2)
  })

  it('getData操作', done => {
    vm.query.prison = '598a66fd23a4e966830158ea'
    let results = {
      data: {
        'count': 4,
        'data': [{
          '_id': '59ae0dcc23a4e96683015b47',
          'prison': '598a66fd23a4e966830158ea',
          'project': '',
          'procedure': '',
          'workLevel': '',
          'assemblyLine': '',
          'areaId': '5993fcf823a4e96683015947',
          'postType': '',
          'quota': 0,
          'criminalId': '59ad348237c6cc315485f09d',
          'time': '2017-09-05',
          'actual': 0,
          'name': '王五',
          'code': 10003,
          'yieldRatio': 0,
          'area': '一监区',
          'projectCode': '',
          'policeName': '张警官',
          'yieldRatioSum': 0
        }]
      },
      date: '2017-10-19'
    }
    let reply = new Promise(resolve => {
      resolve({
        data: results
      })
    })
    let data = sinon.stub().returns(reply)
    axios.post = data
    vm.getData().then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(results.data.data)
      done()
    })
  })
  it('extra操作', () => {
    let test = 1
    test = vm.extra(test)
    expect(test).to.equal('01')

    test = 10
    test = vm.extra(test)
    expect(test).to.equal(10)
  })

  it('getTime操作', () => {
    let date = new Date('2017-05-01')
    vm.query.date = null
    vm.getTime(date)
  })
})
