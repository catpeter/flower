import Cookies from 'js-cookie'

const TokenKey = 'Token'
const ValidDays = 7

// 免登陆路由跳转
const routerWhiteList = [/\/login/
]

export function checkRouterWhiteList (toPath) {
  let flag = true
  for (let i = 0; i < routerWhiteList.length; i++) {
    if (!new RegExp(routerWhiteList[i]).test(toPath)) {
      continue
    } else {
      flag = false
      break
    }
  }
  return flag
}

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, {
    expires: ValidDays
  })
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
