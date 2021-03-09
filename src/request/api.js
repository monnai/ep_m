/**
 * api接口统一管理
 */
import { get } from './http'

export const apiAddress = p => get(
  'https://www.baidu.com')
// 登录
export const doLogin = loginParams => get('login.json', loginParams)
// 角色选择
export const selectRole = p => get('login/switchGroup.json', p)
