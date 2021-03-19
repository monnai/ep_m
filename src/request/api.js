/**
 * api接口统一管理
 */
import { get } from './http'

// 菜单获取
import * as config from '../../public/static/config/serverConfig.json'

export const apiAddress = p => get(
  'https://www.baidu.com')
// 登录
export const Login = loginParams => get('login.json', loginParams)
// 角色选择
export const selectRole = p => get('login/switchGroup.json', p)

export const menu = () => {
  return config.menu
}

// 纵向项目列表
async function zxProject_ (p) {
  return await get('zxproject/list.json', p).then(r => {
    return r
  })
}

export const zxProject = zxProject_

// 详情页 基础信息
export const base = (modelId) => {
  if (!modelId) {
    console.error('modelId 格式不正确')
  }
  const url = 'zxproject/' + modelId + '/get.json'
  // get(url, {}).then(res => fn(res))
  return get(url, {})
}

// 详情页 人员信息

export const member = (modelId) => {
  if (!modelId) {
    console.error('modelId 格式不正确')
  }
  const url = 'zxproject-member/list.json'
  return get(url, { projectId: modelId })
}

// 详情页 预算信息

export const budget = (modelId) => {
  if (!modelId) {
    console.error('modelId格式不正确')
  }
  const url = 'zxproject/getBudget.json'
  return get(url, { projectId: modelId })
}

// 详情页 文档

export const document = (modelId) => {
  if (!modelId) {
    console.error('modelId格式不正确')
  }
  const url = 'zxproject-document/list.json'
  return get(url, { projectId: modelId })
}

// 审核流程

export const workflow = (modelId) => {
  if (!modelId) {
    console.error('modelId格式不正确')
  }
  return get('zxproject/getWrokFlow.json', { id: modelId })
}

// 审核流程

export const workflowLog = (modelId) => {
  if (!modelId) {
    console.error('modelId格式不正确')
  }
  return get('zxproject/getCheckLogs.json', { id: modelId })
}

// 代办数
export const todoCount = () => {
  return get('todo-content/getTodoCount.json', {})
}

// 代办列表
export const todoList = () => {
  return get('todo-content/getTodoList.json', { pageSize: 20000 })
}
