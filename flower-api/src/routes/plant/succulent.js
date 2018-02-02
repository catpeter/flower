import succulentController from '../../controllers/plant/succulentController'
const router = require('koa-router')()
// const upload = require('../../utils/multerUtil') // 引入文件上传工具类
const koaBody = require('koa-body')()

router.post('/', koaBody, async ctx => {
  ctx.body = await succulentController.addSucculent(ctx.request.body)
})

router.put('/:_id', koaBody, async ctx => {
  ctx.body = await succulentController.updateSucculent(ctx.request.body)
})

router.get('/', async ctx => {
  ctx.body = await succulentController.searchSucculentList(ctx.request.query)
})

router.get('/:_id', async ctx => {
  ctx.body = await succulentController.getSucculent(ctx.params)
})

router.del('/:_id', async ctx => {
  ctx.body = await succulentController.delSucculent(ctx.params)
})
module.exports = router
