<!--扫码绑定账号-->
<template>
   <div>
     <div class="g-logo"></div>
     <div class="description">
       首次使用，请进入pc后台，进入个人角色扫描授权二维码进行绑定
     </div>
     <van-button @click="scan"  v-if="btnShow"
                 :icon="require('../../../public/static/image/scan/scan.svg')"
     >打开扫一扫</van-button>
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
          if (result.body.code === mobileResultCode.NO_JURISDICTION) {
            Toast('无访问权限')
            return false
          }
          if (result.body.code === mobileResultCode.NO_DATA) {
            Toast('绑定失败，原因：' + result.body.data.message)
            return false
          }
          // 绑定成功，将登录相关信息缓存
          sessionStorage.setItem('session_key', result.body.data.item.key)
          sessionStorage.setItem('session_model_authority', result.body.data.item.joinCheckModules)
          sessionStorage.setItem('roleList', result.body.data.item.userGroups
            ? JSON.stringify(result.body.data.item.userGroups) : JSON.stringify(
              {}))
          router.push('index')
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
::v-deep(button.van-button.van-button--default.van-button--normal) {
  margin-top: 80%;
  background: #1989fa;
  color: white;
}
::v-deep(.van-icon__image) {
  width: 32px;
  height: 32px;
}
.g-logo {
  width: 84px;
  height: 84px;
  margin: 0 auto;
  background-size: cover;
  background-image: url("../../image/common/logo_company.png") !important;
}

</style>
