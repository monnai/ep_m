<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <van-grid>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
          </van-grid>
          <van-grid>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
          </van-grid>
        </van-swipe-item>
        <van-swipe-item>
          <van-grid>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
          </van-grid>
          <van-grid>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
          </van-grid>
        </van-swipe-item>
        <van-swipe-item>
          <van-grid>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
          </van-grid>
          <van-grid>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
            <van-grid-item icon="photo-o" text="文字"/>
          </van-grid>
        </van-swipe-item>
      </van-swipe>
    </van-sticky>
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in state.list" :key="item" :title="item"/>
    </van-list>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search" dot>标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o" badge="5">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" badge="20">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import { Toast } from 'vant'
import { reactive, ref } from 'vue'

export default {
  setup () {
    const onClickLeft = () => Toast('返回')
    const onClickRight = () => Toast('按钮')
    // 模拟列表
    const state = reactive({
      list: [],
      loading: false,
      finish: false
    })
    const onLoad = () => {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          state.list.push(state.list.length + 1)
        }
        state.loading = false
        if (state.list.length >= 40) {
          state.finished = true
        }
      }, 1000)
    }
    const active = ref('home')
    return {
      onClickLeft,
      onClickRight,
      state,
      onLoad,
      active
    }
  }
}
</script>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
