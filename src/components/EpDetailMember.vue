<template>
  <div>
    <van-tab title="成员">
      <ul>
        <template v-for="item in dataArray" :key="item.name">
          <van-contact-card type="edit" :name="item.v1" :editable="false" />
        </template>
      </ul>
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
    const dataArray = ref([])
    const load = () => {
      props.request().then(res => {
        props.callback(res, dataArray.value)
      })
    }
    load()
    return {
      dataArray,
      load
    }
  }
}
</script>

<style>

</style>
