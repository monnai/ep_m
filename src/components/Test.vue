<template>
  <div>
    <h1>{{ conts }}</h1>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const conts = ref('我是子组件')
    const sonFn = () => {
      conts.value = '我被父组件里调用了子组件的方法修改了数据'
    }
    return { conts, sonFn }
  }
}
</script>
