import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from 'src/store'
import VueRouter from 'vue-router'
import sealSample from 'src/views/cqfxh/sealSample.vue'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(util)

describe('sealSample', () => {
  const Constructor = Vue.extend({ ...sealSample, store
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
    // 加载封样品列表
    let projectList = [{
      _id: '599e86caeabc1f23087ee614',
      proName: '长江服装公司鞋子',
      proType: '日用品',
      code: 'A0004',
      prison: '598a66fd23a4e966830158ea',
      createTime: '2017-08-24 15:56',
      deleted: 0,
      processDetail: '舒适',
      sampleName: '鞋子',
      sampleCreateTime: '2017-08-28 11:18',
      procedures: [
        {
          name: '50',
          seconds: '10',
          unit: '',
          personnel: [],
          isDifficulty: 1
        },
        {
          name: '213',
          seconds: '123',
          unit: '',
          personnel: [],
          isDifficulty: 1
        },
        {
          name: '435',
          seconds: '654',
          unit: '',
          personnel: [],
          isDifficulty: 0
        }
      ],
      procedureCreateTime: '2017-08-30 17:37',
      difficultyCreateTime: '2017-08-31 09:23',
      leader: '111',
      workHours: 111,
      criminal: [
        '59a63f403841581658d88dfb'
      ],
      police: [
        '596eb7de01919d3bc0abeee1'
      ],
      workHourCreateTime: '2017-08-30 17:37',
      productNum: 50,
      startDate: '2017-08-30',
      endDate: '2017-08-31',
      everyDayNum: 25,
      planCreateTime: '2017-08-31 09:24',
      personUpdateTime: '2017-08-30 17:48',
      personNum: 2
    }]
    const reply = new Promise(resolve => {
      resolve({
        data: {
          count: 1,
          data: projectList
        }
      })
    })

    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.getData(vm.query).then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(projectList)
      expect(vm.pagesCount).to.equal(1)
      done()
    })
  })

  it('initProjectList操作', () => {
    const results = [{label: '黄河公司圆珠笔', proName: '黄河公司圆珠笔', value: '599e86b6eabc1f23087ee613', _id: '599e86b6eabc1f23087ee613'}]
    const reply = new Promise(resolve => {
      resolve({
        data: {
          results
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.initProjectList(vm.query).then(() => {
      expect(data.called).to.be.true
      expect(vm.projectList).to.deep.equal(results)
    })
  })

  it('handleDelete操作', () => {
    const row = {_id: 1, proName: 'test'}
    vm.handleDelete(row)
    expect(vm.delDialogVisible).to.equal(true)
    expect(vm.delProjectName).to.equal(row.proName)
    expect(vm._id).to.equal(row._id)
  })

  it('delSealSample操作', done => {
    // 删除样品操作
    vm._id = 1
    const reply = new Promise(resolve => {
      resolve({
        data: {
          success: true,
          results: {ok: 1, nModified: 1, n: 1}
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.delSealSample(vm._id).then(() => {
      expect(data.called).to.be.true
      expect(vm.delDialogVisible).to.be.false
      done()
    })
    const errdata = sinon.stub().threw('err')
    axios.post = errdata
    vm.delSealSample(vm._id).catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  it('handleAdd操作', () => {
    vm.handleAdd()
    expect(vm.addDialogVisible).to.equal(true)
    expect(vm.addDialogVisible).to.be.true
  })

  it('handleEdit操作', done => {
    // 编辑样品操作
    const row = {_id: '599e86caeabc1f23087ee614'}
    const project = {
      _id: '599e86caeabc1f23087ee614',
      proName: '长江服装公司鞋子',
      proType: '日用品',
      code: 'A0004',
      prison: '598a66fd23a4e966830158ea',
      createTime: '2017-08-24 15:56',
      deleted: 0,
      processDetail: '舒适',
      sampleName: '鞋子',
      sampleCreateTime: '2017-08-28 11:18',
      procedures: [
        {
          name: '50',
          seconds: '10',
          unit: '',
          personnel: [],
          isDifficulty: 1
        },
        {
          name: '213',
          seconds: '123',
          unit: '',
          personnel: [],
          isDifficulty: 1
        },
        {
          name: '435',
          seconds: '654',
          unit: '',
          personnel: [],
          isDifficulty: 0
        }
      ],
      procedureCreateTime: '2017-08-30 17:37',
      difficultyCreateTime: '2017-08-31 09:23',
      leader: '111',
      workHours: 111,
      criminal: [
        '59a63f403841581658d88dfb'
      ],
      police: [
        '596eb7de01919d3bc0abeee1'
      ],
      workHourCreateTime: '2017-08-30 17:37',
      productNum: 50,
      startDate: '2017-08-30',
      endDate: '2017-08-31',
      everyDayNum: 25,
      planCreateTime: '2017-08-31 09:24',
      personUpdateTime: '2017-08-30 17:48',
      personNum: 2
    }
    const reply = new Promise(resolve => {
      resolve({
        data: {project}
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.handleEdit(row).then(() => {
      expect(data.called).to.be.true
      expect(vm.sealSampleForm.sampleImg).to.equal('')
      expect(vm.sealSampleForm.productImg).to.equal('')
      expect(vm.sealSampleForm.sampleImgUrl).to.equal(project.sampleImgUrl)
      expect(vm.sealSampleForm.productImgUrl).to.equal(project.productImgUrl)
      expect(vm.editDialogVisible).to.equal(true)
      done()
    })
  })

  it('addSealSample操作', done => {
    const param = {
      sampleImg: '',
      productImg: '',
      processDetail: '1',
      proType: '1',
      sampleName: '2',
      sampleProject: '',
      prison: ''
    }

    const reply = new Promise(resolve => {
      resolve({
        data: {
          success: true,
          results: {ok: 1, nModified: 1, n: 1}
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.addSealSample().then(() => {
      expect(data.called).to.be.true
      expect(vm.addDialogVisible).to.be.false
      done()
    })
    const errdata = sinon.stub().threw('err')
    axios.post = errdata
    vm.addSealSample(param).catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  it('editSealSample操作', done => {
    const param = {
      sampleImg: '',
      productImg: '',
      processDetail: '1',
      proType: '1',
      sampleName: '2',
      sampleProject: '',
      prison: ''
    }

    const reply = new Promise(resolve => {
      resolve({
        data: {
          success: true,
          results: {ok: 1, nModified: 1, n: 1}
        }
      })
    })
    const data = sinon.stub().returns(reply)
    axios.post = data
    vm.editSealSample().then(() => {
      expect(data.called).to.be.true
      expect(vm.editDialogVisible).to.be.false
      done()
    })
    const errdata = sinon.stub().threw('err')
    axios.post = errdata
    vm.editSealSample(param).catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  it('handleUpload操作', () => {
    let res = {
      message: 'test'
    }
    let file
    let fileList = []
    vm.handleUpload(res, file, fileList)
  })

  it('handleError操作', () => {
    let res = {
      message: 'test'
    }
    let file
    let fileList = []
    vm.handleError(res, file, fileList)
  })

  it('submitForm操作', done => {
    vm.sealSampleForm = {
      sampleImgUrl: '',
      productImgUrl: '',
      sampleImg: '',
      productImg: '',
      processDetail: '',
      proType: '',
      sampleName: '鞋子',
      sampleProject: '',
      _id: '',
      proName: '鞋子',
      code: 'xiezi'
    }
    vm.$refs.sealSampleForm.$nextTick(_ => {
      vm.submitForm('sealSampleForm')
      done()
    })
  })

  it('submitForm操作(数据为空)', done => {
    vm.sealSampleForm = {
      sampleImgUrl: '',
      productImgUrl: '',
      sampleImg: '',
      productImg: '',
      processDetail: '',
      proType: '',
      sampleName: '',
      sampleProject: '',
      _id: ''
    }
    vm.$refs.sealSampleForm.$nextTick(_ => {
      vm.submitForm('sealSampleForm')
      done()
    })
  })

  it('submitEditForm操作', done => {
    vm.sealSampleForm = {
      sampleImgUrl: '',
      productImgUrl: '',
      sampleImg: '',
      productImg: '',
      processDetail: '',
      proType: '',
      sampleName: '鞋子',
      sampleProject: '',
      _id: '',
      proName: '鞋子',
      code: 'xiezi'
    }
    vm.$refs.sealSampleForm.$nextTick(_ => {
      vm.submitEditForm('sealSampleForm')
      done()
    })
  })

  it('submitEditForm操作(数据为空)', done => {
    vm.sealSampleForm = {
      sampleImgUrl: '',
      productImgUrl: '',
      sampleImg: '',
      productImg: '',
      processDetail: '',
      proType: '',
      sampleName: '',
      sampleProject: '',
      _id: ''
    }
    vm.$refs.sealSampleForm.$nextTick(_ => {
      vm.submitEditForm('sealSampleForm')
      done()
    })
  })
})

