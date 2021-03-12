/**
 * api接口统一管理
 */
import { get } from './http'

export const apiAddress = p => get(
  'https://www.baidu.com')
// 登录
export const Login = loginParams => get('login.json', loginParams)
// 角色选择
export const selectRole = p => get('login/switchGroup.json', p)

// 菜单获取
async function menu_ () {
  return await get('../static/config/serverConfig.json', {}).then(r => {
    return r.menu
  })
}
export const menu = menu_
