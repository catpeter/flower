import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from 'src/store'
import VueRouter from 'vue-router'
import fullStaffBoardTable from 'src/views/kbgl/fullStaffBoardTable.vue'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(util)

describe('fullStaffBoardTable', () => {
  const Constructor = Vue.extend({ ...fullStaffBoardTable,
    store
  })
  const vm = new Constructor().$mount()

  it('getAllData操作', done => {
    let results = {
      data: {
        'count': 1,
        'data': []
      },
      date: '2017-10-19'
    }
    for (var j = 1; j <= 46; j++) {
      results.data.data.push({
        '_id': '59ae0dcc23a4e96683015b47'
      })
    }
    results.count = 46
    let reply = new Promise(resolve => {
      resolve({
        data: results
      })
    })
    let data = sinon.stub().returns(reply)
    axios.post = data
    vm.getAllData('asdasd', 'asdasd').then(() => {
      expect(data.called).to.be.true
      expect(vm.allData).to.deep.equal(results.data.data)
      done()
    })

    results = {
      data: {
        'count': 1,
        'data': []
      },
      date: '2017-10-19'
    }
    for (j = 1; j <= 23; j++) {
      results.data.data.push({
        '_id': '59ae0dcc23a4e96683015b47'
      })
    }
    results.count = 23
    reply = new Promise(resolve => {
      resolve({
        data: results
      })
    })
    data = sinon.stub().returns(reply)
    axios.post = data
    vm.getAllData('asdasd', 'asdasd').then(() => {
      expect(data.called).to.be.true
      expect(vm.allData).to.deep.equal(results.data.data)
      done()
    })
  })

  it('refresh操作', () => {
    vm.pageIndex = 1
    vm.allData = [[{a: '1'}], [{a: '1'}], [{a: '1'}], [{a: '1'}]]
    var clock = sinon.useFakeTimers()
    vm.refresh()
    clock.tick(1000 * 5)
  })

  it('systemTime操作', () => {
    var clock = sinon.useFakeTimers()
    vm.systemTime()
    clock.tick(1000)
    expect(vm.date).to.exist
  })

  it('getTime操作', () => {
    let dateTime = new Date('2017-09-06')
    vm.getTime(dateTime)
    expect(vm.date).to.equal('2017年09月06日 星期三')
  })

  it('extra操作', () => {
    let test = 1
    test = vm.extra(test)
    expect(test).to.equal('01')

    test = 10
    test = vm.extra(test)
    expect(test).to.equal(10)
  })

  it('combineCell操作', () => {
    const list = [
      {name: '1'},
      {name: '1'},
      {name: '1'},
      {name: '1'},
      {name: '1'}
    ]
    console.log(vm.combineCell(list)
  )
  })
})
