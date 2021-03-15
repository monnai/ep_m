<template>
  <div class="mt-5">
    <test ref="RefChilde"></test>
    <div class="btn btn-primary my-2" @click="fnCallChild">
      点我调用Son组件里的方法
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Test from '../../components/Test.vue'

export default {
  name: 'father',
  components: { Test },
  setup () {
    debugger
    const RefChilde = ref()
    const fnCallChild = () => {
      RefChilde.value.sonFn()
    }
    return {
      RefChilde,
      fnCallChild
    }
  }
}
</script>
