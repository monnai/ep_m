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
import { zxProject } from '@/request/api'

export default {
  components: {
    ZxProjectTotalBar,
    EpScreen,
    EpList
  },
  setup () {
    const name = ref('')
    const total = '22'
    const list = ref()
    const begin = ref(new Date())
    const end = ref(new Date())
    provide('begin', begin)
    provide('end', end)
    // const epScreen = ref()
    // 子组件记录基本的total finish等 父组件记录 筛选条件
    const loadFn = async function (state) {
      const result = await zxProject({
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        name: name.value,
        begin: begin.value.getFullYear(),
        end: end.value.getFullYear()
      })
      if (result.body.code === '200') {
        const total = result.body.data.totals
        const data = result.body.data.items
        state.total = total
        // 数据个性化处理
        for (let i = 0; i < data.length; i++) {
          const dataNode = {
            v1: '',
            v2: '',
            v3: '',
            v4: '',
            v5: ''
          }
          dataNode.v1 = data[i].chargerName
          dataNode.v2 = data[i].createUserName
          dataNode.v3 = data[i].unitId
          dataNode.v4 = data[i].createDate
          dataNode.checkStatus = data[i].checkStatus
          state.list.push(dataNode)
        }
      }
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

<style></style>
