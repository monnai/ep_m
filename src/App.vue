<template>
  <router-view/>
</template>

<script>
import * as echarts from 'echarts'
import { provide, onMounted } from 'vue'
import { initConfig } from '@/assets/js/initConfig'
export default {
  name: 'App',
  components: {},
  setup () {
    onMounted(() => {
      // 注入echarts
      provide('echarts', echarts)
      // 初始化全局配置
      initConfig()
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
