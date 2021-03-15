<!--用户登录页面-->
<template>
  <div class="login-wrapper">

    <!--公司图标-->
    <div class="login-slogan-wrapper">
      <div class="login-slogan"></div>
    </div>

    <!--登录信息填写表单-->
    <div class="login-form">
      <van-form @submit="doLogin">

        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          left-icon="contact"
          placeholder="请输入用户名"
          clearable
          :rules="[{ required: true, message: '请填写用户名' }]"/>

        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          left-icon="closed-eye"
          placeholder="请输入密码"
          clearable
          :rules="[{ required: true, message: '请填写密码' }]"/>

        <!--登录按钮-->
        <div class="login-btn-wrapper">
          <van-button type="primary" block @click="doLogin">登录</van-button>
        </div>
      </van-form>
      <login-role-select ref="roleSelect"/>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { Login } from '@/request/api'
import LoginRoleSelect from '@/page/login/LoginRoleSelect'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: { LoginRoleSelect },

  setup () {
    const username = ref()
    const password = ref()
    let roleList = {}

    const router = useRouter()
    const roleSelect = ref()

    const doLogin = function () {
      Login({
        account: username.value,
        password: password.value
      }).then(result => {
        if (result.body.code === '200') {
          doCache(result.body.data.key)
          Toast({
            message: result.body.message,
            duration: 1,
            forbidClick: true
          })
          if (result.body.message !== '登录成功,需要选择登陆角色！') {
            router.push('index')
            return
          }
          roleList = result.body.data.userGroups
          roleSelect.value.show = true
          roleSelect.value.roleList = result.body.data.userGroups
        } else {
          Toast({
            message: result.body.message,
            duration: 1000,
            forbidClick: true
          })
        }
      })
    }

    const doCache = function (key) {
      if (key) {
        sessionStorage.setItem('session_key', key)
      }
    }
    return {
      username,
      password,
      roleList,
      doLogin,
      doCache,
      roleSelect
    }
  }
}
</script>

<style>
.login-wrapper {
  width: 375px;
  height: 667px;
  display: block;
  background-image: url("../../image/login/background_login.png");
  background-size: cover;
  background-position: bottom 0 right -194px;
  background-repeat: no-repeat;
}

.login-slogan-wrapper {
  padding-top: 145px;
}

.login-slogan {
  margin-left: 146px;
  width: 84px;
  height: 84px;
  background-image: url("../../image/common/logo_company.png");
  background-size: cover;
}

.login-form {
  width: 315px;
  height: 280px;
  margin-left: 25px;
  margin-top: 87px;
  background: #ffffff;
}

.login-btn-wrapper {
  padding-top: 36px;
}

.van-form {
  padding: 24px;
}
</style>
