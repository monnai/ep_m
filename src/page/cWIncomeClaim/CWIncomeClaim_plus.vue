<template>
  <van-collapse v-model="activeNames">
    <van-collapse-item name="1">
      <template #title>
        <div>标题1 <van-icon name="question-o" /></div>
      </template>
      内容
    </van-collapse-item>
    <van-collapse-item title="标题2" name="2" icon="shop-o">
      内容
    </van-collapse-item>
  </van-collapse>
  <van-form @failed="onFailed" @submit="onSubmit">
    <van-cell-group>
    <!-- 通过 pattern 进行正则校验 -->
    <van-field
      v-model="state.value1"
      name="pattern"
      placeholder="正则校验"
      :rules="[{ pattern, message: '请输入正确内容' }]"
    />
    <!-- 通过 validator 进行函数校验 -->
    <van-field
      v-model="state.value2"
      name="validator"
      placeholder="函数校验"
      :rules="[{ validator, message: '请输入正确内容' }]"
    />
    </van-cell-group>
    <van-cell-group>
    <!-- 通过 validator 返回错误提示 -->
    <van-field
      v-model="state.value3"
      name="validatorMessage"
      placeholder="校验函数返回错误提示"
      :rules="[{ validator: validatorMessage }]"
    />
    <!-- 通过 validator 进行异步函数校验 -->
    <van-field
      v-model="state.value4"
      name="asyncValidator"
      placeholder="异步函数校验"
      :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
    />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { ref, reactive } from 'vue'

import { Toast } from 'vant'

export default {
  setup () {
    const activeNames = ref(['1'])
    const state = reactive({
      value1: '',
      value2: '',
      value3: '',
      value4: ''
    })
    const pattern = /\d{6}/

    // 校验函数返回 true 表示校验通过，false 表示不通过
    const validator = (val) => /1\d{10}/.test(val)

    // 校验函数可以直接返回一段错误提示
    const validatorMessage = (val) => {
      if (val === '123') {
        return true
      } else {
        return `${val} 不合法，请重新输入`
      }
    }

    // 校验函数可以返回 Promise，实现异步校验
    const asyncValidator = (val) =>
      new Promise((resolve) => {
        Toast.loading('验证中...')

        setTimeout(() => {
          Toast.clear()
          resolve(/\d{6}/.test(val))
        }, 1000)
      })

    const onFailed = (errorInfo) => {
      console.log('failed', errorInfo)
    }
    const onSubmit = (values) => {
      console.log('submit', values)
    }
    return {
      activeNames,
      state,
      pattern,
      onFailed,
      onSubmit,
      validator,
      asyncValidator,
      validatorMessage
    }
  }
}
</script>

<style scope>

</style>
