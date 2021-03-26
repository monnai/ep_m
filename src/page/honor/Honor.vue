<!--获奖列表页面-->
<template>
  <div>
    <!--吸顶： 列表页头，搜索栏进行吸顶处理-->
    <van-sticky>
      <!--页头-->
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight">
        <!--页头右侧按钮-->
        <template #right>
          <van-icon name="wap-home-o" size="18"/>
        </template>
      </van-nav-bar>
      <!--搜索条件-->
      <van-search v-model="name" placeholder="项目名称/编号" show-action>
        <!--搜索动作区域-->
        <template #action>
          <div>
            <span @click="onSearch">搜索</span>
          </div>
        </template>
      </van-search>
      <!--筛选：包括开始时间、结束时间、条件筛选-->
      <ep-screen ref="epScreen" :begin="begin" :end="end"/>
      <!--总计-->
      <ep-total-bar :total="total"/>
    </van-sticky>
    <ep-list :request="epListRequest" ref="listRef"/>
  </div>
</template>

<script>
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import EpScreen from '@/components/EpScreen'
import EpTotalBar from '@/components/EpTotalBar'
import EpList from '@/components/EpList'
import { getListByModel } from '@/request/api'
import { dateFormat } from '@/util/formatUtil'
import { mobileResultCode } from '@/assets/js/common'

export default {
  components: {
    EpScreen,
    EpTotalBar,
    EpList
  },
  setup () {
    // 搜索输入框
    const name = ref()
    // 总计组件记录总数
    const total = ref()
    // list组件的引用
    const listRef = ref()
    // 开始时间
    const begin = ref()
    // 结束时间
    const end = ref()
    const title = sessionStorage.getItem('modelName')
    provide('begin', begin)
    provide('end', end)
    // 子组件记录基本的total finish等 父组件记录 筛选条件
    const epListRequest = (state) => {
      getListByModel({
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        name: name.value,
        begin: dateFormat(begin.value),
        end: dateFormat(end.value)
      }).then(res => {
        if (res.body.code === mobileResultCode.SUCCESS) {
          const totals = res.body.data.totals
          const data = res.body.data.item
          state.total = totals
          total.value = res.body.data.totals + ''
          // 数据个性化处理
          for (let i = 0; i < data.length; i++) {
            const dataNode = {
              v0: data[i].id,
              v1: data[i].name,
              v2: data[i].createUserName,
              v3: data[i].unitId,
              v4: data[i].createDate,
              v5: data[i].checkStatus
            }
            state.list.push(dataNode)
          }
          state.pageNo++
          state.loading = false
          if (state.list.length >= state.total) {
            state.finished = true
          }
        }
      })
    }
    const onSearch = () => {
      listRef.value.onRefresh()
    }
    const router = useRouter()
    const onClickLeft = () => {
      router.go(-1)
    }
    const onClickRight = () => {
      router.push('/index')
    }
    return {
      title,
      name,
      total,
      begin,
      end,
      onClickLeft,
      onClickRight,
      epListRequest,
      onSearch,
      listRef
    }
  }
}
</script>

<style scoped>

</style>
