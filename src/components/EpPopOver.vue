<template>
  <!--  <van-popover v-model:show="show" :actions="actions" @select="onSelect">-->
  <!--    <template #reference>-->
  <!--      <van-icon name="bars"/>-->
  <!--    </template>-->
  <!--  </van-popover>-->
  <van-popover v-model:show="showPopover" theme="dark" :actions="actions" placement="left-end" @select="onSelect">
    <template #reference>
      <van-icon name="bars"/>
    </template>
  </van-popover>
</template>
<script>
import { ref } from 'vue'
// export default {
//   props: {
//     // 气泡功能集合
//     actions: {
//       type: Array,
//       required: true
//     },
//     callback: {
//       type: Function,
//       required: true
//     }
//   },
//   setup () {
//     const show = ref(true)
//     const onSelect = (action) => alert(1)
//     return {
//       show,
//       onSelect
//     }
//   }
// }
export default {
  props: {
    // 传入的选项
    actions: {
      type: Array,
      required: true
    },
    // 选择后触发的函数
    onSelect: {
      type: Function,
      required: true
    }
  },
  setup () {
    const showPopover = ref(false)
    return {
      showPopover
    }
  }
}
</script>

<style>
.van-popover__wrapper {
  display: inline-block;
  height: 40px;
}
</style>
