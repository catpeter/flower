import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from 'src/store'
import managePolice from 'src/views/sys/managePolice'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('managePolice', () => {
  const Constructor = Vue.extend({ ...managePolice,
    store
  })
  const vm = new Constructor().$mount()
  vm.$store.state.userInfo.userInfo = {
    area: '5993fcf823a4e96683015947',
    prison: '598a66fd23a4e966830158ea'
  }
  beforeEach(() => {
    vm.policePagination = {
      pageIndex: 1,
      pageSize: 5,
      prison: '',
      area: '',
      region: '',
      keyword: '',
      assemblyLine: ''
    }
  })
  it('handleSizeChange操作', () => {
    vm.handleSizeChange(10)
    expect(vm.policePagination.pageSize).to.equal(10)
  })

  it('handleCurrentChange操作', () => {
    vm.handleCurrentChange(2)
    expect(vm.policePagination.pageIndex).to.equal(2)
  })

  it('getData操作', done => {
    vm.userInfo.region = 'asdasdasdasd'
    const policeList = [{
      '_id': '59b8d3ae1d9718e156ffb1d7',
      'name': 'wer2',
      'area': '59b8a0241d9718e156ffb1d3',
      'prison': '598a66fd23a4e966830158ea',
      'region': '59e6b92d23a4e9668301a902',
      'assemblyLine': '59b8f05c23a4e966830160a3',
      'deleted': 0,
      'areaName': '三监区',
      'regionName': '西区',
      'assemblyLineName': '一号流水线'
    }]
    const reply = new Promise(resolve => {
      resolve({
        data: {
          count: 1,
          data: policeList
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.getData().then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(policeList)
      expect(vm.pagesCount).to.equal(1)
      done()
    })
  })

  it('handleDelete操作', () => {
    const row = {
      _id: '111',
      name: '111'
    }
    vm.handleDelete(row)
    expect(vm.dialogDelFormVisible).to.be.true
    expect(vm.policeId).to.equal('111')
    expect(vm.policeName).to.equal('111')
  })

  it('resetPoliceSelect操作', () => {
    vm.resetPoliceSelect()
    expect(vm.alterPolice).to.equal('')
  })

  it('resetLineSelect操作', () => {
    vm.resetLineSelect()
  })

  it('handleAdd操作', () => {
    const row = {
      _id: '111',
      name: '111'
    }
    vm.handleAdd(row)
  })

  it('delPoliceById操作', done => {
    vm.policeId = 1
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
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.delPoliceById(vm.policeId).then(() => {
      expect(data.called).to.be.true
      expect(vm.dialogDelFormVisible).to.be.false
      done()
    })
    const errdata = sinon.stub().threw('err')
    axios.post = errdata
    vm.delPoliceById(vm.policeId).catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  it('importPolice操作', done => {
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
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.importPolice('111').then(() => {
      expect(data.called).to.be.true
      done()
    })
    const errdata = sinon.stub().threw('err')
    axios.post = errdata
    vm.importPolice('111').catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  it('handleEdit操作', done => {
    const row = {
      _id: '1321654'
    }
    const police = {
      '_id': '59b8d3ae1d9718e156ffb1e3',
      'name': '郑迪',
      'area': '59b8a0241d9718e156ffb1d3',
      'prison': '598a66fd23a4e966830158ea',
      'region': '59e6b92d23a4e9668301a902',
      'assemblyLine': '59b8f05c23a4e966830160a3',
      'deleted': 0
    }
    const reply = new Promise(resolve => {
      resolve({
        data: police
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.handleEdit(row).then(() => {
      expect(data.called).to.be.true
      expect(vm.policeForm.title).to.equal('编辑警员信息')
      expect(vm.policeForm.police).to.deep.equal(police)
      expect(vm.policeForm.dialogFormVisible).to.be.true
      done()
    })
  })

  it('savePolice操作', done => {
    vm.policeForm.police = {
      prison: 'prison',
      region: 'region',
      name: 'name',
      assemblyLine: 'assemblyLine',
      area: 'area',
      alterPolice: 'alterPolice',
      takenPolice: 'takenPolice'
    }
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
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.savePolice().then(() => {
      expect(data.called).to.be.true
      expect(vm.policeForm.dialogFormVisible).to.be.false
      done()
    })
    const errdata = sinon.stub().threw('err')
    axios.post = errdata
    vm.savePolice().catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  it('submitForm操作(有数据)', done => {
    vm.policeForm = {
      police: {
        prison: 'prison',
        region: 'region',
        name: 'name',
        assemblyLine: 'assemblyLine',
        area: 'area',
        alterPolice: 'alterPolice',
        takenPolice: 'takenPolice'
      }
    }
    vm.$refs.policeForm.$nextTick(_ => {
      vm.submitForm('policeForm')
      done()
    })
  })

  it('submitForm操作(无数据)', done => {
    vm.policeForm = {
      police: {
        prison: '',
        region: '',
        name: '',
        assemblyLine: '',
        area: '',
        alterPolice: '',
        takenPolice: ''
      }
    }
    vm.$refs.policeForm.$nextTick(_ => {
      vm.submitForm('policeForm')
      done()
    })
  })
})
