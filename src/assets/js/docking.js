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

const Docking = (() => {
  // 对接三方平台授权接口默认实现
  const defaultDockingAuth = (code) => {
    dockingAuth({ code: code }).then((res) => {
      if (res.body.code === mobileResultCode.SUCCESS) {
        // 用户已绑定，跳转首页，记录用户数据
        sessionStorage.setItem('session_key', res.body.data.item.key)
        sessionStorage.setItem('session_model_authority',
          res.body.data.item.joinCheckModules)
        sessionStorage.setItem('roleList',
          JSON.stringify(res.body.data.item.userGroups))
        router.push('index')
      } else if (res.body.code === mobileResultCode.WX_NEED_BIND_ACCOUNT) {
        // 尚未绑定，跳转至绑定页面
        sessionStorage.setItem('bindUserId', res.body.data.item.bindUserId)
        router.push('login')
      }
    })
  }
  const dockingMap = {
    /**
     * 企业微信授权对接
     */
    enterprisesWechat: () => {
      const code = getUrlParam('code')
      defaultDockingAuth(code)
    },
    /**
     * 钉钉授权对接
     */
    dingding: () => {
      // todo 后期优化 配置接口中返回钉钉对接参数
      const corpId = 'ding0b4f2817ea98936dacaaa37764f94726'
      if (dd.env.platform === 'notInDingTalk') {
        console.error('当前配置为企业微信模式，请在企业微信客户端中打开')
      }
      dd.ready(() => {
        // 使用SDK 获取免登授权码
        dd.runtime.permission.requestAuthCode({
          corpId: corpId,
          onSuccess: info => {
            const code = info.code
            defaultDockingAuth(code)
          },
          onFail: err => {
            alert('fail')
            alert(JSON.stringify(err))
          }
        })
      })

      // test
      // const code = 'b1bd4abb023f3b48a6faa65786845c08'
      // defaultDockingAuth(code)
    },
    /**
     * 微信服务号授权对接
     */
    wx: () => {
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
