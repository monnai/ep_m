<template>
  <div>
    <van-tab title="预算">
      <table>
        <thead>
        <th>预算科目</th>
        <th>预算经费</th>
        </thead>
        <tbody>
        <template v-for="budget in data" :key="budget.v1">
          <tr>
            <td>{{budget.v1}}</td>
            <td>{{budget.v2}}</td>
          </tr>
        </template>
        </tbody>
      </table>
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
        debugger
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

<style>

</style>
