/*!
 * 环境配置初始化
 * @author gushouchen
 */
import { getConfig } from '@/request/api'
import { doDockingAuth } from '@/assets/js/docking'

export const doInitConfig = () => {
  getConfig().then(res => {
    // 获取三方对接模式
    const servMode = res.body.data.item.servMode
    if (servMode) {
      sessionStorage.setItem('servMode', servMode)
      doDockingAuth(servMode)
    }
  })
}
