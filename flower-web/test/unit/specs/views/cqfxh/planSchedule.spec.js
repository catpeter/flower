import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from 'src/store'
import planSchedule from 'src/views/cqfxh/planSchedule'

Vue.use(ElementUI)

describe('planSchedule', () => {
  const Constructor = Vue.extend({ ...planSchedule,
    store
  })
  const vm = new Constructor().$mount()

  it('handleSizeChange操作', () => {
    vm.handleSizeChange(10)
    expect(vm.planSchedulePagination.pageSize).to.equal(10)
  })

  it('handleCurrentChange操作', () => {
    vm.handleCurrentChange(2)
    expect(vm.planSchedulePagination.pageIndex).to.equal(2)
  })

  it('initProjects操作', done => {
    const mockData = {
      data: [{ _id: '59a3711f0151fa2dc480444f',
        proName: '长江服装公司test',
        proType: '日用品',
        code: 'A0007',
        prison: '598a66fd23a4e966830158ea',
        createTime: '2017-08-28 09:25',
        deleted: 0,
        leader: '',
        workHours: '',
        criminal: [],
        police: [],
        workHourCreateTime: null,
        sampleImg: '',
        productImg: '',
        processDetail: '',
        sampleName: '100',
        sampleCreateTime: '2017-08-30 13:52',
        procedures: [],
        procedureCreateTime: '2017-08-29 09:40',
        chartImg: '',
        personUpdateTime: null,
        personNum: '' }]
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const projectData = sinon.stub().returns(mockPost)
    axios.post = projectData
    vm.initProjects({
      prison: '598a66fd23a4e966830158ea'
    }).then(() => {
      expect(projectData.called).to.be.true
      expect(vm.projects).to.deep.equal(mockData.data)
      done()
    })
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
    vm.getData(vm.planSchedulePagination).then(() => {
      expect(data.called).to.be.true
      expect(vm.tableData).to.deep.equal(projectList)
      expect(vm.pagesCount).to.equal(1)
      done()
    })
  })

  it('initPlanSchedule操作', done => {
    const mockData = {
      data: {
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
      }
    }
    const mockPost = new Promise(resolve => {
      resolve(mockData)
    })
    const projectData = sinon.stub().returns(mockPost)
    axios.post = projectData
    vm.initPlanSchedule({
      _id: '599e86caeabc1f23087ee614'
    }).then(() => {
      expect(projectData.called).to.be.true
      expect(vm.planScheduleForm.planSchedule).to.deep.equal(mockData.data)
      done()
    })
  })

  it('handleAdd操作', () => {
    vm.handleAdd()
    expect(vm.planScheduleForm.dialogFormVisible).to.be.true
    expect(vm.planScheduleForm.projectListVisible).to.be.true
  })

  it('handleEdit操作', () => {
    vm.handleEdit({ _id: '59a3711f0151fa2dc480444f' })
    expect(vm.planScheduleForm.dialogFormVisible).to.be.true
    expect(vm.planScheduleForm.projectListVisible).to.be.false
  })

  // it('submitForm操作', () => {
  // })

  it('saveProject操作', done => {
    vm.planScheduleForm.planSchedule = {
      proName: '长江服装公司鞋子',
      _id: '599e86caeabc1f23087ee614',
      code: 'A0004',
      productNum: 50,
      startDate: '2017-08-30',
      endDate: '2017-08-31',
      planCreateTime: '2017-08-31 09:24'
    }
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const addProjectDataPost = sinon.stub().returns(mockPost)
    axios.post = addProjectDataPost
    vm.saveProject().then(() => {
      expect(addProjectDataPost.called).to.be.true
      expect(vm.planScheduleForm.dialogFormVisible).to.be.false
      expect(vm.planScheduleForm.addFormVisible).to.be.false
      done()
    })
  })

  it('handleDelete操作', () => {
    vm.handleDelete({ _id: '599400ce9744420d184df495', proName: '长江服装公司裤子' })
    expect(vm.projectDelName).to.equal('长江服装公司裤子')
    expect(vm._id).to.equal('599400ce9744420d184df495')
    expect(vm.dialogDelFormVisible).to.be.true
  })

  it('delPlanSchedule操作', done => {
    vm._id = '599400ce9744420d184df495'
    const mockPost = new Promise(resolve => {
      resolve()
    })
    const delProjectDataPost = sinon.stub().returns(mockPost)
    axios.post = delProjectDataPost
    vm.delPlanSchedule().then(() => {
      expect(delProjectDataPost.called).to.be.true
      expect(vm.dialogDelFormVisible).to.be.false
      done()
    })
    // Error Handling
    const delProjectError = sinon.stub().threw('err')
    axios.post = delProjectError
    vm.delPlanSchedule().catch((err) => {
      expect(err).to.equal('err')
      done()
    })
  })
})
