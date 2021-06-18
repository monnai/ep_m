<!--列表公共头导航栏组件-->
<template>
  <van-nav-bar
    :title="title"
    left-arrow
    @click-left="toIndex">
  </van-nav-bar>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup () {
    // 展示标题
    const title = sessionStorage.getItem('modelName')
    const router = useRouter()
    // 回到首页
    const toIndex = () => {
      router.push('/index')
    }
    return {
      title,
      toIndex
    }
  }
}
</script>
