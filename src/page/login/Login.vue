<!--用户登录页面-->
<template>
  <div class="login-wrap _th_cover-all-show-times">
    <!--公司图标-->
    <div class="login-slogan-wrap">
      <div class="login-slogan"></div>
    </div>
    <!--登录信息填写表单-->
    <div class="login-form">
      <van-form @submit="doLogin">
        <!--用户名输入框-->
        <van-field
          v-model="username"
          placeholder="请输入用户名"
          clearable
          :rules="[{ required: true, message: '请填写用户名' }]">
          <template #left-icon>
            <div class="icon_wrap">
              <div class="icon_account login_icon"></div>
            </div>
          </template>
        </van-field>
        <!--密码输入框-->
        <van-field
          v-model="password"
          type="password"
          placeholder="请输入密码"
          clearable
          :rules="[{ required: true, message: '请填写密码' }]">
          <template #left-icon>
            <div class="icon_wrap">
              <div class="icon_password login_icon"></div>
            </div>
          </template>
        </van-field>
        <!--登录按钮-->
        <div class="login-btn-wrap">
          <van-button type="primary" block @click="doLogin">登录</van-button>
        </div>
      </van-form>
      <login-role-select ref="roleSelect"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/request/api'
import LoginRoleSelect from '@/page/login/LoginRoleSelect'
import { Toast } from 'vant'
import { setSessionStorage } from '@/util/storageUtil'
import { mobileResultCode } from '@/assets/js/common'

export default {
  components: { LoginRoleSelect },

  setup () {
    // 用户名
    const username = ref()
    // 密码
    const password = ref()
    // 角色
    const roleSelect = ref([])
    const router = useRouter()
    const doLogin = function () {
      login({
        account: username.value,
        password: password.value
      }).then(result => {
        if (result.body.code.indexOf(mobileResultCode.SUCCESS) >= 0) {
          setSessionStorage('session_key', result.body.data.item.key)
          Toast({ message: result.body.message })
          if (result.body.code !== mobileResultCode.NEED_ROLE_SELECT) {
            router.push('index')
            return
          }
          roleSelect.value.show = true
          roleSelect.value.roleList = result.body.data.item.userGroups
        } else {
          Toast({ message: result.body.message })
        }
      })
    }
    return {
      username,
      password,
      doLogin,
      roleSelect
    }
  }
}
</script>

<style scoped>
.login-wrap {
  background-image: url("../../image/login/background_login.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-slogan-wrap {
  padding-top: 145px;
}

.login-slogan {
  width: 84px;
  height: 84px;
  margin: 0 auto;
  background-image: url("../../image/common/logo_company.png") !important;
  background-size: cover;
}

.login-form {
  width: 315px;
  height: auto;
  margin: 87px auto 0;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 11px 12px 0 0 #77baf5;
}

.login-btn-wrap {
  padding-top: 14px;
}

.login_icon {
  position: absolute;
  width: 16px;
  height: 16px;
  background-size: cover;
  margin-top: 14px;
  margin-left: 14px;
}

.icon_account {
  background-image: url("../../../public/static/image/login/icon_account.png");
}

.icon_password {
  background-image: url("../../../public/static/image/login/icon_password.png");
}

.icon_wrap {
  width: 44px;
  height: 44px;
  background: #EDECEF;
  box-sizing: border-box;
}

::v-deep(.van-field__left-icon) {
  margin-right: unset;
}

::v-deep(.van-cell::after) {
  border-bottom: 0;
}

::v-deep(input.van-field__control) {
  height: 44px;
  text-indent: 12px;
  -webkit-box-shadow: 0 0 0 1000px #f5f5f5 inset;
}

::v-deep(.van-form) {
  padding: 44px 12px 44px 12px;
}

::v-deep(.van-button--block) {
  display: block;
  width: 95%;
  height: 44px;
  margin: 0 auto;
}

</style>
