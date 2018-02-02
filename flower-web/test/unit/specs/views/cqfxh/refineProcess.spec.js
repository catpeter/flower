import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from 'src/store'
import VueRouter from 'vue-router'
import refineProcess from 'src/views/cqfxh/refineProcess.vue'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(util)

describe('refineProcess', () => {
  const Constructor = Vue.extend({ ...refineProcess,
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

  it('handleDelete操作', () => {
    // 处理删除操作
    const row = {
      _id: '599e86caeabc1f23087ee614',
      proName: '项目名'
    }
    vm.handleDelete(row)
    expect(vm.delDialogVisible).to.equal(true)
    expect(vm.delProjectName).to.equal(row.proName)
    expect(vm.delId).to.equal(row._id)
  })

  it('addProcedure操作', () => {
    // 处理添加操作
    vm.addProcedures = [{
      name: '1',
      seconds: '10',
      unit: '',
      personnel: [],
      isDifficulty: 1
    }]
    vm.addProcedure()
    expect(vm.addProcedures.length).to.equal(2)
  })

  it('delProcedure操作', () => {
    // 处理删除操作
    vm.addProcedure = [{
      id: 1
    }, {
      id: 2
    }]
    vm.delProcedure(0, 1)
    expect(vm.addProcedures.length).to.equal(1)
  })

  it('getData操作', done => {
    vm.query.prison = '599e86caeabc1f23087ee614'
    let projectList = [{
      _id: '599e86caeabc1f23087ee614'
    }]
    const reply = new Promise(resolve => {
      resolve({
        data: {
          count: 2,
          data: projectList
        }
      })
    })
    const res = sinon.stub().returns(reply)
    axios.post = res
    vm.getData().then(() => {
      expect(res.called).to.be.true
      expect(vm.pagesCount).to.equal(2)
      expect(vm.tableData).to.deep.equal(projectList)
      done()
    })
  })

  it('delAllProcedure操作', done => {
    vm.delId = '599e86caeabc1f23087ee614'
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
    vm.delAllProcedure().then(() => {
      expect(res.called).to.be.true
      expect(vm.delDialogVisible).to.be.false
      done()
    })
    const errdata = sinon.stub().threw('err')
    axios.post = errdata
    vm.delAllProcedure().catch((err) => {
      expect(err).to.equal('err')
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
    let addProcedure = [{
      name: 'none',
      seconds: '10',
      unit: '',
      personnel: [],
      isDifficulty: 0
    }]
    vm.calData(addProcedure)

    for (var i = 1; i <= 30; i++) {
      addProcedure.push({
        name: i,
        seconds: '10',
        unit: '',
        personnel: [],
        isDifficulty: 1
      })
    }
    vm.calData(addProcedure)

    for (i = 1; i <= 36; i++) {
      addProcedure.push({
        name: i,
        seconds: '10',
        unit: '',
        personnel: [],
        isDifficulty: 1
      })
    }
    vm.calData(addProcedure)
  })

  it('submitProcedures操作', done => {
    const img = 'asdasdqwd54311d324qac' // base64图片
    vm.editId = '599e86caeabc1f23087ee614'
    vm.addProcedures = [{
      name: '50',
      seconds: '10',
      unit: '',
      personnel: [],
      isDifficulty: 1
    }]
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
      expect(vm.delDialogVisible).to.be.false
      done()
    })
    const errdata = sinon.stub().threw('err')
    axios.post = errdata
    vm.submitProcedures(img).catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  it('isListRepeat操作', () => {
    let list = ['打纽扣', '打纽扣', '测试']
    let res = vm.isListRepeat(list)
    expect(res).to.be.true

    list = ['打纽扣', '打别的', '测试']
    res = vm.isListRepeat(list)
    expect(res).to.be.false
  })

  it('isListElementNull操作', () => {
    let array = ['', '1']
    expect(vm.isListElementNull(array)).to.be.true
    array = ['2', '1']
    expect(vm.isListElementNull(array)).to.be.false
  })
})
