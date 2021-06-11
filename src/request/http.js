import QueryString from 'qs'
import axios from 'axios'
import router from '../route'
import { Toast } from 'vant'
import { mobileResultCode, servModeCode } from '@/assets/js/common'
import { Docking } from '@/assets/js/docking'
// 环境参数初始化
sessionStorage.setItem('menu', JSON.stringify(window.g.menu))
// 业务接口请求后缀
const apiSuffix = '/mobileTerminal'
// 文件下载接口后缀
const fileSuffix = '/servFileDownLoad'
switch (process.env.NODE_ENV) {
  case 'development':
    axios.defaults.baseURL = window.g.devServer
    sessionStorage.setItem('fileServer', window.g.devServer + fileSuffix)
    break
  case 'debug':
    axios.defaults.baseURL = window.g.debugServer + apiSuffix
    sessionStorage.setItem('fileServer', window.g.debugServer + fileSuffix)
    break
  case 'production':
    axios.defaults.baseURL = window.g.prodServer + apiSuffix
    sessionStorage.setItem('fileServer', window.g.prodServer + fileSuffix)
    break
  default:
    break
}

// 默认十秒超时
axios.defaults.timeout = 10000

// 请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.error(error)
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      /* token过期处理：
         1.如果是浏览器访问，跳转至登录页重新登录获取token
         2.如果是三方对接，跳转至授权页，重新获取token
      */
      if (response.data.body.code === mobileResultCode.INVALID_LOGIN_INFORMATION) {
        // 浏览器访问
        sessionStorage.removeItem('session_key')
        if (sessionStorage.getItem('servMode') === servModeCode.SERV_MODE_BROWSER) {
          Toast({
            message: response.data.body.message,
            duration: 1500,
            forbidClick: true
          })
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        } else {
          // 对接第三方
          Docking.doDocking(sessionStorage.getItem('servMode'))
        }

        return false
      }
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 异常处理
  error => {
    if (error.response.status) {
      Toast({
        message: '错误信息：' + error.response.data,
        duration: 1500,
        forbidClick: true
      })
    }
    return Promise.reject(error.response)
  }
)

/**
 * get方法，对应get请求
 * @param {string} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      headers: {
        'token-key': sessionStorage.getItem('session_key')
          ? sessionStorage.getItem('session_key')
          : ''
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QueryString.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
