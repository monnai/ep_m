<template>
  <div class="tabs-bar">
    <!--标签页标题-->
    <van-sticky offset-top="44px">
      <van-row>
        <van-col span="8" :class="tabCls(item)" v-for="(item, index) in state.navList"
                 @click="handleChange(index)"
                 :key="item.label">
          <van-badge :content="index+1" color="#ECECEC" />
          {{item.label}}
        </van-col>
      </van-row>
    </van-sticky>
    <div>
      <slot></slot>
    </div>
  </div>
  <van-tabbar route>
    <van-button type="primary"
                color="#2494F2"
                block
                @click="handleBtnEvent"
                class="g-next">{{btnText}}</van-button>
  </van-tabbar>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { toRaw } from '@vue/reactivity'
export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    getAllPane: {
      type: Function,
      required: true
    },
    getAllStep: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const state = reactive({
      navList: [],
      currentValue: props.value
    })
    const handleChange = (index) => {
      // state.currentValue = state.navList[index].name
      if (state.navList[index].finished) {
        state.currentValue = index + 1
        updateStatus()
      }
    }
    const tabCls = (item) => {
      return ['tabs-tab', {
        'tabs-tab-active': item.name + 1 === state.currentValue,
        'tabs-tab-unfinished': !item.finished
      }]
    }
    const updateNav = () => {
      state.navList = []
      props.getAllPane().value.forEach((pane, index) => {
        state.navList.push({
          label: pane.label,
          name: pane.name || index,
          finished: index === 0
        })
        if (!pane.name) {
          pane.name = index
        }
        if (index === 0) {
          if (!state.currentValue) {
            state.currentValue = pane.name || index
          }
        }
      })
      updateStatus()
    }
    const updateStatus = () => {
      debugger
      props.getAllPane().value.forEach((pane) => {
        pane.state.show = pane.index === state.currentValue
      })
    }
    const handleNextStep = () => {
      // todo 每一步需要校验输入，成功后修改状态
      if (state.currentValue < state.navList.length) {
        state.currentValue++
        state.navList[state.currentValue - 1].finished = true
        updateStatus()
      }
    }
    const handleSubmit = () => {
      const result = {}
      // 将所有组件获取到，调用每个组件的getValues，然后封装成一个对象传入后台
      props.getAllStep().value.forEach((step) => {
        debugger
        if ('getValue' in step) {
          const a = toRaw(step.getValue())
          console.log(a)
          Object.assign(result, a)
        }
      })
      console.log(result)
    }
    const validData = () => {
      debugger
      const allStepInstance = props.getAllStep().value
      if ('valid' in allStepInstance[state.currentValue - 1]) {
        allStepInstance[state.currentValue - 1].valid()
      }
    }
    const handleBtnEvent = () => {
      // todo 校验本页面数据
      validData()
      if (state.currentValue !== state.navList.length) {
        handleNextStep()
        return
      }
      handleSubmit()
    }
    onMounted(() => {
      updateNav()
    })
    const btnText = computed(() => {
      return state.currentValue !== state.navList.length ? '下一步' : '提交'
    })

    return {
      handleChange,
      tabCls,
      state,
      updateNav,
      handleBtnEvent,
      btnText
    }
  }
}
</script>

<style scoped>
::v-deep(.van-row) {
  color: #767676;
  font-weight: bold;
  line-height: 44px;
  background: white;
  border-bottom: 1px solid #e7e7e7;
}

::v-deep(.van-row > div:not(:last-child)) {
  border-right: 1px solid #f2f2f2;
}

::v-deep(.tabs-tab-active) {
  color: #40A1F4;
  background: #DEEFFD;
}

::v-deep(.van-cell-group__title) {
  padding: 0;
  text-align: left;
  line-height: 33px;
  text-indent: 28px;
  color: #A7A7A7;
  font-weight: bold;
  background: #F7F7F7;
}

::v-deep(.van-cell__title.van-field__label) {
  color: #1c1111;
  font-weight: bold;
}

.tabs-tab-active > div:nth-child(1) {
  background: #40A1F4 !important;
  color: white !important;
}

::v-deep(.van-badge) {
  color: #696969
}

.g-next {
  width: 76%;
  margin: auto;
}
::v-deep(.van-tabbar) {
  background: #F7F7F7;
}

.tabs-tab-unfinished {
  background: #e3e3e3;
}
</style>
