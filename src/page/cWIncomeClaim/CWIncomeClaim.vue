<!--经费认领主面板-->
<template>
  <c-w-income-claim-nav-bar/>
  <c-w-income-claim-basic />
</template>

<script>
import CWIncomeClaimNavBar from '@/page/cWIncomeClaim/CWIncomeClaimNavBar'
import CWIncomeClaimBasic from '@/page/cWIncomeClaim/CWIncomeClaimBasic'
export default {
  components: {
    CWIncomeClaimNavBar,
    CWIncomeClaimBasic
  },
  setup () {

  }
}

</script>

<style>

</style>
