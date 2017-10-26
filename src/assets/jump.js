import axios from 'axios'
import qs from 'qs'
import tools from './tools'
import api from './api'
import { userInfo, GetAppUser } from '../assets/userInfo'
import { SetAppData, browser, StringToJson, GoAppLogin } from './App'
let AppData = { }
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

const jump = {
  to: (type, value) => {
    switch (type) {
      case 1:
        window.location = value.Url
        break
      case 2:
        jumpToPage(type, value)
        break
      case 3:
        tools.layer(value)
        break
      case 4:
        jump.getConpon(type, value)
        break
      case 5:
        jump.AddShopCart(type, value)
        break
    }
  },
  getConpon: (type, value) => {
    Gologin()
    let prams = { couponId: value.CouponID, ver: '1.0', couponType: value.CouponType }
    if (browser.versions().IosApp || browser.versions().AndroidApp) {
      tools.loading('open')
      SetAppData({
        title: '领取优惠券',
        dataObj: prams,
        api: api.LedCoupon(),
        noDomain: false,
        callBack: 'CallBackCouponDataForJump'
      })
      return false
    }
    GetData({
      url: api.LedCoupon(),
      data: prams,
      method: 'POST',
      load: true,
      showMsg: true
    }).then((value) => {
      window.CallBackCouponDataForJump(value)
    })
  },
  AddShopCart: (type, value) => {
    Gologin()
    let prams = { userProductId: value.UserProductId, ver: '1.0', Count: 1, isGroup: value.ProductType }
    if (browser.versions().IosApp || browser.versions().AndroidApp) {
      tools.loading('open')
      SetAppData({
        title: '加入购物车',
        dataObj: prams,
        api: api.AddProductToCart(),
        noDomain: false,
        callBack: 'CallBackDataForJump'
      })
      return false
    }
    prams.userId = userInfo.userId
    GetData({
      url: api.AddProductToCart(),
      data: prams,
      method: 'POST',
      load: true,
      showMsg: true
    }).then((value) => {
      window.CallBackDataForJump(value)
    })
  }
}

window.CallBackCouponDataForJump = (res) => {
  let promise = new Promise((resolve, reject) => {
    resolve(res)
  })
  promise.then((res) => {
    AppData = StringToJson(res)
    Gologin(AppData.ErrorCode)
    if (AppData.Success) {
      tools.msg({
        text: '领取成功',
        position: 'center',
        time: 3000
      })
    } else {
      tools.msg({
        text: AppData.ErrorMsg,
        position: 'center',
        time: 3000
      })
    }
  }).catch((e) => {
    console.log(e)
  })
  tools.loading('close')
}

window.CallBackDataForJump = (res) => {
  let promise = new Promise((resolve, reject) => {
    resolve(res)
  })
  promise.then((res) => {
    AppData = StringToJson(res)
    if (AppData.Success) {
      tools.Success({
        success: true,
        text: '成功加入购物车'
      })
    } else {
      tools.msg({
        text: AppData.ErrorMsg,
        position: 'center',
        time: 1000
      })
    }
  }).catch((e) => {
    console.log(e)
  })
  tools.loading('close')
}

const jumpToPage = (type, value) => {
  let parms = { ContentType: 8, ContentKey: value.ContentKey }
  if (value.ContentType && value.ContentType === 2) {
    parms = value
  }
  let dataObj = {
    'actionID': '1',
    'actionMSG': '跳转APP',
    'Data':
    [
      {
        'action': 'html2app',
        'data': parms
      }
    ]
  }
  let data = JSON.stringify(dataObj)
  if (browser.versions().IosApp) {
    let ifr = document.createElement('iframe')
    ifr.src = 'htmljs://loadUrl/action?data=' + data
    ifr.style.display = 'none'
    document.body.appendChild(ifr)
    window.setTimeout(function () {
      document.body.removeChild(ifr)
    }, 2000)
    return false
  } else if (browser.versions().AndroidApp) {
    window.android.action(data)
    return false
  }
  if (value.ContentType && value.ContentType === 2) {
    window.location.href = '/Home/Detail?UserProductID=' + value.UserProductID
    return false
  }
  let Url = ''
  switch (value.ContentKey) {
    case '001':
      Url = '/MyOrder/Order?type=0'
      break
    case '002':
      Url = '/ShoppingCart/Index'
      break
    case '003':
      Url = '/Coupon/CouponIndex'
      break
    case '004':
      Url = '/Coupon/CouponIndex'
      break
    case '005':
      Url = '/Search/SearchForClassify'
      break
    case '006':
      Url = '/Search/SearchBrand'
      break
    case '007':
      Url = '/Home/MerchantsSettled'
      break
    case '008':
      Url = '/Login/LoginIndex'
      break
    case '009':
      Url = '/Search/SearchForModel'
      break
    case '010':
      Url = '/ShoppingCart/Index'
      break
    case '011':
      Url = '/ShippingAddress/AddressList'
      break
    case '012':
      Url = '/My/Mycollect'
      break
    case '013':
      Url = '/My/MyFeedback'
      break
    case '014':
      Url = '/My/MyUsermanager'
      break
    case '015':
      Url = '/MyOrder/OrderDetail?orderId='
      break
    case '016':
      Url = '/My/MyUsermanager'
      break
    case '019':
      Url = '/Search/SearchForModel#Vcode'
      break
    case '020':
      Url = '/Offline/Index'
      break
    default:
      Url = ''
  }
  window.location.href = Url
}

const Gologin = (code) => {
  if (code) {
    if (code === '-001' || code === -1) {
      if (browser.versions().IosApp) {
        if (!userInfo.user_userid) {
          GoAppLogin()
        }
      } else if (browser.versions().AndroidApp) {
        if (!userInfo[0].user_userid) {
          GoAppLogin()
        }
      } else {
        if (!userInfo.userId) {
          var url = window.location.href
          tools.setLocalStorage('BackUrl', url)
          window.location.href = '/Login/LoginIndex'
        }
      }
    }
    return false
  }
  GetAppUser()
  setTimeout(() => {
    if (browser.versions().IosApp) {
      if (!userInfo.user_userid) {
        GoAppLogin()
      }
    } else if (browser.versions().AndroidApp) {
      if (!userInfo[0].user_userid) {
        GoAppLogin()
      }
    } else {
      if (!userInfo.userId) {
        var url = window.location.href
        tools.setLocalStorage('BackUrl', url)
        window.location.href = '/Login/LoginIndex'
      }
    }
  }, 80)
}

export default jump
