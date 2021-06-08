<template>
  <div class="percent-wrap">
    <div class="surplus">
      <!--百分比标题-->
      <span class="percent-text">剩余金额</span>
      <!--百分比视图-->
      <span class="percent-view">
      <span :style="computedWidth('surplus')">{{testData.surplus}}</span>
    </span>
    </div>
    <div class="plan">
      <!--百分比标题-->
      <span class="percent-text">计划金额</span>
      <!--百分比视图-->
      <span class="percent-view">
      <span :style="computedWidth('plan')">{{testData.plan}}</span>
    </span>
    </div>
    <div class="planFinished">
      <!--百分比标题-->
      <span class="percent-text">已外拨</span>
      <!--百分比视图-->
      <span class="percent-view">
      <span :style="computedWidth('planFinished')">{{testData.planFinished}}</span>
    </span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  // props: {
  //   percentData: {
  //     required: true,
  //     type: Object
  //   }
  // },
  setup () {
    const testData = {
      total: 200,
      surplus: 100,
      plan: 50,
      planFinished: 25
    }
    const computedWidth = computed(() => {
      return (type) => {
        return 'width:' + testData[type] / testData.total * 100 + '%'
      }
    })
    return {
      testData,
      computedWidth
    }
  }
}
</script>

<style scoped>
.percent-text {
  text-align: left;
  text-indent: 17px;
  float: left;
  width: 30%;
}

.percent-view {
  text-align: left;
  width: 70%;
  display: flex;
}

.percent-view > span {
  border-radius: 0 28px 28px 0;
}

.graph {
  position: relative;
  background-color: #F0EFEF;
  border: 1px solid #cccccc;
  padding: 2px;
  font-size: 13px;
  font-weight: 700;
}
.percent-wrap > div{
 display: flex;
  padding: 4px;
}
.surplus > span:nth-child(2){
  background: #ffedca;
  text-align: center;
}
.surplus > span:nth-child(2) > span{
  background: #FFB830;
  color: white;
  text-align: center;
  line-height: 1.5em;
}
.plan > span:nth-child(2){
  background: #c2e3ff;
  text-align: center;
}
.plan > span:nth-child(2) > span{
  background: #2494F2;
  color: white;
  text-align: center;
  line-height: 1.5em;
}
.planFinished > span:nth-child(2) {
  background: #c0f0e6;
  text-align: center;
}
.planFinished > span:nth-child(2) > span {
  background: #14BF9D;
  color: white;
  text-align: center;
  line-height: 1.5em;
}
</style>
