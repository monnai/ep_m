<template>
  <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad">
      <div>
        <van-cell-group v-for="(item,index) in state.list" :key="item">
          <van-cell is-link @click="toDetail(item.v0)">
            <template #title>
              <div class="ep-list-wrapper">
                <div>{{item.v1}}</div>
                <div>{{item.v2}}</div>
                <div>{{item.v3}} {{item.v4}}</div>
              </div>
            </template>
            <template #icon>
              <div>
                <van-tag mark color="#E9F4FE" text-color="#2494F2">{{index + 1}}</van-tag>
              </div>
            </template>
            <template #right-icon>
              <div>
                <van-tag type="primary">{{item.v5}}</van-tag>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { reactive } from 'vue'
import { getSessionStorage, setSessionStorage } from '@/util/storageUtil'
import { useRouter } from 'vue-router'

export default {
  props: {
    params: Object,
    request: Function
  },
  setup (props) {
    const router = useRouter()
    const state = reactive({
      total: 0,
      list: [],
      pageNo: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      refreshing: false
    })

    const onLoad = () => {
      if (state.refreshing) {
        state.list = []
        state.refreshing = false
      }
      props.request(state)
    }

    const onRefresh = () => {
      // 清空列表数据
      state.finished = false
      state.refreshing = true
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true
      state.pageNo = 1
      onLoad()
    }

    const toDetail = (itemId) => {
      setSessionStorage('itemId', itemId)
      router.push(getSessionStorage('detailRouter'))
    }
    return {
      state,
      onLoad,
      onRefresh,
      toDetail
    }
  }
}
</script>

<style scoped>
.ep-list-wrapper {
  text-align: left;
}

::v-deep(.van-cell) {
  padding: 0;
}

::v-deep(.van-cell-group) {
  background-color: #fff;
  margin: 7px 12px 7px 12px;
  box-shadow: 0 0 20px 0 rgb(211 211 211 / 30%);
  border-radius: 7px;
}

::v-deep(span.van-tag.van-tag--mark.van-tag--default ) {
  width: 14px;
  margin-right: 9px;
}

.ep-list-wrapper > div {
  padding: 4px;
}

.ep-list-wrapper > div:nth-child(1) {
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
  color: #333333;
  font-weight: bold;
}

.ep-list-wrapper > div:nth-of-type(n+2) {
  font-size: 13px;
  color: #666666;
  font-weight: lighter;
}
</style>
