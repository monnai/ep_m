/*!
 * 三方对接: 现支持企业微信的对接/钉钉/微信服务号
 * @author gushouchen
 */

import { dockingAuth } from '@/request/docking_uri'
import { mobileResultCode } from '@/assets/js/common'
import { router } from '@/route'
import * as dd from 'dingtalk-jsapi'

/**
 * 根据对接类别type进行第三方平台对接
 * @param { String } type  work_wx(企业微信) dd(钉钉) wx(微信)
 * @return void
 */
export const doDockingAuth = (type) => {
  if (sessionStorage.getItem('session_key')) {
    return
  }
  Docking.doDocking(type)
}

export const Docking = (() => {
  // 对接三方平台授权接口默认实现
  const defaultDockingAuth = (code) => {
    dockingAuth({ code: code }).then((res) => {
      if (res.body.code === mobileResultCode.SUCCESS) {
        // 用户已绑定，跳转首页，记录用户数据
        sessionStorage.setItem('session_key', res.body.data.item.key)
        sessionStorage.setItem('session_model_authority',
          res.body.data.item.joinCheckModules)
        sessionStorage.setItem('roleList', res.body.data.item.userGroups
          ? JSON.stringify(res.body.data.item.userGroups) : JSON.stringify(
            {}))
        // 三方对接直接进入系统有两个入口，客户端按钮绑定跳转至首页，消息推送绑定跳转详情页
        const modelId = getUrlParam('modelId')
        if (modelId) {
          // 消息推送现支持跳转详情页查看审核结果
          const modelMenu = window.g.menu.filter(m => {
            return m.name === modelId
          })
          sessionStorage.setItem('apiPrefix', modelMenu[0].apiPrefix)
          sessionStorage.setItem('modelName', modelMenu[0].title)
          sessionStorage.setItem('detailRouter', modelMenu[0].router[1])
          sessionStorage.setItem('itemId', getUrlParam('itemId'))
          router.push(modelMenu[0].router[1])
          return
        }
        router.push('index')
      } else if (res.body.code === mobileResultCode.WX_NEED_BIND_ACCOUNT) {
        // 尚未绑定，跳转至绑定页面
        sessionStorage.setItem('bindUserId', res.body.data.item.bindUserId)
        // 为微信平台跳转做特殊处理，微信平台默认hash传递#导致后续router的hash路由异常
        const originUrl = window.location.href.split('?code')[0] + '#/'
        window.history.pushState(null, null, originUrl)
        router.push('loginScan')
      }
    })
  }
  const dockingMap = {
    /**
     * 企业微信授权对接
     */
    enterprisesWechat: () => {
      defaultDockingAuth(getUrlParam('code'))
    },
    /**
     * 钉钉授权对接
     */
    dingding: () => {
      if (dd.env.platform === 'notInDingTalk') {
        console.error('当前为钉钉微应用模式，请在钉钉手机客户端中使用')
        return
      }
      dd.ready(() => {
        // 获取免登授权码
        dd.runtime.permission.requestAuthCode({
          corpId: sessionStorage.getItem('corpId'),
          onSuccess: info => {
            defaultDockingAuth(info.code)
          },
          onFail: (res) => {
            alert(JSON.stringify(res))
          }
        })
      })
    },
    /**
     * 微信服务号授权对接
     */
    wechat: () => {
      defaultDockingAuth(getUrlParam('code'))
    },
    /**
     * 浏览器端，不对接三方
     */
    browser: () => {
      router.push('login')
    }
  }
  return {
    doDocking: (dockingType) => {
      dockingMap[dockingType]()
    }
  }
})()

const getUrlParam = function (name) {
  return decodeURIComponent(
    (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
      .exec(location.href) ||
      [undefined, ''])[1].replace(/\+/g, '%20')) || null
}
