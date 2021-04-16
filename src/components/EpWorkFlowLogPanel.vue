<template>
  <van-popup teleport="body" v-model:show="state">
    <div class="ep-workflow-log-panel-wrapper">
      <h2>审核记录</h2>
      <template v-if="0===dataArray.length">
        <van-empty description="无审核日志"></van-empty>
      </template>
      <div class="van-steps van-steps--vertical">
        <template v-for="flow in dataArray" :key="flow.name">
          <div class="van-hairline van-step van-step--vertical van-step--finish work-flow-list-padding">
            <div class="van-step__title">
              <div>{{flow.v1}}</div>
              <div>{{flow.v2}}</div>
              <div>{{flow.v3}}</div>
              <div>{{flow.v4}}</div>
            </div>
            <div class="van-step__circle-container">
              <i class="van-step__circle"
                 :class="flow.type === 'pass'? 'pass': flow.type=== 'notpass'? 'notpass' : 'todo'"></i>
            </div>
            <div class="van-step__line"
                 :class="flow.type === 'pass'? 'pass': flow.type=== 'notpass'? 'notpass' : 'todo'"></div>
          </div>
        </template>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { inject, ref } from 'vue'

export default {
  setup () {
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
    const refresh = () => {
      dataArray.value = []
      load()
    }
    return {
      state,
      show,
      dataArray,
      refresh
    }
  }
}
</script>

<style scoped>
.ep-workflow-log-panel-wrapper {
  width: 297px;
  height: 475px;
}

.van-step__circle {
  width: 6px;
  height: 6px;
}

.van-step__circle {
  background-color: #D4D4D4;
  box-shadow: 0 0 0 3px #EBEDF1;
}

.van-step__line {
  background: repeating-linear-gradient(
    1deg, #D4D4D4, #D4D4D4 4px, #fff 0, #fff 8px);
}

.van-step__title {
  border: 1px solid #EEEEEEFF;
  border-radius: 4px;
  padding: 0.21333rem;
  box-shadow: 0 0 20px 1px #eeeeeeff;
}

.van-step__title > div:first-child {
  font-size: 16px;
  color: #333333FF;
}

.van-step__title > div:nth-of-type(n+2) {
  font-size: 12px;
  color: #666666FF;
}

.van-step__title > div:nth-child(3) {
  border-bottom: 1px solid #F3F3F3FF;
}

.van-step--vertical .van-step__circle-container {
  top: 26px;
}

.van-step__line {
  top: 31px;
}

h2 {
  text-align: center;
  padding: 19px
}
.van-step__title > div {
  padding: 6px 0 0 0
}
</style>
