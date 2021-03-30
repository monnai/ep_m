// 数据格式化工具类

/**
 * for vue: 日期格式化
 **/
export function dateFormat (value, format) {
  if (typeof (value) === 'undefined' || value === null || value === '') {
    return value
  }
  const date = new Date(value)
  format = format || 'yyyy-MM-dd'
  const o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1,
        // eslint-disable-next-line eqeqeq
        RegExp.$1.length === 1 ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

/**
 * for vue: 根据文件全名称获取文件扩展名
 */
export function fileTypeFormat (fileName) {
  const fileType = fileName.split('.')
  return fileType.pop()
}