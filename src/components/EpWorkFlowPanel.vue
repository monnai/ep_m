<template>
  <van-popup teleport="body" v-model:show="state">
    <div class="ep-workflow-panel-wrapper">
      <div class="ep-workflow-panel-title" :class="checkStatus === '审核不通过'? 'notpass': 'pass'">
        <div class="ep-audit-logo">
          <ep-svg-icon :icon-name="checkStatus === '审核不通过'?'check_not_pass':
                                   checkStatus === '审核通过'? 'check_pass_single':
                                   checkStatus === '审核中'? 'check_waiting': 'check_ban'"></ep-svg-icon>
        </div>
        <div class="ep-audit-state">{{checkStatus}}</div>
      </div>
      <div class="ep-workflow-panel-content">
        <template v-if="0===flowDataArray.length">
          <van-empty description="无审核流程"></van-empty>
        </template>
        <div class="van-steps van-steps--vertical">
          <template v-for="flow in flowDataArray" :key="flow.name">
            <div class="van-hairline van-step van-step--vertical van-step--finish work-flow-list-padding">
              <div class="van-step__title">
                <h3>{{flow.name}}</h3>
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
      <div class="ep-workflow-panel-footer">
        <div class="log-btn-wrapper">
          <!--          <van-button type="primary" block @click="openAuditLog()">查看审核记录</van-button>-->
          <van-cell clickable is-link center @click="openAuditLog()" title="查看审核记录"/>
        </div>
      </div>
    </div>
    <ep-work-flow-log-panel ref="logPanel"/>
  </van-popup>
</template>

<script>
import { ref } from 'vue'
import EpWorkFlowLogPanel from '@/components/EpWorkFlowLogPanel'
import EpSvgIcon from '@/components/EpSvgIcon'

export default {
  components: {
    EpWorkFlowLogPanel,
    EpSvgIcon
  },
  props: {
    request: Function,
    callback: Function,
    checkStatus: String
  },
  setup (props) {
    const state = ref(false)
    const show = () => {
      state.value = true
    }
    const logPanel = ref()
    const openAuditLog = () => {
      logPanel.value.show()
    }
    const flowDataArray = ref([])
    const load = () => {
      props.request('2c908ae873e019360173e0891fd60003').then(res => {
        props.callback(res, flowDataArray.value)
      })
    }
    load()
    return {
      state,
      show,
      openAuditLog,
      logPanel,
      flowDataArray
    }
  }
}
</script>

<style scoped>
::deep(.van-popup.van-popup--center) {
  width: 375px;
}

/*审核流包裹*/
.ep-workflow-panel-wrapper {
  width: 297px;
  height: 475px;
  box-sizing: border-box;
}

/*审核流弹出层头部*/
.ep-workflow-panel-title {
  width: 297px;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
}

.ep-workflow-panel-title.pass {
  background-image: url('../../public/static/image/workflow/bg-blue-audit.png');
}

.ep-workflow-panel-title.notpass {
  background-image: url('../../public/static/image/workflow/bg-red-audit.png');
}

/*头部-审核状态图标*/
svg.svg-icon {
  padding-top: 30px;
  margin: 0 auto;
  width: 100%;
  height: 70px;
}

/*头部-审核状态文字*/
.ep-audit-state {
  color: white;
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  text-align: center;
}

/*审核流弹出层内容*/
.ep-workflow-panel-content {
  width: 297px;
  height: 230px;
  overflow: scroll;
  box-sizing: border-box;
}

.van-steps.van-steps--vertical {
  padding-left: 110px;
}

/*审核流弹出层页脚*/
.ep-workflow-panel-footer {
  width: 297px;
  height: 45px;
}

.van-button {
  height: 30px;
}

.van-step__title {
  color: #333333;
  font-size: 14px;
}

.van-step--vertical {
  padding: 9px 5px 40px 0;
}

/*节点圆环*/
.van-step__circle {
  width: 6px;
  height: 6px;
}

.van-step__circle.pass {
  background-color: #2494F2;
  box-shadow: 0 0 0 3px #2494F2;
}

.van-step__circle.notpass {
  background-color: #F4454D;
  box-shadow: 0 0 0 3px #F4454D;
}

.van-step__circle.todo {
  background-color: #D4D4D4;
  box-shadow: 0 0 0 3px #EBEDF1;
}

.van-step__line {
  top: -50px;
}

.van-step__line.pass {
  background: repeating-linear-gradient(
    1deg, #2494F2, #2494F2 4px, #fff 0, #fff 8px);
}

.van-step__line.notpass {
  background: repeating-linear-gradient(
    1deg, #F4454D, #F4454D 4px, #fff 0, #fff 8px);
}

.van-step__line.todo {
  background: repeating-linear-gradient(
    1deg, #D4D4D4, #D4D4D4 4px, #fff 0, #fff 8px);
}

/*第一个不显示，最后一个显示，状态为todo pass*/
.van-step:first-child .van-step__line {
  width: 0 !important;
}

.van-step:last-child .van-step__line {
  width: 1px !important;
}

.log-btn-wrapper {
  text-align: center;
}

[class*=van-hairline][data-v-71512f7a]::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: unset;
  transform: scale(.5);
}

/*空状态*/
.van-empty {
  padding: 0;
}
</style>
