<template>
  <!--认领信息-->
  <van-form ref="stepFirstClaimForm">
    <van-cell-group title="认领信息">
      <van-field v-model="state.claimFee"
                 type="number"
                 name="认领金额"
                 label="认领金额"
                 placeholder="输入认领金额（万元）"
                 :rules="[{required: true, message: '请填写认领金额'}]"
      />
      <van-field label="来款类型" v-model="state.source">
        <template #input>
          <van-radio-group direction="horizontal">
            <van-radio name="direct">直接经费</van-radio>
            <van-radio name="indirect">间接经费</van-radio>
            <van-radio name="mixed">混合经费</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field label="是否外拨" v-model="state.outer">
        <template #input>
          <van-switch size="20px" active-value="1" inactive-value="0"/>
        </template>
      </van-field>
      <van-field label="经办人" placeholder="输入经办人" v-model="state.person"/>
      <van-field label="经办人手机" placeholder="输入经办人手机" v-model="state.phone"/>
    </van-cell-group>
  </van-form>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  setup () {
    const stepFirstClaimForm = ref()
    const state = reactive({
      claimFee: '',
      source: '',
      outer: '',
      person: '',
      phone: ''
    })
    const getValue = () => {
      return state
    }
    const valid = () => {
      debugger
      stepFirstClaimForm.value.validate()
    }
    return {
      stepFirstClaimForm,
      state,
      getValue,
      valid
    }
  }
}
</script>

<style scoped>

</style>
