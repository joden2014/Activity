// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { AlertPlugin, ToastPlugin } from 'vux'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import axios from './common/axios'
import VueLazyload from 'vue-lazyload'
import qplIcon from './assets/base46ForImg'
require('es6-promise').polyfill()

Vue.use(VueRouter)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(axios)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: qplIcon,
  loading: qplIcon,
  attempt: 1
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')

