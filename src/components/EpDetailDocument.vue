<template>
  <div>
    <van-tab title="文档">
      <!--      <van-empty image="error" description="无文档"/>-->
      <template v-for="item in resArray" :key="item.name">
        <van-cell :title="item.v1" :value="item.v2"></van-cell>
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
    const resArray = ref([])
    const load = () => {
      props.request().then(res => {
        props.callback(res, resArray.value)
      })
    }
    load()
    return { resArray }
  }
}
</script>

<style>

</style>
