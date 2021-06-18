<template>
  <van-popup teleport="body"
             closeable
             v-model:show="state">
    <div class="ep-workflow-log-panel-wrapper">
      <div>
        <van-nav-bar title="审核记录">
          <template #left>
          </template>
          <template #right>
          </template>
        </van-nav-bar>
        <template v-if="dataArray.length > 0">
          <ep-total-bar :total="total"/>
        </template>
      </div>
      <div class="audit-log__content">
      <template v-if="0===dataArray.length">
        <van-empty description="未查询到审核记录"></van-empty>
      </template>
      <div class="van-steps van-steps--vertical">
        <template v-for="flow in dataArray" :key="flow.name">
          <div class="van-hairline van-step van-step--vertical van-step--finish work-flow-list-padding">
            <div class="van-step__title">
              <div :style="{color : computeText(flow.v1)}">{{flow.v1}}</div>
              <div><span>{{flow.v2}}</span><span>{{flow.v3}}</span></div>
              <div>{{flow.v4}}</div>
            </div>
            <div class="van-step__circle-container">
              <i class="van-step__circle"
                 :style="{background: computeCircle(flow.v1)}"></i>
            </div>
            <div class="van-step__line"
                 :style="computeLine(flow.v1)"></div>
          </div>
        </template>
      </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { inject, ref, computed } from 'vue'
import EpTotalBar from '@/components/EpTotalBar'

export default {
  components: {
    EpTotalBar
  },
  setup () {
    const state = ref(false)
    const show = () => {
      state.value = true
    }
    const total = ref()
    const dataArray = ref([])
    const log = inject('log')
    const logCallback = inject('logCallback')
    const load = () => {
      log().then(res => {
        logCallback(res, dataArray.value)
        total.value = dataArray.value.length
      })
    }
    load()
    const refresh = () => {
      dataArray.value = []
      load()
    }
    const checkStatus = {
      success: ['科研处通过', '科室通过'],
      error: ['科研处退回', '科室退回']
    }
    const computeColor = (param) => {
      if (checkStatus.success.indexOf(param) !== -1) {
        return '#1dc791'
      } else if (checkStatus.error.indexOf(param) !== -1) {
        return '#ee3845'
      } else {
        return '#999999'
      }
    }
    /**
     * 计算文字颜色
     */
    const computeText = computed(() => {
      return (status) => {
        return computeColor(status)
      }
    })
    /**
     * 计算圆环颜色
     */
    const computeCircle = computed(() => {
      return (status) => {
        return computeColor(status)
      }
    })
    /**
     * 计算虚线颜色
     */
    const computeLine = computed(() => {
      return (status) => {
        const color = computeColor(status)
        return 'background: repeating-linear-gradient(183deg, ' + color + ', ' + color + ' 0.10667rem, #fff 0, #fff 0.21333rem);}'
      }
    })
    return {
      state,
      show,
      total,
      dataArray,
      refresh,
      computeText,
      computeLine,
      computeCircle
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
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 5px;
  box-shadow: 0 0 10px 7px rgb(244 244 244);
}

.van-step__title > div:first-child {
  font-size: 16px;
  font-weight: bold;
  color: #333333FF;
}

.van-step__title > div:nth-of-type(n+2) {
  font-size: 12px;
  color: #666666FF;
}

.van-step__title > div:nth-child(2) {
  padding: 8px 12px 7px 1px;
}

.van-step__title > div:nth-child(3) {
  padding: 8px 12px 7px 1px;
  border-top: 1px solid #f3f3f3;
  color: #818181;
}

.van-step--vertical .van-step__circle-container {
  top: 31px;
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
.audit-log__content {
  height: 395px;
  overflow: scroll;
}
::v-deep(.van-nav-bar__content){
  height: 53px;
}
.van-step--vertical:not(:last-child)::after {
  border-bottom-width: 0;
}

.van-step__title >div:nth-child(2) > span:nth-child(2) {
  float: right
}

.van-step--vertical {
  display: block;
  float: none;
  padding: 8px 22px 0 10px;
  line-height: 0.48rem;
}
::v-deep(.total) {
  background: #ffffff;
  padding: 6px 0 6px 15px;
  font-weight: bold;
}

::v-deep(.van-steps--vertical) {
  padding: 0 0 12px 0.85333rem;
}
</style>
