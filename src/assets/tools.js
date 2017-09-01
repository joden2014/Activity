/**
 * @authors 周登攀
 * @date    2017-08-08 18:53:56
 * @version 1.0
 */
import axios from 'axios'
import qs from 'qs'
import { browser } from './App'

const tools = {
  msg: (obj) => {
    let { text, position, time } = obj
    let Html = '<span class="msg">' + text + '</span>'
    let body = document.getElementsByTagName('body')[0]
    var node = document.createElement('div')
    node.id = 'MsgBox'
    addClass(node, 'Msg_' + position)
    node.innerHTML = Html
    body.appendChild(node)
    if (!time) {
      return false
    }
    setTimeout(() => {
      let id = document.getElementById('MsgBox')
      addClass(id, 'hide')
      let parent = id.parentElement
      parent.removeChild(id)
    }, time)
  },
  loading: (type) => {
    if (type === 'open') {
      let loading = '<div class="loadEffect"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>'
      let body = document.getElementsByTagName('body')[0]
      var node = document.createElement('div')
      node.id = 'cover'
      node.innerHTML = loading
      body.appendChild(node)
    } else if (type === 'close') {
      let id = document.getElementById('cover')
      if (!id) return
      let parent = id.parentElement
      parent.removeChild(id)
    }
  },
  setLocalStorage: (key, val) => {
    localStorage.setItem(key, val)
  },
  getLocalStorage: (key) => {
    let str = ''
    str = localStorage.getItem(key)
    return str
  },
  removeLocalStorage: (key) => {
    localStorage.removeItem(key)
  },
  clearLocalStorage: () => {
    localStorage.clear()
  },
  Success: (opt) => {
    let { success, text } = opt
    if (success) {
      if (browser.versions().IosApp) {
        window.location.href = 'neng://loadUrl/addSuccessCar'
      } else if (browser.versions().AndroidApp) {
        window.android.refreshShoppingcar()
      } else {
        getShoppingNum()
      }
      if (text === '') return false
      tools.msg({
        text: text,
        position: 'center',
        time: 3000
      })
    } else {
      tools.msg({
        text: text,
        position: 'center',
        time: 5000
      })
    }
  },
  layer: (res) => {
    let Model = '<div class="ModelContent"><div class="ModelHead"><span class="ModelTitle">活动规则</span><span class="closeBox" id="CloseModel"></span></div><div class="ModelBody"><ul>' + res.replace(/[\r\n]/g, '') + '</ul></div></div>'
    let body = document.getElementsByTagName('body')[0]
    var node = document.createElement('div')
    node.id = 'Model'
    node.innerHTML = Model
    body.appendChild(node)
    CloseModel()
  },
  ImagesUrl: (url, columns, bigger) => {
    let arr = url.match(/_w(\d+)_h(\d+)/)
    if (!arr) {
      arr = url.match(/w(\d+)_h(\d+)/)
    }
    if (!arr) {
      return
    }
    this.bigger = bigger
    this.width = arr[1] - 0
    this.height = arr[2] - 0
    this.columns = columns
    let imgW = parseInt(window.innerWidth / this.columns, 10)
    let imgH = parseInt((this.height / this.width) * imgW, 10)
    const height = Math.ceil(imgH * this.bigger / 10) * 10
    if (location.href.indexOf('m.qipeilong') > -1) {
      return replaceCdn(url.replace(/\?.*?99/, `?imageView2/2/interlace/1/q/99/h/${height}`))
    } else {
      return url
    }
  },
  GetImageHeight: () => {
    let imgW = parseInt(window.innerWidth / this.columns, 10)
    console.log(parseInt((this.height / this.width) * imgW, 10))
    return parseInt((this.height / this.width) * imgW, 10)
  },
  ResetBodyStyle: (bg, bgColor) => {
    if (bg !== null) {
      document.body.style.backgroundImage = 'url(' + bg + ')'
    }

    if (bgColor !== null) {
      document.body.style.backgroundColor = bgColor
    }
  }
}

const replaceCdn = (url) => {
  return url.replace('images.qipeilong.cn', 'test.tuhu.org').replace(/https?/, 'https')
}

const hasClass = (element, csName) => {
  return element.className.match(RegExp('(\\s|^)' + csName + '(\\s|$)'))
}

const addClass = (element, csName) => {
  if (!hasClass(element, csName)) {
    element.className += ' ' + csName
  }
}

const CloseModel = () => {
  let id = document.getElementById('CloseModel')
  id.addEventListener('click', () => {
    let id = document.getElementById('Model')
    if (!id) return
    let parent = id.parentElement
    parent.removeChild(id)
  })
}

const getShoppingNum = () => {
  GetData({
    url: 'http://m.qipeilong.net/shoppingcart/GetCartProductsCount',
    data: { userId: tools.getLocalStorage('userId'), ver: '1.0' },
    method: 'POST',
    load: true,
    showMsg: false
  }).then((value) => {
    let ShopCart = document.getElementById('shopCartNum')
    if (value.Data > 0) {
      if (value.Data > 99) {
        value.Data = '99+'
      }
      ShopCart.innerHTML = '<i>' + value.Data + '</i>'
    }
  })
}

const GetData = (obj) => {
  let { url, data = { }, method, load, showMsg = true } = obj
  if (load) {
    tools.loading('open')
  }
  return new Promise((resolve, reject) => {
    axios({
      method: method || `POST`,
      url: url,
      data: qs.stringify(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
      resolve(res.data)
      tools.loading('close')
      if (showMsg) {
        tools.msg({
          text: res.data.ErrorMsg,
          position: 'center',
          time: 1000
        })
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

export default tools
