<template>
  <div v-show="state.show" class="pane">
    <slot></slot>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    index: {
      type: [String, Number],
      required: true
    }
    // message: {
    //   type: [String, Number],
    //   required: false
    // }
  },
  setup () {
    const state = reactive({
      show: false
    })
    const getVal = () => {
      debugger
    }
    return {
      state,
      getVal
    }
  }

}
</script>

<style scoped>
.pane {
  margin-bottom: 91px;
  background: #F7F7F7;
  display: flow-root;
}
</style>
