<!--扫码绑定账号-->
<template>
   <div class="main_container">
     <div class="g-logo"></div>
     <div class="description">
       首次使用，请以科研人员角色登录<strong>科研管理平台pc端</strong>
       鼠标悬停右上角二维码图标，扫描弹出的二维码进行<strong>账号绑定</strong>
     </div>
     <div class="button">
     <van-button @click="scan"  v-show="btnShow"
                 :icon="require('../../../public/static/image/scan/scan.svg')"
     >扫一扫</van-button>
     </div>
   </div>
</template>

<script>
import { doScan, formatResult } from '@/assets/js/scan'
import { getDockingConfig, bindAccount } from '@/request/docking_uri'
import { mobileResultCode } from '@/assets/js/common'
import { Toast } from 'vant'
import { router } from '@/route'
import { onMounted, ref } from 'vue'
export default {
  setup () {
    let dockingConfig = {}
    const btnShow = ref(false)
    onMounted(() => {
      const currentUrl = window.location.href.split('#')[0]
      getDockingConfig({ url: currentUrl }).then(res => {
        dockingConfig = res.body.data.item
        btnShow.value = true
      })
    })
    const callback = (data) => {
      const scanResult = formatResult(sessionStorage.getItem('servMode'), data)
      if (scanResult.account) {
        bindAccount({
          bindUserId: sessionStorage.getItem('bindUserId'),
          account: scanResult.account
        }).then(result => {
          if (result.body.code === mobileResultCode.SUCCESS) {
            // 绑定成功，将登录相关信息缓存
            sessionStorage.setItem('session_key', result.body.data.item.key)
            sessionStorage.setItem('session_model_authority', result.body.data.item.joinCheckModules)
            sessionStorage.setItem('roleList', result.body.data.item.userGroups
              ? JSON.stringify(result.body.data.item.userGroups) : JSON.stringify(
                {}))
            router.push('index')
            return
          }
          Toast('绑定失败，原因：' + result.body.data.message)
          return false
        })
      } else {
        Toast('无法识别此二维码，请扫描科研系统后台二维码进行扫码绑定')
      }
    }
    const scan = () => {
      doScan(sessionStorage.getItem('servMode'), dockingConfig, callback)
    }
    return {
      dockingConfig,
      scan,
      btnShow
    }
  }
}
</script>

<style scoped>
.main_container{
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
::v-deep(button.van-button.van-button--default.van-button--normal) {
  background: #1989fa;
  color: white;
}
::v-deep(.van-icon__image) {
  width: 32px;
  height: 32px;
}
.g-logo {
  width: 239.63px;
  height: 146.87px;
  margin: 0 auto;
  background-size: cover;
  background-image: url("../../image/common/logo_scan.png") !important;
}
.description {
  padding: 0 56px;
  color: #666666;
  font-size: 16px;
  text-align: left;
  /*font-weight: bold;*/
}
strong {
  color: #333333;
}
button {
   margin-bottom: 20vh;
   width: 50%;
   justify-content: center;
   font-size: 16px;
 }
.button{
  height: 20vh;
  width: 100%;
}
</style>
