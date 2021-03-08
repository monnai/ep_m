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
          <!--          <van-button-->
          <!--            round block type="info" native-type="submit"-->
          <!--          >登录-->
          <!--          </van-button>-->
          <van-button type="primary" block>登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    doLogin (values) {
      console.log(values)
    }
  }
}
</script>

<style >
.login-wrapper {
  width: 375px;
  height: 667px;
  display: block;
  background-image: url("../../image/login/background_login.png");
  background-size: cover;
  background-position: bottom 0px right -194px;
  background-repeat: no-repeat;
}

.login-slogan-wrapper {
  padding-top: 145px;
}

.login-slogan {
  //margin-top: 145px;
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
  //width: 100%;
  //height: 100%;
  padding-top: 36px;
  //margin: 16px;
}
form.van-form {
  padding: 24px;
}
</style>
