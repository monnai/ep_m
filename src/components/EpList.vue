<template>
  <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad">
      <div>
        <van-cell-group v-for="(item,index) in state.list" :key="item">
          <van-cell is-link to="/zxDetail">
            <template #title>
              <div class="ep-list-wrapper">
                <div>{{item.v1}}</div>
                <div>{{item.v2}}</div>
                <div>{{item.v3}} {{item.v4}}</div>
              </div>
            </template>
            <template #icon>
              <div><van-tag mark type="primary">{{index + 1}}</van-tag></div>
            </template>
            <template #right-icon>
              <div><van-tag type="primary">{{item.checkStatus}}</van-tag></div>
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
  props: {
    params: Object,
    request: Function
  },
  setup (props) {
    const state = reactive({
      total: 0,
      list: [],
      pageNo: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      refreshing: false
    })

    const onLoad = async () => {
      if (state.refreshing) {
        state.list = []
        state.refreshing = false
      }
      await props.request(state)
      state.pageNo++
      // for (let i = 0; i < 10; i++) {
      //   state.list.push(state.list.length + 1)
      // }
      state.loading = false
      if (state.list.length >= state.total) {
        state.finished = true
      }
    }

    const onRefresh = async () => {
      // 清空列表数据
      state.finished = false
      state.refreshing = true
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true
      state.pageNo = 1
      await onLoad()
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
