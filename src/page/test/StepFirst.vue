<template>
    <!--来款信息-->
    <step-first-income/>
    <!--项目信息-->
    <step-first-project/>
    <!--认领信息-->
    <step-first-claim ref="firstClaim"/>
</template>

<script>
import StepFirstIncome from '@/page/test/StepFirstIncome'
import StepFirstProject from '@/page/test/StepFirstProject'
import StepFirstClaim from '@/page/test/StepFirstClaim'
import { ref } from 'vue'
export default {
  components: {
    StepFirstClaim,
    StepFirstIncome,
    StepFirstProject
  },
  setup () {
    const firstClaim = ref()
    const getValue = () => {
      return firstClaim.value.getValue()
    }
    const valid = () => {
      firstClaim.value.valid()
    }
    return {
      getValue,
      valid,
      firstClaim
    }
  }
}
</script>
<style scope>
.van-cell__title, .van-cell__value {
  flex: 1;
  text-align: left;
}

.van-field__control:read-only{
  cursor: default;
  text-align: right;
}
</style>
