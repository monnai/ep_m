import * as config from '../../../public/static/config/serverConfig.json'

/**
 * 接口请求返回参数
 */
export const mobileResultCode = {
  SUCCESS: '200', // 接口成功调用
  MISSING_PARAMETER: '400', // 缺少参数
  LOGIN_NOT: '401', // 没登录
  INVALID_PARAMETER: '402', // 非法的参数
  INVALID_LOGIN_INFORMATION: '403', // 非法的登录信息
  INVALID_INTERFACE: '404', // 非法的接口
  INTERNAL_ERROR: '500', // 内部错误
  NO_DATA: '20010', // 未找到数据
  NO_JURISDICTION: '20011', // 无权限
  NEED_ROLE_SELECT: '20012', // 需要选择角色
  // 企业微信相关：
  WX_NEED_BIND_ACCOUNT: '20013' // 需要绑定
}

// 模块信息（从serverConfig.json中获取）
const modelInfoArray = config.menu

/**
 * 根据模块id获取模块配置信息
 * @param modelId
 * @returns {*}
 */
export const getInfoByModelId = (modelId) => {
  return modelInfoArray.filter(model => model.name === modelId)[0]
}

/**
 * 获取文件下载服务器地址
 * @returns {string}
 */
export const getFileServer = () => {
  return config.fileServer
}

/**
 * 判断是否是安卓浏览器
 */
const isAndroid = () => {
  return navigator.userAgent.indexOf('Android') > -1 ||
    navigator.userAgent.indexOf('Adr') > -1
}

// 判断是否是微信
const isWeiXin = () => {
  return /micromessenger/i.test(window.navigator.userAgent.toLowerCase())
}

// 判断是否是QQ浏览器
const isQQ = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return (userAgent.indexOf('qq') > -1) && !/micromessenger/i.test(userAgent)
}

export const upFrame = () => {
  if (isAndroid() && !isWeiXin() && !isQQ()) {
    const app = document.getElementById('app')
    app.style.height = app.offsetHeight + 300 + 'px'
    window.scrollTo(0, 999999)
  }
}

export const rollBackFrame = () => {
  if (isAndroid() && !isWeiXin() && !isQQ()) {
    const app = document.getElementById('app')
    app.style.height = app.offsetHeight - 300 + 'px'
  }
}

export const getUrlParam = function (name) {
  return decodeURIComponent(
    (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) ||
      [undefined, ''])[1].replace(/\+/g, '%20')) || null
}
