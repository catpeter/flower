import Vue from 'vue'
import ElementUI from 'element-ui'
import store from 'src/store'
import axios from 'axios'
import classifyProject from 'src/views/jqscqk/classifyProject'
import util from 'src/util/util.js'

Vue.use(ElementUI)
Vue.use(util)

describe('classifyProject', () => {
  const Constructor = Vue.extend({ ...classifyProject,
    store
  })
  const vm = new Constructor().$mount()

  it('handleSizeChange操作', () => {
    vm.handleSizeChange(10)
    expect(vm.classifyProjectPagination.pageSize).to.equal(10)
  })

  it('handleCurrentChange操作', () => {
    vm.handleCurrentChange(2)
    expect(vm.classifyProjectPagination.pageIndex).to.equal(2)
  })

  it('getData操作', done => {
    const projectList = [{
      _id: '599e86caeabc1f23087ee614',
      proName: '长江服装公司鞋子',
      proType: '日用品',
      code: 'A0004',
      prison: '598a66fd23a4e966830158ea',
      createTime: '2017-08-24 15:56',
      deleted: 0,
      sampleImg: '../../static/upload/1503988411600.jpg',
      productImg: '../../static/upload/1503988212071.jpg',
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
        }],
      procedureCreateTime: '2017-08-30 17:37',
      chartImg: '../../static/upload/1504085847000.png',
      difficultyCreateTime: '2017-08-31 09:23',
      difficultyImg: '../../static/upload/1504142634000.png',
      leader: '111',
      workHours: 111,
      criminal: ['59a63f403841581658d88dfb'],
      police: ['596eb7de01919d3bc0abeee1'],
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
    vm.getData(vm.classifyProjectPagination).then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(projectList)
      expect(vm.pagesCount).to.equal(1)
      done()
    })
  })

  it('initProTypes操作', done => {
    const mockData = {
      data: [ '日用品', '', '文体用品' ]
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const proTypeData = sinon.stub().returns(mockPost)
    axios.post = proTypeData
    vm.initProTypes().then(() => {
      expect(proTypeData.called).to.be.true
      expect(vm.project.types).to.deep.equal(mockData.data)
      done()
    })
  })

  it('handleAdd操作', () => {
    vm.handleAdd()
    expect(vm.classifyProjectForm.dialogFormVisible).to.be.true
  })

  it('initProject操作', done => {
    const mockData = {
      data: {
        proName: '长江服装公司鞋子',
        _id: '599e86caeabc1f23087ee614',
        code: 'A0009',
        proType: '日用品'
      }
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const projectData = sinon.stub().returns(mockPost)
    axios.post = projectData
    vm.initProject({
      _id: '599e86caeabc1f23087ee614'
    }).then(() => {
      expect(projectData.called).to.be.true
      expect(vm.classifyProjectForm.classifyProject.proName).to.equal(mockData.data.proName)
      expect(vm.classifyProjectForm.classifyProject.proType).to.equal(mockData.data.proType)
      expect(vm.classifyProjectForm.classifyProject.proId).to.equal(mockData.data._id)
      expect(vm.classifyProjectForm.classifyProject.code).to.equal(mockData.data.code)
      done()
    })
  })

  it('handleEdit操作', () => {
    vm.handleEdit({ _id: '599400ce9744420d184df495' })
    expect(vm.classifyProjectForm.dialogFormVisible).to.be.true
  })

  it('submitForm操作', done => {
    vm.$refs.classifyProjectForm.$nextTick(_ => {
      vm.classifyProjectForm.classifyProject = {
        proName: '长江帽子',
        proType: '日用品',
        proId: '12322312',
        code: 'A0001'
      }
      vm.$refs.classifyProjectForm.$nextTick(_ => {
        vm.submitForm('classifyProjectForm')
        vm.classifyProjectForm.classifyProject = {
          proName: '',
          proType: '',
          proId: '',
          code: ''
        }
        vm.$refs.classifyProjectForm.$nextTick(_ => {
          vm.submitForm('classifyProjectForm')
        })
      })
      done()
    })
  })

  it('saveProject操作', done => {
    // 新增
    vm.classifyProjectForm.classifyProject = {
      code: 'A0009',
      proType: '日用品',
      proName: '长江服装公司鞋子',
      proId: '',
      prison: '598a66fd23a4e966830158ea'
    }
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const addProjectDataPost = sinon.stub().returns(mockPost)
    axios.post = addProjectDataPost
    vm.saveProject().then(() => {
      expect(addProjectDataPost.called).to.be.true
      expect(vm.classifyProjectForm.dialogFormVisible).to.be.false
      done()
    })
    // 修改
    vm.classifyProjectForm.classifyProject = {
      code: 'A0009',
      proType: '日用品',
      proName: '长江服装公司鞋子',
      proId: '599e86caeabc1f23087ee614',
      prison: '598a66fd23a4e966830158ea'
    }
    const updatemockPost = new Promise(resolve => {
      resolve()
    })
    const updateProjectDataPost = sinon.stub().returns(updatemockPost)
    axios.post = updateProjectDataPost
    vm.saveProject().then(() => {
      expect(updateProjectDataPost.called).to.be.true
      expect(vm.classifyProjectForm.dialogFormVisible).to.be.false
      done()
    })
  })

  it('handleView操作', () => {
    vm.handleView()
  })

  it('handleDelete操作', () => {
    vm.handleDelete({ _id: '599400ce9744420d184df495', proName: '长江服装公司裤子' })
    expect(vm.projectDelName).to.equal('长江服装公司裤子')
    expect(vm._id).to.equal('599400ce9744420d184df495')
    expect(vm.dialogDelFormVisible).to.be.true
  })

  it('delProject操作', done => {
    vm._id = '599400ce9744420d184df495'
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const delProjectDataPost = sinon.stub().returns(mockPost)
    axios.post = delProjectDataPost
    vm.delProject().then(() => {
      expect(delProjectDataPost.called).to.be.true
      expect(vm.dialogDelFormVisible).to.be.false
      done()
    })
    // Error Handling
    const delProjectError = sinon.stub().threw('err')
    axios.post = delProjectError
    vm.delProject().catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })

  it('loadAll操作', () => {
    vm.project.types = [ '日用品', '', '文体用品' ]
    vm.loadAll()
  })

  it('querySearch操作', () => {
    var callback = sinon.spy()
    vm.querySearch('', callback)
    expect(callback.calledOnce).to.be.true
  })

  // it('exportProjectData操作', done => {
  //   setTimeout(_ => {
  //     vm.exportProjectData()
  //     // expect(window.location).to.equal(axios.defaults.baseURL + 'jqscqk/classifyProjectInfo/exportProjectData')
  //     done()
  //   }, 500)
  // })

  it('handleUpload操作', () => {
    let response = {message: 'Upload'}
    let file
    let fileList = []
    vm.handleUpload(response, file, fileList)
  })

  it('handleError操作', () => {
    let err = {message: 'err'}
    let file
    let fileList = []
    vm.handleError(err, file, fileList)
  })
})
