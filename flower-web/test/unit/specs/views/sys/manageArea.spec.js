import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import axios from 'axios'
import { modules } from '../../../../../src/store'
import manageArea from 'src/views/sys/manageArea'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('manageArea', () => {
  const store = new Vuex.Store(modules)
  const Constructor = Vue.extend({ ...manageArea,
    store
  })
  const vm = new Constructor().$mount()
  beforeEach(() => {
    vm.areaPagination = {
      pageIndex: 1,
      pageSize: 5,
      prison: '598a66fd23a4e966830158ea',
      keyword: '宝山'
    }
  })
  it('initPrisons操作', done => {
    const mockData = {
      data: [{
        _id: '598a66fd23a4e966830158ea',
        name: '宝山监狱',
        img: '',
        deleted: 0
      }]
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const prisonData = sinon.stub().returns(mockPost)
    axios.get = prisonData
    vm.initPrisons().then(() => {
      expect(prisonData.called).to.be.true
      expect(vm.prisonList).to.deep.equal(mockData.data)
      done()
    })
  })

  it('handleSizeChange操作', () => {
    vm.handleSizeChange(10)
    expect(vm.areaPagination.pageSize).to.equal(10)
  })

  it('handleCurrentChange操作', () => {
    vm.handleCurrentChange(2)
    expect(vm.areaPagination.pageIndex).to.equal(2)
  })

  it('handleAdd操作', done => {
    vm.handleAdd()
    vm.$nextTick(_ => {
      expect(vm.areaForm.dialogFormVisible).to.be.true
      vm.$refs.areaForm.$nextTick(_ => {
        expect(vm.areaForm.area.prison).to.equal('598a66fd23a4e966830158ea')
        done()
      })
    })
  })

  it('getData操作', done => {
    const areaList = [{
      prison: '598a66fd23a4e966830158ea',
      name: '三监区',
      _id: '59b8a0241d9718e156ffb1d3'
    }]
    const reply = new Promise(resolve => {
      resolve({
        data: {
          count: 1,
          data: areaList
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.getData().then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(areaList)
      expect(vm.pagesCount).to.equal(1)
      done()
    })
  })

  it('handleEdit操作', done => {
    const area = {
      name: '三监区',
      deleted: 0,
      prison: '598a66fd23a4e966830158ea',
      _id: '59b8a0241d9718e156ffb1d3'
    }
    const reply = new Promise(resolve => {
      resolve({
        data: area
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.handleEdit({
      _id: '59b8a0241d9718e156ffb1d3'
    }).then(() => {
      expect(vm.areaForm.dialogFormVisible).to.be.true
      expect(vm.areaForm.area).to.deep.equal(area)
      done()
    })
  })

  it('submitForm操作', done => {
    vm.dialogFormVisible = true
    vm.areaForm.prison = '598a66fd23a4e966830158ea'
    vm.areaForm.deleted = 0
    vm.areaForm.name = '三监区'
    vm.areaForm._id = '59b8a0241d9718e156ffb1d3'
    vm.$nextTick(_ => {
      vm.$refs.areaForm.$nextTick(_ => {
        vm.submitForm('areaForm')
        vm.areaForm.prison = ''
        vm.areaForm.deleted = 0
        vm.areaForm.name = ''
        vm.areaForm._id = ''
        vm.$refs.areaForm.$nextTick(_ => {
          vm.submitForm('areaForm')
          done()
        })
      })
    })
  })

  it('saveArea操作', done => {
    vm.areaForm.area = {
      areaImg: '59b8a0241d9718e156ffb1d3',
      code: '04138',
      name: '三监区',
      _id: '59b8a0241d9718e156ffb1d3'
    }
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const data = sinon.stub().returns(mockPost)
    axios.post = data
    vm.saveArea().then(() => {
      expect(data.called).to.be.true
      expect(vm.areaForm.dialogFormVisible).to.be.false
      done()
    })
  })

  it('handleDelete操作', () => {
    const row = {
      _id: '59b8a0241d9718e156ffb1d3',
      name: '三监区'
    }
    vm.handleDelete(row)
    expect(vm.dialogDelFormVisible).to.be.true
    expect(vm.areaId).to.equal(row._id)
    expect(vm.areaName).to.equal(row.name)
  })

  it('delArea操作', done => {
    vm.areaId = '59b8a0241d9718e156ffb1d3'
    const mockPost = new Promise(resolve => {
      resolve({
        data: true
      })
    })
    const delAreaPost = sinon.stub().returns(mockPost)
    axios.post = delAreaPost
    vm.delArea().then(() => {
      expect(delAreaPost.called).to.be.true
      expect(vm.dialogDelFormVisible).to.be.false
      done()
    })
    // Error Handling
    const delAreaError = sinon.stub().threw('err')
    axios.post = delAreaError
    vm.delArea().catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  // it('handlePreview操作', () => {
  //   const file = {
  //     name: 'test.jpg',
  //     raw: {
  //       lastModified: 1508901604232,
  //       lastModifiedDate: 'Wed Oct 25 2017 11:20:04 GMT+0800 (中国标准时间)',
  //       name: 'test.jpg',
  //       size: 28478,
  //       type: 'image/jpeg',
  //       uid: 1509351223431,
  //       webkitRelativePath: ''}}
  //   vm.handlePreview(file).then(() => {
  //     expect(vm.areaForm.area.areaImg).to.be.deep.equal(file.raw)
  //   })
  // })
})
