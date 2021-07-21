<template>
  <div>
    <!--吸顶处理-->
    <van-sticky>
      <ep-nav-bar/>
      <van-search v-model="searchModel" placeholder="搜索"/>
    </van-sticky>
    <!--列表滚动区域-->
    <van-tabs v-model:active="active" sticky offset-top="2.62667rem" animated>
      <van-tab title="可认领">
        <income-list/>
      </van-tab>
      <van-tab title="已认领">
        <incomed-list/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import EpNavBar from '@/components/EpNavBar'
import IncomeList from '@/page/cwIncome/IncomeList'
import IncomedList from '@/page/cwIncome/IncomedList'
import { ref } from 'vue'
import axios from 'axios'

export default {
  components: {
    EpNavBar,
    IncomeList,
    IncomedList
  },
  setup () {
    /**
     * 模拟接口请求，待接口修正后去除
     */
    const request = () => {
      return new Promise((resolve, reject) => {
        axios.get('http://172.16.1.150:8088/' + 'income/incomeList', {
          params: {},
          headers: {
            'token-key': sessionStorage.getItem('session_key')
              ? sessionStorage.getItem('session_key')
              : ''
          }
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err.data)
        })
      })
    }
    /**
     * 自定义查询结果数据的处理
     * @param data 查询结果
     * @param stateList 响应式数据集合，用户存放列表数据
     */
    const callback = (data, stateList) => {
      for (let i = 0; i < data.length; i++) {
        const currentData = data[i]
        // 2代表内容部分分两层显示（每一层之间能够换行）
        const dataArray = Array(2)
        dataArray.push(
          ['负责人：' + currentData.feeChargerName, '入账：' + currentData.incomeFee + '万元'],
          ['编号：' + currentData.feeCardNum, currentData.unitId])
        const resultObj = Object()
        // 列表数据内容的标题
        resultObj.title = currentData['vproject.name']
        // 当前数据的id
        resultObj.id = currentData.id
        resultObj.dataArray = dataArray
        resultObj.checkStatus = currentData.checkStatus
        stateList.push(resultObj)
      }
    }
    const active = ref(1)
    return {
      request,
      callback,
      active
    }
  }
}
</script>
