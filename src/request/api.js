/**
 * api接口统一管理
 */
import { get } from './http'

// 菜单获取
import { getSessionStorage } from '@/util/storageUtil'

// 登录
export const login = loginParams => get('login.json', loginParams)
// 角色选择
export const selectRole = p => get('login/switchGroup.json', p)

// 根据模块类型获取模块列表
export const getListByModel = (p) => {
  const apiPrefix = getSessionStorage('apiPrefix')
  return get(apiPrefix + '/list.json', p)
}

// 详情页 基础信息
export const base = () => {
  const itemId = sessionStorage.getItem('itemId')
  return get(sessionStorage.getItem('apiPrefix') + '/' + itemId + '/get.json',
    {})
}

// 详情页 人员信息

export const member = () => {
  const itemId = sessionStorage.getItem('itemId')
  return get(sessionStorage.getItem('apiPrefix') + '-member/list.json',
    { projectId: itemId })
}

export const author = () => {
  const itemId = sessionStorage.getItem('itemId')
  return get(sessionStorage.getItem('apiPrefix') + '-author/list.json',
    { projectId: itemId })
}

// 详情页 预算信息

export const budget = () => {
  const itemId = sessionStorage.getItem('itemId')
  return get(sessionStorage.getItem('apiPrefix') + '/getBudget.json',
    { projectId: itemId })
}

// 详情页 文档

export const document = () => {
  const itemId = sessionStorage.getItem('itemId')
  const url = sessionStorage.getItem('apiPrefix') + '-document/list.json'
  return get(url, { projectId: itemId })
}

// 详情页-用印 文档
export const inchapterDocument = () => {
  const itemId = sessionStorage.getItem('itemId')
  const url = 'inchapter-detail/list.json'
  return get(url, { projectId: itemId })
}
// 详情页-论文投稿 文档
export const paperSubmissionDocument = () => {
  const itemId = sessionStorage.getItem('itemId')
  const url = sessionStorage.getItem('apiPrefix') + '-document/list.json'
  return get(url, { productId: itemId })
}

// 审核流程

export const workflow = () => {
  const itemId = sessionStorage.getItem('itemId')
  return get(sessionStorage.getItem('apiPrefix') + '/getWorkFlow.json',
    { dataId: itemId })
}

// 审核日志

export const workflowLog = () => {
  const itemId = sessionStorage.getItem('itemId')
  return get(sessionStorage.getItem('apiPrefix') + '/getCheckLogs.json',
    { dataId: itemId })
}

// 代办数
export const todoCount = () => {
  return get('todo-content/getTodoCount.json', {})
}

// 代办列表
export const todoList = () => {
  return get('todo-content/getTodoList.json', { pageSize: 20000 })
}

// 审核操作
export const audit = (checkType, message) => {
  const itemId = sessionStorage.getItem('itemId')
  return get(sessionStorage.getItem('apiPrefix') + '/' + itemId + '/check.json',
    {
      checkType: checkType,
      checkInfo: message
    })
}

// 筛选条件数据字典
export const category = () => {
  return get('category/getCategoryList.json', {
    categoryName: 'DM_CHECK_CHECKSTATUS',
    beanId: 'zXProject'
  })
}

// 经费认领： 查询来款信息
export const income = (searchKey) => {
  return get('cwincome/list.json', {
    searchKey: searchKey
  })
}

// 经费认领： 查询项目信息
export const incomeProject = (cwIncomeId, projectName) => {
  return get('project/getCWIncomeClaimProjects.json', {
    cwIncomeId: cwIncomeId,
    name: projectName
  })
}

// 经费认领提交
export const fundClaimFormSubmit = (params) => {
  return get('cwincomeclaim/save.json', params)
}

// 我的：用户信息
export const getPersonDetail = () => {
  return get('person/getPersonDetail.json')
}
