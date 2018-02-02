import breedController from '../../controllers/sys/breedController'
const router = require('koa-router')()

router.get('/', async ctx => {
  ctx.body = await breedController.listBreed()
})

module.exports = router
