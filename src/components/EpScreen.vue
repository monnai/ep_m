<!--筛选条件-->
<template>
  <van-dropdown-menu>
    <van-dropdown-item title="开始时间" ref="item">
      <van-datetime-picker
        v-model="begin"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-dropdown-item>
<!--    :showToolbar="false"-->
    <van-dropdown-item title="结束时间" ref="item">
      <van-datetime-picker
        v-model="end"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-dropdown-item>
    <van-dropdown-item title="筛选" ref="item">
      <van-cell-group title="分组1">
        <van-cell title="单元格" value="内容"/>
      </van-cell-group>
      <van-cell-group title="分组2">
        <van-cell title="单元格" value="内容"/>
      </van-cell-group>
    </van-dropdown-item>
  </van-dropdown-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const begin = ref(new Date())
    const end = ref(new Date())
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      begin,
      end

    }
  }
}

</script>

<style>

</style>
