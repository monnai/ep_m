<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="高校科研创新服务平台"
        :safe-area-inset-top="true">
      </van-nav-bar>
    </van-sticky>
    <div class="bind-wx-main-wrap">
      <div class="bind-tip">请绑定您的科研创新平台账号</div>
      <van-form @submit="doBindAccount">
        <van-field
          v-model="state.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()
    const state = reactive({
      username: '',
      password: ''
    })
    const doBindAccount = (values) => {
      console.log(values)
      router.push('index')
    }
    return {
      doBindAccount,
      state
    }
  }
}
</script>
<style scoped>

</style>
