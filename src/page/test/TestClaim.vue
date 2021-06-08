<template>
  <div>
    <van-sticky>
      <ep-nav-bar/>
    </van-sticky>
    <tab :value="1" :getAllPane="getAllPane" :getAllStep = "getAllStep">
      <div v-for="componentData in componentDatas" :key="componentData.index">
        <pane :label="componentData.label" :index="componentData.index" :ref="el => { if (el) divs[componentData.index-1] = el }" >
          <component :is="componentData.componentName" :ref="el => {if (el) stepComponents[componentData.index-1] = el}"></component>
        </pane>
      </div>
    </tab>
  </div>
</template>

<script>
import EpNavBar from '@/components/EpNavBar'
import Tab from '@/page/test/Tab'
import Pane from '@/page/test/Pane'
import { ref } from 'vue'
import StepFirst from '@/page/test/StepFirst'
import StepTwo from '@/page/test/StepTwo'
import StepThree from '@/page/test/StepThree'

export default {
  components: {
    EpNavBar,
    Tab,
    Pane,
    StepFirst,
    StepTwo,
    StepThree
  },
  setup () {
    const componentDatas = [{
      label: '认领信息',
      index: 1,
      componentName: 'step-first'
    }, {
      label: '拆卡',
      index: 2,
      componentName: 'step-two'
    }, {
      label: '拆预算',
      index: 3,
      componentName: 'step-three'
    }]
    const divs = ref([])
    const stepComponents = ref([])
    // watchEffect(() => {
    //   debugger
    //   console.log(divs, 'xx')
    // },
    // {
    //   flush: 'post'
    // })
    const getAllPane = () => {
      return divs
    }
    const getAllStep = () => {
      return stepComponents
    }
    return {
      componentDatas,
      divs,
      getAllPane,
      stepComponents,
      getAllStep
    }
  }
}
</script>

<style scoped>

</style>
