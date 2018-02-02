const jwt = require('jsonwebtoken')
const {checkWhiteList} = require('../../utils/tokenWhiteList')

function refreshToken (ctx) {
  const oldToken = ctx.get('Token')
  const payload = jwt.verify(oldToken, 'secret')
  const now = Math.floor(Date.now() / 1000)
  const timeToExpire = (payload.exp - now)
  let newToken
  // 距离token过期时间不足6小时则刷新token
  if (timeToExpire < (60 * 60 * 6)) {
    delete payload.exp
    delete payload.iat
    newToken = jwt.sign(payload, 'secret', {
      expiresIn: '1d'
    })
    ctx.append('Token', newToken)
  }
}

module.exports = function () {
  return async function (ctx, next) {
    await next()
    if (checkWhiteList(ctx.originalUrl)) {
      refreshToken(ctx)
    }
  }
}
