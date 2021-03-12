<template>
  <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad">
      <div>
        <van-cell-group v-for="item in state.list" :key="item">
          <van-cell is-link to="/zxDetail">
            <template #title>
              <div class="ep-list-wrapper">
                <div>南开大学</div>
                <div>Acat Biochimica et Biophysica</div>
                <div>张三</div>
                <div>电影学,2020/08/17,学校通过</div>
              </div>
            </template>
            <template #icon>
              <div>121</div>
            </template>
            <template #right-icon>
              <div>待审核 ></div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup () {
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    })

    const onLoad = () => {
      setTimeout(() => {
        if (state.refreshing) {
          state.list = []
          state.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          state.list.push(state.list.length + 1)
        }
        state.loading = false

        if (state.list.length >= 40) {
          state.finished = true
        }
      }, 1000)
    }

    const onRefresh = () => {
      // 清空列表数据
      state.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true
      onLoad()
    }

    return {
      state,
      onLoad,
      onRefresh
    }
  }
}
</script>

<style>
.ep-list-wrapper {
  text-align: left;
}
</style>
