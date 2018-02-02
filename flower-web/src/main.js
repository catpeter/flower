import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import mainCss from 'src/assets/css/main.css'
import {
  getToken,
  setToken,
  checkRouterWhiteList
} from './util/auth'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(mainCss)

const source = axios.CancelToken.source()

router.beforeEach((to, from, next) => {
  if (Object.keys(store.state.userInfo.userInfo).length === 0) { // 判断是否有当前用户信息
    if (!checkRouterWhiteList(to.path)) {
      next()
    } else {
      store.dispatch('getUserInfo').then(() => {
        next()
      }).catch(err => {
        console.log('拉取用户信息失败！')
        console.log(err)
        next('/login')
      })
    }
  } else {
    next()
  }
})

axios.defaults.timeout = 0
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://localhost:8060/api/'

axios.interceptors.request.use(config => {
  // by xuzhihui
  if (!new RegExp(/\/login$/).test(config.url)) {
    const token = getToken()
    if (token) {
      config.headers['Token'] = getToken()
    } else {
      config.cancelToken = source.token
      source.cancel('No Token!')
      router.push('/login')
    }
  }
  return config
}, error => {
  this.$message.error('登陆失效，请重新登陆！')
  router.push('/login')
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  if (response.headers['token']) {
    setToken(response.headers['token'])
    axios.defaults.headers.common['Token'] = getToken()
  }
  return response
}, error => {
  const errorStatus = error.response.status
  const msg = error.response.data
  let msgType
  // 400以上为错误信息，[300,400)信息为警告信息
  if (errorStatus >= 400) {
    msgType = 'error'
  } else {
    msgType = 'warning'
  }
  app.$message({
    message: msg,
    type: msgType
  })
  if (errorStatus === 401) {
    router.push('/login')
  }
  throw error
})

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app
