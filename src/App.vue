<template>
  <router-view/>
</template>

<script>
import * as echarts from 'echarts'
import { provide } from 'vue'
import { doInitConfig } from '@/assets/js/initConfig'

export default {
  name: 'App',
  components: {},
  setup () {
    provide('echarts', echarts)
    doInitConfig()
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
