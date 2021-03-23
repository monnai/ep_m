<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="纵向项目"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight">
        <template #right>
          <van-icon name="wap-home-o" size="18"/>
        </template>
      </van-nav-bar>
      <van-search v-model="name" placeholder="项目名称/编号" show-action>
        <template #action>
          <div>
            <span @click="onSearch">搜索</span>
          </div>
        </template>
      </van-search>
      <ep-screen ref="epScreen" :begin="begin" :end="end"/>
      <zx-project-total-bar :total="total"/>
    </van-sticky>
    <ep-list :request="loadFn" ref="list"/>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, provide } from 'vue'
import ZxProjectTotalBar from '@/page/zxProject/ZxProjectTotalBar'
import EpScreen from '@/components/EpScreen'
import EpList from '@/components/EpList'
import { getListByModel } from '@/request/api'
import { dateFormat } from '@/util/formatUtil'

export default {
  components: {
    ZxProjectTotalBar,
    EpScreen,
    EpList
  },
  setup () {
    const name = ref('')
    const total = ref()
    const list = ref()
    const begin = ref()
    const end = ref()
    provide('begin', begin)
    provide('end', end)
    // 子组件记录基本的total finish等 父组件记录 筛选条件
    const loadFn = (state) => {
      getListByModel({
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        name: name.value,
        begin: dateFormat(begin.value),
        end: dateFormat(end.value)
      }).then(res => {
        if (res.body.code === '200') {
          const totals = res.body.data.totals
          const data = res.body.data.items
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
      // todo
      list.value.onRefresh()
    }
    const router = useRouter()
    const onClickLeft = () => {
      router.go(-1)
    }
    const onClickRight = () => {
      router.push('/index')
    }
    return {
      name,
      total,
      onClickLeft,
      onClickRight,
      loadFn,
      onSearch,
      list,
      begin,
      end
    }
  }
}
</script>

<style scoped>
.total {
  background: white;
}
</style>
