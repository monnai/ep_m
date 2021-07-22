import wx from 'weixin-js-sdk'
import * as dd from 'dingtalk-jsapi'
/**
 * 授权调用扫一扫
 * @param type 平台code 可选值为dingding wechat enterprisesWechat对应钉钉 微信 企业微信
 * @param scanConfig 配置信息
 * @param callback 扫码结果回调函数
 */
export const doScan = (type, scanConfig, callback) => {
  Scan.doScan(type, scanConfig, callback)
}
export const formatResult = (type, data) => {
  return Scan.formatResult(type, data)
}

/**
 * 扫码策略类，封装了三方平台扫一扫对接的业务逻辑
 */
const Scan = (() => {
  const scanStrategies = {
    dingding: (scanConfig, callback) => {
      dd.config({
        agentId: scanConfig.agentId, // 必填，微应用ID
        corpId: scanConfig.corpId, // 必填，企业ID
        timeStamp: scanConfig.timestamp, // 必填，生成签名的时间戳
        nonceStr: scanConfig.nonceStr, // 必填，自定义固定字符串。
        signature: scanConfig.signature, // 必填，签名
        type: 0, // 选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
        jsApiList: [
          'biz.util.scan'
        ] // 必填，需要使用的jsapi列表，注意：不要带dd。
      })
      dd.ready(() => {
        dd.biz.util.scan({
          type: 'all', // type 为 all、qrCode、barCode，默认是all。
          onSuccess: function (data) {
            callback(data)
          }
        })
      })
      // 异常打印
      dd.error(function (err) {
        alert('出错了：' + JSON.stringify(err))
      })
    },
    wechat: (scanConfig, callback) => {
      wx.config({
        debug: false,
        appId: scanConfig.appId, // 必填,公众号的唯一标识
        timestamp: scanConfig.timestamp, // 必填,生成签名的时间戳
        nonceStr: scanConfig.nonceStr, // 必填,生成签名的随机串
        signature: scanConfig.signature, // 必填,签名
        jsApiList: ['scanQRCode'] // 必填,需要使用的JS接口列表
      })
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['scanQRCode'],
          success: function (res) {
          }
        })
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: async (res) => {
            callback(res.resultStr)
          }
        })
      })
      return true
    },
    enterprisesWechat: (scanConfig, callback) => {
      wx.config({
        beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: false,
        appId: scanConfig.corpId, // 必填,公众号的唯一标识
        timestamp: scanConfig.timestamp, // 必填,生成签名的时间戳
        nonceStr: scanConfig.nonceStr, // 必填,生成签名的随机串
        signature: scanConfig.signature, // 必填,签名
        jsApiList: ['scanQRCode'] // 必填,需要使用的JS接口列表
      })
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['scanQRCode'],
          success: function (res) {
          }
        })
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: async (res) => {
            callback(res.resultStr)
          }
        })
      })
      return true
    }
  }
  const resultText = {
    dingding: (data) => {
      return JSON.parse(data.text)
    },
    wechat: (data) => {
      return JSON.parse(data)
    },
    enterprisesWechat: (data) => {
      return JSON.parse(data)
    }
  }
  return {
    doScan (type, scanConfig, callback) {
      scanStrategies[type](scanConfig, callback)
    },
    formatResult (type, data) {
      return resultText[type](data)
    }
  }
}
)()
