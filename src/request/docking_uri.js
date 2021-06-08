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
