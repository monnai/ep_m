<!--用户角色选择-->
<template>
  <div>
    <van-popup
      v-model:show="show"
      closeable
      position="right"
      :style="{ height: '100%', width:'70%' }">
      <div class="role-select-tip">
        <div class="role-select-logo"></div>
        <p class="role-select-title">角色选定</p>
        <div class="role-select-content">您是多角色用户请点击下方按钮确定您的登录角色</div>
      </div>
      <van-divider :style="{ color: '#F7F7F7', borderColor: '#F7F7F7', padding: '0px 16px' }"/>
      <div class="role-list-wrapper">
        <ul>
          <template v-for="(name, roleId) in roleList" :key="roleId">
            <van-cell :title="name" is-link @click="doSelectRole(roleId)"/>
          </template>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ref } from 'vue'
import { selectRole } from '@/request/api'
import Toast from 'vant'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const show = ref(false)
    const roleList = {}
    const router = useRouter()
    const doSelectRole = function (roleId) {
      selectRole({
        switchGroupId: roleId,
        refreshToken: sessionStorage.getItem('session_key')
      }).then(result => {
        if (result.body.code === '200') {
          sessionStorage.setItem('session_model_authority', result.body.data.joinCheckModules)
          router.push('/index')
          return
        }
        Toast(result.body.message)
        console.log(result)
      })
    }
    return {
      show,
      doSelectRole,
      roleList

    }
  }
}
</script>

<style scoped>
.role-select-logo {
  height: 57px;
  width: 57px;
  margin-top: 36px;
  margin-left: 26px;
  background-image: url("../../image/login/logo_select_role.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.role-select-title {
  font-size: 19px;
  font-weight: bold;
  color: rgba(36, 148, 242, 1);
  text-align: left;
  margin-left: 26px;
}

.role-select-content {
  font-size: 13px;
  color: rgba(102, 102, 102, 1);
  font-weight: normal;
  text-align: left;
  margin-left: 26px;
  margin-right: 21px;
}

.role-select-tip {
  height: 165px;
}

.role-list-wrapper {
  height: 432px;
  background-image: url("../../image/login/background_select_role.png");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: scroll;
}

ul {
  text-align: left;
  margin-left: 14px;
}

::before {
  font-size: 12px;
}
</style>
