/**
 *author:ZhouDengPan
 *creatTime:20170727
 *封装请求接口
 **/
import axios from 'axios'
import qs from 'qs'
import tools from 'assets/tools'
import location from 'assets/location'
import { userInfo } from 'assets/userInfo'

const AjaxData = (obj) => {
  let { url, data = { }, method, load, showMsg = true } = obj
  let currentcity = tools.getLocalStorage('currentcity')
  if (!currentcity || currentcity === '') {
    location.init()
  } else {
    currentcity = JSON.parse(currentcity)
    data.cityId = currentcity.LevelTwoUID
  }
  if (load) {
    tools.loading('open')
  }
  if (userInfo.userId) {
    data.userId = userInfo.userId
  }
  return new Promise((resolve, reject) => {
    axios({
      method: method || `POST`,
      url: url,
      data: qs.stringify(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
      if (res.data.ErrorCode === '-001') {
        var url = window.location.href
        tools.setLocalStorage('BackUrl', url)
        window.location.href = '/Login/LoginIndex'
        return false
      }
      resolve(res.data)
      if (load) {
        tools.loading('close')
      }
    }).catch((res) => {
      resolve(res)
      if (showMsg) {
        console.log(res)
      }
    })
  }
  )
}

export default {
  install: (Vue) => {
    Vue.prototype.$ajax = AjaxData
  }
}
