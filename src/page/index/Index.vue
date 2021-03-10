<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="高校科研创新服务平台"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        safe-area-inset-top="true">
        <template #left>
          <van-icon name="/static/image/icon_ep.png" size="18"/>
        </template>
        <template #right>
          <van-badge dot>
            <van-icon name="/static/image/icon_bell.png" size="18"/>
          </van-badge>
        </template>
      </van-nav-bar>
      <index-model-swiper/>
      <ep-divider/>
      <index-todo-title/>
    </van-sticky>
    <index-todo-list/>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="contact" dot>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import { Toast } from 'vant'
import { ref } from 'vue'
import IndexModelSwiper from '@/page/index/IndexModelSwiper'
import EpDivider from '@/components/EpDivider'
import IndexTodoList from '@/page/index/IndexTodoList'
import IndexTodoTitle from '@/page/index/IndexTodoTitle'

export default {
  components: {
    IndexModelSwiper,
    EpDivider,
    IndexTodoList,
    IndexTodoTitle
  },
  setup () {
    const onClickLeft = () => Toast('返回')
    const onClickRight = () => Toast('按钮')
    const active = ref('home')
    return {
      onClickLeft,
      onClickRight,
      active
    }
  }
}
</script>

<style>

</style>
