<!--用户登录页面-->
<template>
  <div class="login-wrapper">
    <div class="login-slogan-wrapper">
      <div class="login-slogan"></div>
    </div>
    <div class="login-form">
      <van-form @submit="doLogin">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          left-icon="contact"
          placeholder="请输入用户名"
          clearable
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          left-icon="closed-eye"
          placeholder="请输入密码"
          clearable
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="login-btn-wrapper">
          <van-button type="primary" block @click="doLogin">登录</van-button>
        </div>
      </van-form>
      <login-role-select ref="roleSelect"/>
    </div>
  </div>
</template>

<script>
import { doLogin } from '@/request/api'
import { Toast } from 'vant'
import LoginRoleSelect from '@/page/login/LoginRoleSelect'

export default {
  data () {
    return {
      username: '',
      password: '',
      show: false,
      roleList: {}
    }
  },
  components: { LoginRoleSelect },
  methods: {
    doLogin () {
      const that = this
      doLogin({
        account: this.username,
        password: this.password
      }).then(result => {
        if (result.body.code === '200') {
          that.doCache(result.body.data)
          Toast({
            message: result.body.message,
            duration: 1,
            forbidClick: true
          })
          if (result.body.message !== '登录成功,需要选择登陆角色！') {
            that.$router.push('index')
            return
          }
          that.roleList = result.body.data.userGroups
          that.$refs.roleSelect.show = true
          that.$refs.roleSelect.roleList = result.body.data.userGroups
        } else {
          Toast({
            message: result.body.message,
            duration: 1000,
            forbidClick: true
          })
        }
      })
    },
    doCache (loginData) {
      if (loginData.key) {
        sessionStorage.setItem('session_key', loginData.key)
      }
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
  /*margin-top: 145 px;*/
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
  /*/ / width: 100 %;*/
  /*/ / height: 100 %;*/
  padding-top: 36px;
  /*/ / margin: 16 px;*/
}

form.van-form {
  padding: 24px;
}
</style>
