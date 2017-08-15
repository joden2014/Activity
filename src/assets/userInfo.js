import tools from './tools'
import { browser, StringToJson } from './App'

let userInfo = { }
userInfo.userId = tools.getLocalStorage('userId')
window.htmlgetinfo = (res) => {
  let promise = new Promise((resolve, reject) => {
    resolve(res)
  })
  promise.then((res) => {
    userInfo = StringToJson(res)
  }).catch((e) => {
    console.log(e)
  })
  tools.loading('close')
}

export const SetApp = (title) => {
  let dataObj = {
    'actionID': '11111',
    'actionMSG': '备注信息',
    'Data':
    [
      {
        'action': 'htmlgetinfo',
        'data': 'all'
      },
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
      let str = window.android.action(data)
      userInfo = JSON.parse(str)
    }
  }
}

export default userInfo
