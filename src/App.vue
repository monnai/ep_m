<template>
  <router-view/>
</template>

<script>
import * as echarts from 'echarts'
import { provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { workWXAuth } from '@/request/api'
import { mobileResultCode, getUrlParam } from '@/assets/js/common'
export default {
  name: 'App',
  components: {},
  setup () {
    provide('echarts', echarts)
    const router = useRouter()
    onMounted(() => {
      const token = sessionStorage.getItem('session_key')
      if (!token) {
        const code = getUrlParam('code')
        workWXAuth({ wechatUserCode: code }).then((res) => {
          const code = res.body.code
          if (code === mobileResultCode.SUCCESS) {
            // 绑定状态，直接跳转index页面
            sessionStorage.setItem('session_key', res.body.data.item.key)
            sessionStorage.setItem('session_model_authority', res.body.data.item.joinCheckModules)
            sessionStorage.setItem('roleList', JSON.stringify(res.body.data.item.userGroups))
            router.push('index')
          } else if (code === mobileResultCode.WX_NEED_BIND_ACCOUNT) {
            sessionStorage.setItem('wechatUserId', res.body.data.item.wechatUserId)
            router.push('login')
          }
        })
      }
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
