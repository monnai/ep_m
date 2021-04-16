<!--经费认领：认领步骤条-->
<template>
  <van-nav-bar
    :title="state.title"
    :safe-area-inset-top="true">
    <template #left>
      <van-icon :name="require('../../../public/static/image/icon_ep.png')" size="18"/>
    </template>
    <template #right>
    </template>
  </van-nav-bar>
  <van-steps :active="state.active">
    <van-step>认领信息填写</van-step>
    <van-step>经费卡拆分</van-step>
    <van-step>经费拆分</van-step>
<!--    <van-step>认领申请成功</van-step>-->
  </van-steps>
  <van-tabbar route>
    <van-tabbar-item>
      <div class="tab_icon"><ep-svg-icon icon-color="#2494f2" icon-name="step_previous"/></div>
      <div>上一步</div>
    </van-tabbar-item>
    <van-tabbar-item>
      <div class="tab_icon"><ep-svg-icon icon-color="#2494f2" icon-name="step_next_fill"/></div>
      <div>下一步</div>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { reactive } from 'vue'
import EpSvgIcon from '@/components/EpSvgIcon'
export default {
  components: {
    EpSvgIcon
  },
  setup () {
    const state = reactive({
      active: 0,
      title: sessionStorage.getItem('modelName')
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
svg.svg-icon {
  width: 25px;
  height: 25px;
  fill: #2494f2;
}
</style>
