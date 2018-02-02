import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from 'src/store'
import VueRouter from 'vue-router'
import indicateDifficulty from 'src/views/cqfxh/indicateDifficulty.vue'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(util)

describe('indicateDifficulty', () => {
  const Constructor = Vue.extend({ ...indicateDifficulty, store
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

  it('handleDel操作', () => {
    // 处理删除操作
    const row = {_id: '599e86caeabc1f23087ee614', proName: '项目名'}
    vm.handleDel(row)
    expect(vm.delDialogVisible).to.equal(true)
    expect(vm.delId).to.equal(row._id)
  })

  it('saveDifficultyImg操作', done => {
    const img = 'asdasdasd' // base64
    const reply = new Promise(resolve => {
      resolve({
        data: {success: true, results: {ok: 1, nModified: 1, n: 1}}
      })
    })
    const res = sinon.stub().returns(reply)
    axios.post = res
    vm.saveDifficultyImg(img).then(() => {
      expect(res.called).to.be.true
      expect(vm.editDialogVisible).to.be.false
      done()
    })
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

  it('delAllDifficulty操作', done => {
    vm.delId = '599e86caeabc1f23087ee614'
    const reply = new Promise(resolve => {
      resolve({
        data: {success: true, results: {ok: 1, nModified: 1, n: 1}}
      })
    })
    const res = sinon.stub().returns(reply)
    axios.post = res
    vm.delAllDifficulty().then(() => {
      expect(res.called).to.be.true
      expect(vm.delDialogVisible).to.be.false
      done()
    })
    const errdata = sinon.stub().threw('err')
    axios.post = errdata
    vm.delAllDifficulty().catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  it('showPic操作', () => {
    const charImg = 'c://asdasd.png'
    vm.showPic(charImg)
    expect(vm.chartDialogVisible).to.be.true
    expect(vm.difficultyImg).to.equal(charImg)
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
})
