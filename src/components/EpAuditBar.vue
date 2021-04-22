<template>
  <van-tabbar active-color="#000" inactive-color="#000" v-if="show">
    <van-tabbar-item>
      <van-button icon="clear" type="primary" color="#cccccc" block @click="handleAudit('tovoid')">
        作废
      </van-button>
    </van-tabbar-item>
    <van-tabbar-item>
      <van-button icon="clear" type="primary" color="#ee3845" block @click="handleAudit('refuse')">不通过</van-button>
    </van-tabbar-item>
    <van-tabbar-item>
      <van-button icon="checked" type="primary" color="#2494f2" block @click="handleAudit('pass')">通过</van-button>
    </van-tabbar-item>
  </van-tabbar>
  <van-popup v-model:show="auditContentPanelShow"
             position="bottom"
             :safe-area-inset-top="true"
             closeable
             close-icon-position="top-right">
    <van-sticky>
      <div class="audit-title">审核意见</div>
    </van-sticky>
    <div>
      <van-field
        v-model="message"
        rows="4"
        autosize
        label=""
        type="textarea"
        placeholder="请输入审核意见"
        maxlength="500"
        show-word-limit/>
    </div>
    <div class="submit-btn-wrap">
      <van-button type="primary"
                  block=""
                  @click="doAudit"
                  :loading="loading"
                  class="submit-btn"
                  loading-type >提交</van-button>
    </div>
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
      if (type === 'pass') {
        doAudit()
        return false
      }
      auditContentPanelShow.value = true
    }
    const message = ref()
    const loading = ref(false)
    const doAudit = () => {
      if (!message.value && auditType.value !== 'pass') {
        Toast('请输入审核意见')
        return false
      }
      loading.value = true
      audit(auditType.value, message.value).then(res => {
        loading.value = false
        if (res.body.code !== '200') {
          Toast(res.body.message)
          return false
        }
        Toast.success('审核成功')
        auditContentPanelShow.value = false
        if (props.callback instanceof Function) {
          props.callback()
        }
      })
    }
    return {
      auditContentPanelShow,
      loading,
      handleAudit,
      message,
      doAudit,
      auditType
    }
  }
}
</script>

<style scoped>

::v-deep(.van-cell__title) {
  text-align: left;
  color: #6d6d6d;
  font-weight: bold;
}

::v-deep(.van-popup__close-icon) {
  position: absolute;
  z-index: 1;
  color: #c8c9cc;
  font-size: 16px;
  cursor: pointer;
}

.audit-title {
  font-size: 16px;
  font-weight: bold;
  padding: 14px 0 13px 0;
  border-bottom: 1px solid #ececec;
}
::v-deep(textarea) {
  background-color: #f1f1f1 !important;
}
.submit-btn-wrap {
  padding: 12px;
  background: #F7F7F7;
}
::v-deep(.submit-btn) {
  width: 90%;
  margin: auto;
}
</style>
