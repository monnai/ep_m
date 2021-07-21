/*!
 * 环境配置初始化
 * @author gushouchen
 */
import { getConfig } from '@/request/api'
import { doDockingAuth } from '@/assets/js/docking'

export const initConfig = () => {
  getConfig().then(res => {
    // 获取三方对接模式
    const servMode = res.body.data.item.servMode
    if (servMode) {
      sessionStorage.setItem('servMode', servMode)
      // 钉钉特殊处理，缓存corpId
      if (servMode === 'dingding') {
        sessionStorage.setItem('corpId', res.body.data.item.corpid)
      }
      doDockingAuth(servMode)
    }
  })
}
