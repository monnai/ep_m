<!--模块图标组件-->
<template>
  <van-swipe class="my-swipe" indicator-color="#1989fa" lazy-render :initial-swipe="swiperIndex" @change="onChange">
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
import { ref, onMounted } from 'vue'
import { getSessionStorage, setSessionStorage } from '@/util/storageUtil'

export default {
  setup () {
    // 菜单数据数组
    const menuData = ref([])
    // 请求菜单接口，进行菜单相关数据绑定
    const loadMenu = () => {
      // if (sessionStorage.getItem('session_model_authority')) {
      // todo: 1 加入用户权限筛选  2 加入状态管理，记录用户当前浏览的swiper序号返回后继续展示
      menuData.value = menu()
      todoCount().then(res => {
        const resData = res.body.data.item
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
      // 设置模块接口前缀
      setSessionStorage('apiPrefix', menu.apiPrefix)
      // 设置详情页路由地址
      setSessionStorage('detailRouter', menu.router[1])
      setSessionStorage('modelName', menu.title)
      router.push(menu.router[0])
    }
    const swiperIndex = getSessionStorage('swiperIndex')
    const onChange = (index) => {
      sessionStorage.setItem('swiperIndex', index)
    }
    // 组件加载事件
    onMounted(() => {
      loadMenu()
    })
    return {
      menuData,
      toList,
      onChange,
      swiperIndex
    }
  }
}
</script>

<style scoped>
::v-deep(.my-swipe .van-swipe-item ) {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}

::v-deep(.van-swipe.my-swipe) {
  min-height: 200px;
  background: white;
}
</style>
