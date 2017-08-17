import Vue from 'vue'
import Router from 'vue-router'
import sales from '@/page/sales/index'
import test from '@/page/test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/activity',
      name: 'sales',
      component: sales
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
