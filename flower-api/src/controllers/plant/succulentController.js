import SucculentHandler from '../../handlers/SucculentHandler'
import fileOperation from '../../utils/fileOperation'
import pager from '../../utils/pager'
import config from '../../../config/basic.config'
const uploadPath = config.uploadPath
// const urlHeader = config.urlHearder // 前端图片加载拼接
class SucculentController {
  async updateSucculent (query) {
    console.log(query)
    // const succulentName = query.body.name
    // let succulentImg = ''
    // let result = ''
    // if (query.files[0]) {
    //   succulentImg = query.files[0].filename
    // }
    // if (query.body._id) {
    //   let updateParam = {}
    //   updateParam['name'] = query.body.name
    //   if (succulentImg) {
    //     const temp = await SucculentHandler.findOne({_id: query.body._id})
    //     updateParam['succulent'] = succulentImg
    //     if (temp && temp.SucculentImg) {
    //       await fileOperation.deleteFile(uploadPath + temp.SucculentImg)
    //     }
    //   }
    //   result = await SucculentHandler.update({'_id': query.body._id}, updateParam)
    // } else {
    //   result = await SucculentHandler.save({name: succulentName, succulentImg: succulentImg})
    // }
    // return result
  }

  async addSucculent (query) {
    console.log(query)
  }
  async getSucculent (query) {
    let succulent = await SucculentHandler.findOne(query)
    return succulent
  }

  async delSucculent (query) {
    const temp = await SucculentHandler.findOne(query)
    console.log(query)
    console.log(temp)
    if (temp.plantImg) {
      await fileOperation.deleteFile(uploadPath + temp.plantImg)
    }
    await SucculentHandler.remove(query)
  }

  async searchSucculentList (query) {
    let condition = {}
    if (query.grown) {
      condition['grown'] = parseInt(query.grown)
    }
    if (query.breed) {
      condition['breed'] = parseInt(query.breed)
    }
    if (query.genus) {
      condition['genus'] = parseInt(query.genus)
    }
    if (query.name) {
      condition['name'] = new RegExp(query.name)
    }
    const succulentList = await SucculentHandler.pagefind(condition, {}, query.pageIndex, query.pageSize)
    const count = await SucculentHandler.count(condition)
    return pager.getResult(count, succulentList)
  }
}
export default new SucculentController()
