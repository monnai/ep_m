<template>
  <div class="main-wrap">
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
::v-deep(.van-tab__pane, .van-tab__pane-wrapper) {
  padding-bottom: 44px;
}
</style>
