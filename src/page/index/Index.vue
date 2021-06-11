<!--首页-->
<template>
  <div class="index-main-wrap">
    <van-sticky class="sticky">
      <van-nav-bar
        title="高校科研创新服务平台"
        :safe-area-inset-top="true">
        <!--左侧图标-->
        <template #left>
          <van-icon :name="require('../../../public/static/image/icon_ep.png')" size="18"/>
        </template>
      </van-nav-bar>
      <!--模块图标-->
      <index-model-swiper/>
      <!--分割线-->
      <ep-divider/>
      <!--代办标题-->
      <index-todo-title title="代办事项"/>
      <ep-divider/>
    </van-sticky>
    <!--代办组件-->
    <index-todo-list/>
    <van-tabbar route>
      <van-tabbar-item icon="wap-home-o" to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="toMine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import IndexModelSwiper from '@/page/index/IndexModelSwiper'
import EpDivider from '@/components/EpDivider'
import IndexTodoList from '@/page/index/IndexTodoList'
import IndexTodoTitle from '@/page/index/IndexTodoTitle'
import { useRouter } from 'vue-router'
export default {
  components: {
    IndexModelSwiper,
    EpDivider,
    IndexTodoList,
    IndexTodoTitle
  },
  setup () {
    const router = useRouter()
    const toMine = () => {
      router.push('/mine')
    }
    return {
      toMine
    }
  }
}
</script>

<style scoped>
.index-main-wrap {
  background: #F5F5F5;
}

::v-deep(.van-swipe.my-swipe) {
  min-height: 200px;
  background: white;
}

</style>
