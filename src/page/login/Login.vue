<!--登录页面-->
<template>
  <div class="g-container">
    <div class="g-head">
      <!--企业logo-->
      <div class="g-logo"></div>
    </div>
    <!--登录表单-->
    <div class="g-form">
      <van-form @submit="handleSubmit">
        <!--用户名-->
        <van-field
          v-model="state.username"
          placeholder="请输入用户名"
          clearable
          :rules="[{ required: true, message: '请填写用户名' }]"
          autocomplete>
          <template #left-icon>
            <div class="s-icon-bg">
              <div class="s-icon-account s-login-icon"></div>
            </div>
          </template>
        </van-field>
        <!--密码-->
        <van-field
          v-model="state.password"
          type="password"
          placeholder="请输入密码"
          clearable
          :rules="[{ required: true, message: '请填写密码' }]"
          autocomplete>
          <template #left-icon>
            <div class="s-icon-bg">
              <div class="s-icon-password s-login-icon"></div>
            </div>
          </template>
        </van-field>
        <!--登录按钮-->
        <div class="g-login">
          <van-button type="primary" block native-type="submit">登录</van-button>
        </div>
      </van-form>
      <login-role-select :role-object="state.roleObject" />
    </div>
  </div>
</template>

<script>
import { provide, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/request/api'
import { dockingBind } from '@/request/docking_uri'
import LoginRoleSelect from '@/page/login/LoginRoleSelect'
import { Toast } from 'vant'
import { mobileResultCode, servModeCode } from '@/assets/js/common'
import md5 from 'js-md5'

export default {
  components: {
    // 角色筛选组件
    LoginRoleSelect
  },
  setup () {
    const state = reactive({
      username: '',
      password: '',
      roleObject: {}
    })
    const selectorShow = ref(false)
    provide('selectorShow', selectorShow)
    const router = useRouter()
    const handleSubmit = function () {
      const servMode = sessionStorage.getItem('servMode')
      // 非三方绑定操作，进行用户登录操作
      if (servMode === servModeCode.SERV_MODE_BROWSER) {
        login({
          account: state.username,
          password: md5(state.password).toUpperCase()
          // password: state.password
        }).then(res => {
          handleResult(res)
        })
      } else {
        // 进行三方账号绑定操作
        dockingBind({
          account: state.username,
          password: md5(state.password).toUpperCase(),
          bindUserId: sessionStorage.getItem('bindUserId')
        }).then(res => {
          handleResult(res)
        })
      }
    }
    const handleResult = (result) => {
      if (result.body.code.indexOf(mobileResultCode.SUCCESS) >= 0) {
        if (result.body.code === mobileResultCode.NO_JURISDICTION) {
          Toast('无访问权限')
          return false
        }
        if (result.body.code === mobileResultCode.NO_DATA) {
          Toast('用户名或密码错误，请重新输入')
          return false
        }
        sessionStorage.setItem('session_key', result.body.data.item.key)
        if (result.body.code !== mobileResultCode.NEED_ROLE_SELECT) {
          sessionStorage.setItem('session_model_authority', result.body.data.item.joinCheckModules)
          router.push('index')
          return
        }
        selectorShow.value = true
        state.roleObject = result.body.data.item.userGroups
      } else {
        Toast({ message: result.body.message })
      }
    }
    return {
      state,
      handleSubmit
    }
  }
}
</script>

<style scoped>
/* 最外层盒子 */
.g-container {
  width: 100%;
  height: 667px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: inherit;
  background-image: url("../../image/login/background_login.png");
}

.g-head {
  padding-top: 145px;
}

.g-logo {
  width: 84px;
  height: 84px;
  margin: 0 auto;
  background-size: cover;
  background-image: url("../../image/common/logo_company.png") !important;
}

.g-form {
  width: 315px;
  height: auto;
  margin: 87px auto 75px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 11px 12px 0 0 #77baf5;
}

.g-login {
  padding-top: 14px;
}

.s-login-icon {
  position: absolute;
  width: 16px;
  height: 16px;
  margin-top: 14px;
  margin-left: 14px;
  background-size: cover;
}

.s-icon-account {
  background-image: url("../../../public/static/image/login/icon_account.png");
}

.s-icon-password {
  background-image: url("../../../public/static/image/login/icon_password.png");
}

.s-icon-bg {
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

::v-deep(.van-popup.van-popup--center.van-toast.van-toast--middle.van-toast--text) {
  z-index: 99999;
}

._th_cover-all-show-time {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  font-weight: 900;
  font-size: 30px;
  color: #4f4f4f;
  background-color: rgba(0, 0, 0, 0.1);
}

body {
  background: #2494f2;
}
</style>
