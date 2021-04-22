<!--经费认领主面板-->
<template>
  <c-w-income-claim-nav-bar/>
  <c-w-income-claim-basic />
</template>

<script>
import CWIncomeClaimNavBar from '@/page/cWIncomeClaim/CWIncomeClaimNavBar'
import CWIncomeClaimBasic from '@/page/cWIncomeClaim/CWIncomeClaimBasic'
import { provide, reactive } from 'vue'
export default {
  components: {
    CWIncomeClaimNavBar,
    CWIncomeClaimBasic
  },
  setup () {
    const test = reactive({ test: 'test' })
    provide('test', test.test)
    setInterval(() => {
      // test.value = Math.random()
      console.log('parent' + test.test)
    }, 3000)
  }
}

</script>

<style>

</style>
