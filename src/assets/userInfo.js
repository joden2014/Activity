export let userInfo = { }

const browser = {
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

const StringToJson = (str) => {
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

window.htmlgetinfo = (res) => {
  userInfo = StringToJson(res)
}

export const GetAppUser = () => {
  let dataObj = {
    'actionID': '11111',
    'actionMSG': '备注信息',
    'Data':
    [
      {
        'action': 'htmlgetinfo',
        'data': 'all'
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
    }, 5000)
  } else if (browser.versions().AndroidApp) {
    if (window.android !== undefined) {
      let str = window.android.action(data)
      window.htmlgetinfo(str)
    }
  }
}
export const SetApp = (title) => {
  let dataObj = {
    'actionID': '11111',
    'actionMSG': '备注信息',
    'Data':
    [
      {
        'action': 'htmltitle',
        'data': title
      }, {
        'action': 'htmlheadershopcart',
        'data': '1'
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
    }, 5000)
  } else if (browser.versions().AndroidApp) {
    if (window.android !== undefined) {
      window.android.action(data)
    }
  }
}

const getLocalStorage = (key) => {
  let str = ''
  str = localStorage.getItem(key)
  return str
}

userInfo.userId = getLocalStorage('userId')
