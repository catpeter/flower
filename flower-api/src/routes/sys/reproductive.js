import reproductiveController from '../../controllers/sys/reproductiveController'
const router = require('koa-router')()

router.get('/', async ctx => {
  ctx.body = await reproductiveController.listReproductive()
})

module.exports = router
