<!--首页代办列表子组件-->
<template>
  <div class="ep_todo_list_wrapper">
    <div>
      <!--代办列表-->
      <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="onLoad">
        <van-cell v-for="item in state.list" :key="item" :title="item"/>
      </van-list>
    </div>
  </div>

</template>

<script>
import { reactive } from 'vue'

export default {
  setup () {
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
    return {
      state,
      onLoad
    }
  }
}
</script>
<style scoped>
.ep_todo_list_wrapper {
  /*padding: 12px*/
}

</style>
