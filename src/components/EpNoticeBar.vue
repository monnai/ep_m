<template>
  <div>
    <van-cell center clickable is-link :class="computeIconName" @click="clickFn">
      <template #icon>
        <ep-svg-icon :icon-name="computeIconName" :icon-color="computeIconColor"/>
      </template>
      <template #title>
        <div>
          {{checkStatus}}
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import EpSvgIcon from '@/components/EpSvgIcon'
import { computed } from 'vue'

export default {
  components: {
    EpSvgIcon
  },
  props: {
    checkStatus: {
      type: String,
      required: false,
      default: '加载中...'
    },
    click: {
      type: Function,
      required: false
    }
  },
  setup (props) {
    const clickFn = () => {
      props.click()
    }
    // 计算展示哪个图标
    const computeIconName = computed(() => {
      switch (props.checkStatus) {
        case '审核通过':
          return 'check_pass'
        case '审核不通过':
          return 'check_not_pass'
        case '审核中':
          return 'check_auditing'
        case '已作废':
          return 'check_ban'
        default :
          return ''
      }
    })
    // 计算展示图标填充色
    const computeIconColor = computed(() => {
      switch (props.checkStatus) {
        case '审核通过':
          return '#1dc791'
        case '审核不通过':
          return '#ee3845'
        case '审核中':
          return '#ffc24b'
        case '已作废':
          return '#999999'
        default :
          return ''
      }
    })
    return {
      clickFn,
      computeIconName,
      computeIconColor
    }
  }
}
</script>

<style scoped>
svg.svg-icon {
  width: 20px;
  height: 20px;
  margin-right: 16px
}

.check_not_pass {
  background: #FDEBEC;
  -webkit-tap-highlight-color: #ea484f36;
}

::v-deep(.check_not_pass > .van-cell__title) {
  color: #ee3845 !important;
}

.check_pass {
  background: #E8F9F4;
  -webkit-tap-highlight-color: #8ae6d624;
}

::v-deep(.check_pass > .van-cell__title) {
  color: #1dc791;
}

.check_waiting {
  background: #FFF7E7;
  -webkit-tap-highlight-color: #f9e3b761;
}

::v-deep(.check_waiting > .van-cell__title) {
  color: #ffc24b;
}

.check_ban {
  background: #f7f7f7;
  -webkit-tap-highlight-color: #b1acac24;
}

::v-deep(.check_ban > .van-cell__title) {
  color: #999999;
}

.check_auditing {
  background: #FFF7E7;
  -webkit-tap-highlight-color: #f9e3b761;
}

::v-deep(.check_auditing > .van-cell__title) {
  color: #ffc24b;
}

/*.van-cell.van-cell--center.van-cell--clickable.xx > .van-cell__title {*/
/*  background: red;*/
/*  color: yellow;*/
/*}*/
</style>
