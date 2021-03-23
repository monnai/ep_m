// 本地存储工具类
// noinspection JSUnusedGlobalSymbols
/**
 * 设置本地localStorage
 * @name {String} 数据对象的KEY
 * @data {all} 对应key的数据
 */
export function setLocalStorage (name, data) {
  localStorage.setItem(name, data)
}

// noinspection JSUnusedGlobalSymbols
/**
 * 拿到本地localStorage
 * @name {String} 数据对象的KEY
 */
export function getLocalStorage (name) {
  return localStorage.getItem(name)
}

// noinspection JSUnusedGlobalSymbols
/**
 * 设置本地sessionStorage
 * @name {String} 数据对象的KEY
 * @data {all} 对应key的数据
 */
export function setSessionStorage (name, data) {
  sessionStorage.setItem(name, data)
}

// noinspection JSUnusedGlobalSymbols
/**
 * 拿到本地sessionStorage
 * @name {String} 数据对象的KEY
 */
export function getSessionStorage (name) {
  return sessionStorage.getItem(name)
}
