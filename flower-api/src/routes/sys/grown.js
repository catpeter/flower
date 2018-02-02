import grownController from '../../controllers/sys/grownController'
const router = require('koa-router')()

router.get('/', async ctx => {
  ctx.body = await grownController.listGrown()
})

module.exports = router
