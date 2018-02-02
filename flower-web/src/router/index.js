import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login.vue'
import index from '../views/index.vue'
import succulent from '../views/plant/succulent.vue'
Vue.use(Router)

export const sysRouterMap = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  name: 'login',
  component: login
},
{
  path: '/index',
  component: index,
  children: [
    {
      path: '/succulent',
      name: 'succulent',
      component: succulent
    }
  ]
}]

export default new Router({
  routes: [
    ...sysRouterMap
  ]
})
