<template>
  <div>
    <van-tab title="预算">
      <template v-if="data.length>0">
<!--        <van-cell title="预算科目" value="预算经费"></van-cell>-->
      </template>
      <template v-else>
        <van-empty  description="未查询到预算信息"/>
      </template>
      <template v-for="budget in data" :key="budget.v1">
        <van-cell :title="budget.v1" :value="budget.v2"></van-cell>
      </template>
    </van-tab>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    request: Function,
    callback: Function
  },
  setup (props) {
    const data = ref([])
    const load = () => {
      props.request().then(res => {
        props.callback(res, data.value)
      })
    }
    load()
    return {
      data,
      load
    }
  }
}
</script>

<style scoped>
/*.van-tab__pane > div:nth-child(1) {*/
/*  padding: 0;*/
/*}*/

/*::v-deep(.van-tab__pane >div:nth-child(1)>div) {*/
/*  text-align: center;*/
/*  font-size: 14px;*/
/*  font-weight: bold;*/
/*  padding: 12px 25px 9px;*/
/*  background: #F7F7F7;*/
/*  color: #999999;*/
/*}*/

/*::v-deep(.van-tab__pane >div:nth-child(1)>div:nth-child(1)) {*/
/*  border-right: 1px solid #dedede;*/
/*}*/
</style>
