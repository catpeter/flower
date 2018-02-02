import UserInfoController from '../../../src/controllers/sys/userInfo_controller.js'
import {
  expect,
  assert
} from 'chai'
import sinon from 'sinon'
import MongoDB from '../../../src/utils/mongodb.js'
const sandbox = sinon.sandbox.create()

describe('userInfo_controller', () => {
  let findOneStub
  let findByIdStub
  beforeEach(() => {
    findByIdStub = sandbox.stub(MongoDB, 'findById')
    findOneStub = sandbox.stub(MongoDB, 'findOne')
  })

  afterEach(function () {
    sandbox.restore()
  })
  it('login操作', async() => {
    findOneStub.returns({success: true, results: userData})
    const query = {userName: 'admin', password: 'admin'}
    await UserInfoController.login(query)
      .then(res => {
        expect(res).to.be.deep.equal({
          success: true,
          message: '登陆成功!',
          data: userDataWithOutPWD
        })
      }).catch(() => {
        assert(false)
      })
  })

  it('getUserInfo操作', async() => {
    findByIdStub.returns({
      success: true,
      results: userDataWithOutPWD
    })
    await UserInfoController.getUserInfo('59edab9d23a4e9668301aad2')
      .then(res => {
        expect(res).to.be.deep.equal({
          success: true,
          results: userDataWithOutPWD
        })
      }).catch(() => {
        assert(false)
      })
  })
})

const userData = {
  '_id': '59edab9d23a4e9668301aad2',
  'userId': '1',
  'userName': 'admin',
  'system': 2.0,
  'prison': '598a66fd23a4e966830158ea',
  'password': '1fd849baf9cc24c3c13f83005d8c2072c844e426458480e8e9d47aea721a748c',
  'name': '八监东区',
  'region': '59ec405b23a4e9668301aac3',
  'area': '59b8a0241d9718e156ffb1d4'
}

const userDataWithOutPWD = {
  '_id': '59edab9d23a4e9668301aad2',
  'userId': '1',
  'userName': 'admin',
  'system': 2.0,
  'prison': '598a66fd23a4e966830158ea',
  'name': '八监东区',
  'region': '59ec405b23a4e9668301aac3',
  'area': '59b8a0241d9718e156ffb1d4'
}
