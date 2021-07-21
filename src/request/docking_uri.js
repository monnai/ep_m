/*!
 * 三方对接相关请求
 * @author gushouchen
 */

import { get } from './http'

// 三方对接用户身份授权
export const dockingAuth = (params) => {
  return get('login.json', params)
}

// 三方对接用户账号绑定
export const dockingBind = (params) => {
  return get('login/bindUser.json', params)
}

// 扫码绑定依赖js-sdk配置获取
export const getWxConfig = (params) => {
  return get('login/bindUser.json', params)
}

// 扫码绑定接口
export const bindAccount = (params) => {
  return get('login/bindUser.json', params)
}

export const getDockingConfig = (params) => {
  return get('category/getDockingConfiguration.json', params)
}
