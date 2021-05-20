import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from './route'
// 有赞Vant UI插件
import Vant from 'vant'
import 'vant/lib/index.css'
import '@vant/touch-emulator'
// axios请求封装
import './request/api'
// 公共css样式
import '@/assets/css/common.css'
// 移动端自适应插件
import 'lib-flexible'
const app = createApp(App)
app.use(Vant).use(router)
// 让icons/svg下面的图片自动导入
const req = require.context('@/assets/img/icons', false, /\.svg$/)
req.keys().map(req)
app.mount('#app')
