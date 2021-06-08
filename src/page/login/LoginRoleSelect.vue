<!--用户角色选择-->
<template>
  <div>
    <van-popup
      closeable
      v-model:show="selectorShow"
      position="right"
      :style="{ height: '100%', width:'70%' }">
      <div class="role-select-tip">
        <div class="g-role-logo"></div>
        <p class="g-role-title">角色选定</p>
        <div class="g-role-content">您是多角色用户请点击下方按钮确定您的登录角色</div>
      </div>
      <van-divider :style="{ color: '#F7F7F7', borderColor: '#F7F7F7', padding: '0px 16px' }"/>
      <div class="g-list">
        <ul>
          <template v-for="(name, roleId) in roleObject" :key="roleId">
            <van-cell :title="name" is-link @click="doSelectRole(roleId)"/>
          </template>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { selectRole } from '@/request/api'
import { useRouter } from 'vue-router'
import { mobileResultCode } from '@/assets/js/common'
import { inject } from 'vue'
export default {
  props: {
    // 接收登录组件传入的角色对象
    roleObject: {
      type: Object,
      required: true
    }
  },
  setup () {
    const router = useRouter()
    const selectorShow = inject('selectorShow')
    const doSelectRole = function (roleId) {
      selectRole({
        switchGroupId: roleId,
        refreshToken: sessionStorage.getItem('session_key')
      }).then(result => {
        if (result.body.code === mobileResultCode.SUCCESS) {
          sessionStorage.setItem('session_model_authority', result.body.data.item.joinCheckModules)
          router.push('/index')
        }
      })
    }
    return {
      selectorShow,
      doSelectRole
    }
  }
}
</script>

<style scoped>
.g-role-logo {
  height: 57px;
  width: 57px;
  margin-top: 36px;
  margin-left: 26px;
  background-image: url("../../image/login/logo_select_role.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.g-role-title {
  margin-left: 26px;
  font-size: 19px;
  font-weight: bold;
  text-align: left;
  color: rgba(36, 148, 242, 1);
}

.g-role-content {
  margin-left: 26px;
  margin-right: 21px;
  text-align: left;
  font-size: 13px;
  color: rgba(102, 102, 102, 1);
  font-weight: normal;
}

.role-select-tip {
  height: 165px;
}

.g-list {
  height: 432px;
  background-image: url("../../image/login/background_select_role.png");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: scroll;
}

ul {
  margin-left: 14px;
  text-align: left;
}

::before {
  font-size: 12px;
}
</style>
