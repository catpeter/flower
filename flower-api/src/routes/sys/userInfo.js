import userInfoController from '../../controllers/sys/userInfoController'
const router = require('koa-router')()
const koaBody = require('koa-body')()
const jwt = require('jsonwebtoken')

router.post('/login', koaBody, async ctx => {
  ctx.body = await userInfoController.login(ctx.request.body)
  const token = jwt.sign({
    userId: ctx.body.data._id
  }, 'secret', {
    expiresIn: '1d'
  })
  ctx.append('Token', token)
})

router.get('/getUserInfo', async ctx => {
  const token = ctx.header.token
  const payload = jwt.verify(token, 'secret')
  ctx.body = await userInfoController.getUserInfo(payload.userId)
})

module.exports = router
