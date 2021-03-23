<!--模块图标组件-->
<template>
  <van-swipe class="my-swipe" indicator-color="#1989fa" lazy-render>
    <template v-for="index of Math.ceil(menuData.length / 6)" :key="index">
      <van-swipe-item>
        <van-grid :column-num="3" :icon-size="45" :clickable="true" :border="true">
          <template v-for="menu in menuData.slice((index-1)* 6, (index-1)*6 +6)" :key="menu.name">
            <van-grid-item :icon="menu.icon" :text="menu.title" :to="menu.router" :badge="menu.badge"
                           @click="toList(menu)"/>
          </template>
        </van-grid>
      </van-swipe-item>
    </template>
  </van-swipe>
</template>

<script>
import { menu, todoCount } from '@/request/api'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { setSessionStorage } from '@/util/storageUtil'

export default {
  setup () {
    const menuData = ref([])
    const loadMenu = () => {
      // if (sessionStorage.getItem('session_model_authority')) {
      // todo: 1 加入用户权限筛选  2 加入状态管理，记录用户当前浏览的swiper序号返回后继续展示
      menuData.value = menu()
      todoCount().then(res => {
        const resData = res.body.data
        for (let i = 0; i < menuData.value.length; i++) {
          if (resData[menuData.value[i].name]) {
            menuData.value[i].badge = resData[menuData.value[i].name]
          }
        }
      })
      // }
    }
    const router = useRouter()
    const toList = (menu) => {
      // 模块接口前缀
      setSessionStorage('apiPrefix', menu.apiPrefix)
      // 详情页路由
      setSessionStorage('detailRouter', menu.router[1])
      router.push(menu.router[0])
    }
    loadMenu()
    return {
      menuData,
      loadMenu,
      toList
    }
  }
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}

.van-swipe.my-swipe {
  min-height: 200px;
  background: white;
}
</style>
