<!--筛选条件-->
<template>
  <van-dropdown-menu>
    <!--    <van-button @click="test"></van-button>-->
    <van-dropdown-item :title="beginTitle">
      <van-datetime-picker
        v-model="begin"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :showToolbar="false"
        @change="beginChange"
      />
    </van-dropdown-item>
    <!--    :showToolbar="false"-->
    <van-dropdown-item :title="endTitle">
      <van-datetime-picker
        v-model="end"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :showToolbar="false"
        @change="endChange"
      />
    </van-dropdown-item>
    <van-dropdown-item title="筛选" ref="item">
        <van-checkbox-group v-model="checked">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in list"
              clickable
              :key="item"
              :title="`复选框 ${item}`"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox
                  :name="item"
                  :ref="el => checkboxRefs[index] = el"
                  @click.stop
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>

      <van-button type="primary" @click="checkAll">全选</van-button>
      <van-button type="primary" @click="toggleAll">反选</van-button>
    </van-dropdown-item>
  </van-dropdown-menu>
</template>

<script>
import { ref, inject, onBeforeUpdate } from 'vue'

export default {
  setup () {
    const beginTitle = ref('开始时间')
    const endTitle = ref('结束时间')
    const begin = inject('begin')
    const end = inject('end')
    const beginChange = (value) => {
      beginTitle.value = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate()
    }
    const endChange = (value) => {
      endTitle.value = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate()
    }
    const test = () => {
      console.log(begin)
      console.log(inject('begin'))
    }
    const checked = ref([])
    const checkboxRefs = ref([])
    const checkboxGroup = ref(null)
    const toggle = (index) => {
      checkboxRefs.value[index].toggle()
    }
    onBeforeUpdate(() => {
      checkboxRefs.value = []
    })
    const checkAll = () => {
      checkboxGroup.value.toggleAll(true)
    }
    const toggleAll = () => {
      checkboxGroup.value.toggleAll()
    }
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      beginTitle,
      endTitle,
      beginChange,
      endChange,
      test,
      begin,
      end,
      checkAll,
      toggleAll,
      list: ['a', 'b'],
      toggle,
      checked,
      checkboxRefs
    }
  }
}
</script>
<style>

</style>
