/**
 * 接口请求返回参数
 */
export const mobileResultCode = {
  // 接口成功调用
  SUCCESS: '200',
  // 需要选择角色
  NEED_ROLE_SELECT: '20012',
  // 缺少参数
  MISSING_PARAMETER: '400',
  // 没登录
  LOGIN_NOT: '401',
  // 非法的参数
  INVALID_PARAMETER: '402',
  // 非法的登录信息
  INVALID_LOGIN_INFORMATION: '403',
  // 非法的接口
  INVALID_INTERFACE: '404',
  // 内部错误
  INTERNAL_ERROR: '500',
  // 未找到数据
  NO_DATA: '20010',
  // 无权限
  NO_JURISDICTION: '20011',
  // 需要绑定微信账号
  WX_NEED_BIND_ACCOUNT: '20013'
}

/**
 * 三方对接模式码表
 */
export const servModeCode = {
  // 企业微信
  SERV_MODE_WORK_WX: 'enterprisesWechat',
  SERV_MODE_BROWSER: 'browser',
  SERV_MODE_DINGDING: 'dingding',
  SERV_MODE_WX: 'wechat'
}

/**
 * 根据模块id获取模块配置信息
 * @param modelId
 * @returns {*}
 */
export const getInfoByModelId = (modelId) => {
  return window.g.menu.filter(model => model.name === modelId)[0]
}

/**
 * 获取文件下载服务器地址
 * @returns {string}
 */
export const getFileServer = () => {
  return sessionStorage.getItem('fileServer')
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
