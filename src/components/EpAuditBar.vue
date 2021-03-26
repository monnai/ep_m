<template>
  <van-tabbar active-color="#000" inactive-color="#000" v-if="show">
    <van-tabbar-item>
      <van-button icon="clear" type="primary" color="#CCCCCCFF" block @click="handleAudit('tovoid')">
        驳回
      </van-button>
    </van-tabbar-item>
    <van-tabbar-item>
      <van-button icon="clear" type="primary" color="#EE3845FF" block @click="handleAudit('refuse')">不通过</van-button>
    </van-tabbar-item>
    <van-tabbar-item>
      <van-button icon="checked" type="primary" color="#2494F2FF" block @click="handleAudit('pass')">通过</van-button>
    </van-tabbar-item>
  </van-tabbar>
  <van-popup v-model:show="auditContentPanelShow" position="bottom" :style="{ height: '20%' }">
    <van-field
      v-model="message"
      rows="3"
      autosize
      label="审核意见"
      type="textarea"
      placeholder="请输入审核意见"
    />
    <van-button type="primary" block="" @click="doAudit">提交</van-button>
  </van-popup>
</template>
<script>
import { ref } from 'vue'
import { Toast } from 'vant'
import { audit } from '@/request/api'

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    callback: {
      type: Function,
      required: false
    }

  },
  setup (props) {
    const auditContentPanelShow = ref(false)
    const auditType = ref()
    const handleAudit = (type) => {
      auditType.value = type
      auditContentPanelShow.value = true
    }
    const message = ref()
    const doAudit = () => {
      if (!message.value && auditType.value !== 'pass') {
        Toast('请输入审核意见')
        return false
      }
      audit(auditType.value, message.value).then(res => {
        if (res.body.code !== '200') {
          Toast(res.body.message)
          return false
        }
        auditContentPanelShow.value = false
        if (props.callback instanceof Function) {
          props.callback()
        }
      })
    }
    return {
      auditContentPanelShow,
      handleAudit,
      message,
      doAudit,
      auditType
    }
  }
}
</script>

<style scoped>
.van-popup.van-popup--bottom > div:nth-child(1) {
  height: 67%;
}

::v-deep(.van-cell__title) {
  text-align: left;
  color: #6d6d6d;
  font-weight: bold;
}
</style>
