<template>
  <van-popup teleport="body" v-model:show="state">
    <div class="ep-workflow-log-panel-wrapper">
      <van-cell-group v-for="item in dataArray" :key="item.v0">
        <van-cell >
          <template #title>
            <div class="ep-list-wrapper">
              <div>{{item.v1}}</div>
              <div>{{item.v2}}</div>
              <div>{{item.v3}} {{item.v4}}</div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </van-popup>
</template>

<script>
import { inject, ref } from 'vue'

export default {
  setup (props) {
    const state = ref(false)
    const show = () => {
      state.value = true
    }
    const dataArray = ref([])
    const log = inject('log')
    const logCallback = inject('logCallback')
    const load = () => {
      log().then(res => {
        logCallback(res, dataArray.value)
      })
    }
    load()
    return {
      state,
      show,
      dataArray
    }
  }
}
</script>

<style>
.ep-workflow-log-panel-wrapper {
  width: 297px;
  height: 475px;
}
</style>
