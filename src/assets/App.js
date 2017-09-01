import tools from './tools'
import { userInfo, GetAppUser } from './userInfo'
export const browser = {
  versions: () => {
    let u = navigator.userAgent
    return {
      trident: u.indexOf('Trident') > -1,
      presto: u.indexOf('Presto') > -1,
      webKit: u.indexOf('AppleWebKit') > -1,
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      ios: !!u.match(/\(i[^]+( U)? CPU.+Mac OS X/),
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      iPhone: u.indexOf('iPhone') > -1,
      iPad: u.indexOf('iPad') > -1,
      webApp: u.indexOf('Safari') === -1,
      weixin: u.indexOf('MicroMessenger') > -1,
      qq: u.match(/\sQQ/i) === ' qq',
      IosApp: u.indexOf('QPL/IOS') > -1,
      AndroidApp: u.indexOf('QPL/ANDROID') > -1
    }
  },
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

export const StringToJson = (str) => {
  let obj
  if (typeof str === 'string') {
    obj = JSON.parse(str)
  } else {
    obj = str
  }
  if (browser.versions().IosApp) {
    if (obj.Success === 1) {
      obj.Success = true
    } else {
      obj.Success = false
    }
  }
  return obj
}

export const BackApp = () => {
  let dataObj = {
    'actionID': '1',
    'actionMSG': '退回APP',
    'Data':
    [
      {
        'action': 'htmlpop',
        'data': ''
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
  } else if (browser.versions().AndroidApp) {
    window.android.action(data)
  }
}

export const GoAppLogin = () => {
  tools.msg({
    text: '未登录',
    position: 'center',
    time: 3000
  })
  let obj = {'ContentType': 8, 'ContentKey': '008'}
  let dataObj = {
    'actionID': '1',
    'actionMSG': '登录',
    'Data':
    [
      {
        'action': 'html2app',
        'data': obj
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
  } else if (browser.versions().AndroidApp) {
    window.android.action(data)
  }
}

export const SetAppData = (obj) => {
  GetAppUser()
  setTimeout(() => {
    let { title, dataObj, api, noDomain = true, callBack } = obj
    dataObj.h5apicallback = callBack
    dataObj.h5apiname = api
    if (browser.versions().IosApp || browser.versions().AndroidApp) {
      if (userInfo.location_cityId) {
        dataObj.cityId = userInfo.location_cityId
      } else if (userInfo[0].location_cityId) {
        dataObj.cityId = userInfo[0].location_cityId
      }
    }
    let domain = ''
    if (noDomain) {
      if (window.location.href.indexOf('net') !== -1) {
        domain = 'http://m.qipeilong.net/'
      } else {
        domain = 'https://m.qipeilong.cn/'
      }
      dataObj.domain = domain
    }
    let AppServer = {
      'actionMSG': title,
      'Data':
      [
        {
          'action': 'htmlapi',
          'data': dataObj
        }
      ]
    }

    let dataStr = JSON.stringify(AppServer)
    if (browser.versions().IosApp) {
      let ifr = document.createElement('iframe')
      ifr.src = 'htmljs://loadUrl/action?data=' + dataStr
      ifr.style.display = 'none'
      document.body.appendChild(ifr)
      window.setTimeout(function () {
        document.body.removeChild(ifr)
      }, 5000)
    } else if (browser.versions().AndroidApp) {
      window.android.action(dataStr)
    }
  }, 80)
}
