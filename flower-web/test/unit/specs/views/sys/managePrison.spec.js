import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from 'src/store'
import managePrison from 'src/views/sys/managePrison'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('managePolice', () => {
  const Constructor = Vue.extend({ ...managePrison,
    store
  })
  const vm = new Constructor().$mount()

  it('handleSizeChange操作', () => {
    vm.handleSizeChange(10)
    expect(vm.prisonPagination.pageSize).to.equal(10)
  })

  it('handleCurrentChange操作', () => {
    vm.handleCurrentChange(2)
    expect(vm.prisonPagination.pageIndex).to.equal(2)
  })

  it('getDate操作', done => {
    const priosnListRes = {
      'count': 15,
      'data': [
        {
          '_id': '59a3b07c23a4e966830159ad',
          'name': '五角场监狱',
          'img': 'http://192.168.65.88:8060/upload/prison/0ae7f2f0-ba2c-11e7-8420-99a2b0dfe8ef.jpg',
          'deleted': 0
        },
        {
          '_id': '59a3b09723a4e966830159ae',
          'name': '周浦监狱',
          'img': 'http://192.168.65.88:8060/upload/prison/85f66310-ba26-11e7-a956-05be0b998c46.jpg',
          'deleted': 0
        },
        {
          '_id': '59a3b0c723a4e966830159af',
          'name': '北新泾监狱',
          'img': 'http://192.168.65.88:8060/upload/prison/8afeafc0-ba26-11e7-a956-05be0b998c46.jpg',
          'deleted': 0
        },
        {
          '_id': '59a3b0e223a4e966830159b0',
          'name': '白茅岭监狱',
          'img': 'http://192.168.65.88:8060/upload/prison/9195b2c0-ba26-11e7-a956-05be0b998c46.jpg',
          'deleted': 0
        },
        {
          '_id': '59a3b0f123a4e966830159b1',
          'name': '军天湖监狱',
          'img': 'http://192.168.65.88:8060/upload/prison/99fce1e0-ba26-11e7-a956-05be0b998c46.jpg',
          'deleted': 0
        }
      ]
    }
    const reply = new Promise(resolve => {
      resolve({
        data: priosnListRes
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.getData().then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(priosnListRes.data)
      expect(vm.pagesCount).to.equal(15)
      done()
    })
  })

  it('handleDel操作', () => {
    const row = {
      _id: '111',
      name: '111'
    }
    vm.handleDel(row)
    expect(vm.delDialogFormVisible).to.be.true
    expect(vm.prisonId).to.equal('111')
    expect(vm.prisonName).to.equal('111')
  })

  it('handleAdd操作', () => {
    const row = {
      _id: '111',
      name: '111'
    }
    vm.handleAdd(row)
    expect(vm.prisonForm.dialogFormVisible).to.be.true
    expect(vm.prisonForm.title).to.equal('新增监狱')
  })

  it('delPrisonById操作', done => {
    vm.prisonId = 1
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
    vm.delPrisonById(vm.prisonId).then(() => {
      expect(data.called).to.be.true
      expect(vm.delDialogFormVisible).to.be.false
      done()
    })
    const errdata = sinon.stub().threw('err')
    axios.post = errdata
    vm.delPrisonById(vm.prisonId).catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  it('handleEdit操作', done => {
    const row = {
      _id: '59a3b07c23a4e966830159ad'
    }
    const prison = {
      '_id': '59a3b07c23a4e966830159ad',
      'name': '五角场监狱',
      'img': 'http://192.168.65.88:8060/upload/prison/0ae7f2f0-ba2c-11e7-8420-99a2b0dfe8ef.jpg',
      'deleted': 0
    }
    const reply = new Promise(resolve => {
      resolve({
        data: prison
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.handleEdit(row).then(() => {
      expect(data.called).to.be.true
      expect(vm.prisonForm.prison).to.deep.equal(prison)
      done()
    })
  })

  it('submitForm操作(有数据)', done => {
    vm.prisonForm = {
      prison: {
        '_id': '59a3b07c23a4e966830159ad',
        'name': '五角场监狱',
        'img': 'http://192.168.65.88:8060/upload/prison/0ae7f2f0-ba2c-11e7-8420-99a2b0dfe8ef.jpg',
        'deleted': 0
      }
    }
    vm.$refs.prisonForm.$nextTick(_ => {
      vm.submitForm('prisonForm')
      done()
    })
  })

  it('submitForm操作(无数据)', done => {
    vm.prisonForm = {
      prison: {
        '_id': '',
        'name': '',
        'img': '',
        'deleted': 0
      }
    }
    vm.$refs.prisonForm.$nextTick(_ => {
      vm.submitForm('prisonForm')
      done()
    })
  })
})
