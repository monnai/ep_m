<!--&lt;!&ndash;项目入账列表页面&ndash;&gt;-->
<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash;吸顶： 列表页头，搜索栏进行吸顶处理&ndash;&gt;-->
<!--    <van-sticky>-->
<!--      &lt;!&ndash;页头&ndash;&gt;-->
<!--      <van-nav-bar-->
<!--        :title="title"-->
<!--        left-arrow-->
<!--        @click-left="onClickLeft"-->
<!--        @click-right="onClickRight">-->
<!--        &lt;!&ndash;页头右侧按钮&ndash;&gt;-->
<!--        <template #right>-->
<!--          <van-icon name="wap-home-o" size="18"/>-->
<!--        </template>-->
<!--      </van-nav-bar>-->
<!--      &lt;!&ndash;搜索条件&ndash;&gt;-->
<!--      <van-search v-model="name" placeholder="项目名称/编号" show-action>-->
<!--        &lt;!&ndash;搜索动作区域&ndash;&gt;-->
<!--        <template #action>-->
<!--          <div>-->
<!--            <span @click="onSearch">搜索</span>-->
<!--          </div>-->
<!--        </template>-->
<!--      </van-search>-->
<!--      &lt;!&ndash;筛选：包括开始时间、结束时间、条件筛选&ndash;&gt;-->
<!--      <ep-screen ref="epScreen" :begin="begin" :end="end"/>-->
<!--      &lt;!&ndash;总计&ndash;&gt;-->
<!--      <ep-total-bar :total="total"/>-->
<!--    </van-sticky>-->
<!--    <ep-list :request="epListRequest" ref="listRef"/>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { ref, provide } from 'vue'-->
<!--import { useRouter } from 'vue-router'-->
<!--import EpScreen from '@/components/EpScreen'-->
<!--import EpTotalBar from '@/components/EpTotalBar'-->
<!--import EpList from '@/components/EpList'-->
<!--import { getListByModel } from '@/request/api'-->
<!--import { dateFormat } from '@/util/formatUtil'-->
<!--import { mobileResultCode } from '@/assets/js/common'-->

<!--export default {-->
<!--  components: {-->
<!--    EpScreen,-->
<!--    EpTotalBar,-->
<!--    EpList-->
<!--  },-->
<!--  setup () {-->
<!--    // 搜索输入框-->
<!--    const name = ref()-->
<!--    // 总计组件记录总数-->
<!--    const total = ref()-->
<!--    // list组件的引用-->
<!--    const listRef = ref()-->
<!--    // 开始时间-->
<!--    const begin = ref()-->
<!--    // 结束时间-->
<!--    const end = ref()-->
<!--    const title = sessionStorage.getItem('modelName')-->
<!--    provide('begin', begin)-->
<!--    provide('end', end)-->
<!--    // 子组件记录基本的total finish等 父组件记录 筛选条件-->
<!--    const epListRequest = (state) => {-->
<!--      getListByModel({-->
<!--        pageNo: state.pageNo,-->
<!--        pageSize: state.pageSize,-->
<!--        name: name.value,-->
<!--        begin: dateFormat(begin.value),-->
<!--        end: dateFormat(end.value)-->
<!--      }).then(res => {-->
<!--        if (res.body.code === mobileResultCode.SUCCESS) {-->
<!--          const totals = res.body.data.totals-->
<!--          const data = res.body.data.item-->
<!--          state.total = totals-->
<!--          total.value = res.body.data.totals + ''-->
<!--          // 数据个性化处理-->
<!--          for (let i = 0; i < data.length; i++) {-->
<!--            const dataNode = {-->
<!--              // 经费认领id-->
<!--              v0: data[i].id,-->
<!--              // 对冲号-->
<!--              v1: data[i]['cWIncome.dch'],-->
<!--              // 项目名称-->
<!--              v2: data[i]['vproject.name'],-->
<!--              // 负责人-->
<!--              v3: data[i].feeChargerName,-->
<!--              // 认领金额-->
<!--              v4: '认领：' + data[i].claimFee + '万元',-->
<!--              v5: data[i].checkStatus-->
<!--            }-->
<!--            state.list.push(dataNode)-->
<!--          }-->
<!--          state.pageNo++-->
<!--          state.loading = false-->
<!--          if (state.list.length >= state.total) {-->
<!--            state.finished = true-->
<!--          }-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--    const onSearch = () => {-->
<!--      listRef.value.onRefresh()-->
<!--    }-->
<!--    const router = useRouter()-->
<!--    const onClickLeft = () => {-->
<!--      router.go(-1)-->
<!--    }-->
<!--    const onClickRight = () => {-->
<!--      router.push('/index')-->
<!--    }-->
<!--    return {-->
<!--      title,-->
<!--      name,-->
<!--      total,-->
<!--      begin,-->
<!--      end,-->
<!--      onClickLeft,-->
<!--      onClickRight,-->
<!--      epListRequest,-->
<!--      onSearch,-->
<!--      listRef-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
<!--项目入账列表-->
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
          [currentData.claimerName, '认领：' + currentData.claimFee + '万元'],
          [currentData.checkStatus])
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
    return {
      callback
    }
  }
}
</script>
