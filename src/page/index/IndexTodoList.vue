<!--首页代办列表子组件-->
<template>
  <div class="ep_todo_list_wrap">
    <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
      <template v-if="state.finished && state.list.length === 0">
        <van-empty description="无代办内容"></van-empty>
      </template>
      <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text=""
        @load="onLoad">
        <div style="background: #F5F5F5;">
          <van-cell-group v-for="(item) in state.list" :key="item">
            <van-cell is-link @click="toDetail(item.v0, item.v4)">
              <template #title>
                <div class="ep-list-wrapper">
                  <div class="todo_title">{{item.v1}}</div>
                  <div class="todo_content">
                    <div>{{item.v2}}</div>
                    <div
                      :class="item.v3 === '科研处通过' ? 'ep_pass'
                    :item.v3 === '审核中'? 'ep_wait'
                    : item.v3 === '暂存'? 'ep_save'
                    : 'ep_not_pass'">
                      {{item.v3}}
                    </div>
                  </div>
                </div>
              </template>
              <template #right-icon>
                <div>
                  <van-tag type="primary">{{item.checkStatus}}</van-tag>
                </div>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>

import { reactive } from 'vue'
import { todoList } from '@/request/api'
import { dateFormat } from '@/util/formatUtil'
import { useRouter } from 'vue-router'
import { getInfoByModelId } from '@/assets/js/common'

export default {
  setup () {
    const state = reactive({
      total: 0,
      list: [],
      pageNo: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      refreshing: false
    })

    // 数据加载事件
    const onLoad = () => {
      // 如果是刷新触发，清空过往数据再进行请求
      if (state.refreshing) {
        state.list = []
        state.refreshing = false
      }
      // 请求代办列表接口后自定义数据绑定和回调
      todoList().then(res => {
        // 获取返回的代办内容数组
        const resData = res.body.data.item
        for (let i = 0; i < resData.length; i++) {
          state.list.push({
            v0: resData[i].dataId,
            v1: resData[i].title,
            v2: dateFormat(resData[i].lastEditDate),
            v3: resData[i].checkStatus,
            v4: resData[i].moduleId
          })
        }
        // 更新列表的页数和加载状态
        state.pageNo++
        state.loading = false
        // 设置是否到底部
        if (state.list.length >= state.total) {
          state.finished = true
        }
      })
    }
    // 数据刷新事件
    const onRefresh = () => {
      state.finished = false
      state.refreshing = true
      state.loading = true
      state.pageNo = 1
      onLoad()
    }
    const router = useRouter()
    // 跳转详情页
    const toDetail = (itemId, modelId) => {
      const modelInfo = getInfoByModelId(modelId)
      sessionStorage.setItem('itemId', itemId)
      sessionStorage.setItem('modelName', modelInfo.title)
      sessionStorage.setItem('apiPrefix', modelInfo.apiPrefix)
      router.push(modelInfo.router[1])
    }
    return {
      state,
      onRefresh,
      onLoad,
      toDetail
    }
  }
}
</script>
<style scoped>
.todo_title {
  color: #333333;
  font-size: 14px;
  line-height: 31px;
  font-weight: bold;
  text-align: left;
  border-bottom: 1px solid #F3F3F3;
}

.todo_content :nth-child(1) {
  color: #666666;
  font-size: 13px;
  float: left;
}

.todo_content :nth-child(2) {
  font-size: 13px;
  float: right;
}

::v-deep(.van-cell-group) {
  background-color: #fff;
  /* border: 1px solid red; */
  padding: 7px;
  margin-bottom: 7px;
  margin-left: 12px;
  margin-right: 12px;
}

@media (prefers-color-scheme: light) {
  /* 当系统是使用浅色模式 */
  body {
    background-color: #fff;
    color: #000;
  }
}

@media (prefers-color-scheme: dark) {
  /* 当系统是使用深色模式 */
  body {
    background-color: #000;
    color: #fff;
  }
}

@media (prefers-color-scheme: no-preference) {
  body {
    background-color: #fff;
    color: #000;
  }
}

.ep_todo_list_wrap{
  min-height: 357px;
  background: white;
  margin-bottom: 42px;
}

::v-deep(.van-cell) {
  width: 100%;
  padding: 0 12px 0 12px;
}
.todo_content {
}
</style>
