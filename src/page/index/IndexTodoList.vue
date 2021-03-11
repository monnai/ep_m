<!--首页代办列表子组件-->
<template>
  <div class="ep_todo_list_wrapper">
    <ep-list/>
  </div>

</template>

<script>
import { reactive } from 'vue'
import EpList from '@/components/EpList'

export default {
  components: {
    EpList
  },
  setup () {
    // 模拟列表
    const state = reactive({
      list: [],
      loading: false,
      finish: false
    })
    const onLoad = () => {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          state.list.push(state.list.length + 1)
        }
        state.loading = false
        if (state.list.length >= 40) {
          state.finished = true
        }
      }, 1000)
    }
    return {
      state,
      onLoad
    }
  }
}
</script>
<style scoped>

</style>
