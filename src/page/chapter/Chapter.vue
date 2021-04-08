<!--纵向项目列表-->
<template>
  <div>
    <!--吸顶处理表头和搜索域-->
    <van-sticky>
      <ep-nav-bar/>
    </van-sticky>
    <!--列表滚动区域-->
    <ep-list :callback="callback"/>
  </div>
</template>

<script>
import EpNavBar from '@/components/EpNavBar'
import EpList from '@/components/EpList'

export default {
  components: {
    EpNavBar,
    EpList
  },
  setup () {
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
          [currentData.createUserName, currentData.unitId],
          [currentData.createDate, currentData.checkStatus])
        const resultObj = Object()
        // 列表数据内容的标题
        resultObj.title = currentData.name
        // 当前数据的id
        resultObj.id = currentData.id
        resultObj.dataArray = dataArray
        resultObj.checkStatus = currentData.checkStatus
        stateList.push(resultObj)
      }
    }
    return {
      callback
    }
  }
}
</script>
