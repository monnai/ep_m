<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="纵向项目"
        left-text="返回"
        right-text="首页"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <van-icon name="wap-home-o" size="18"/>
        </template>
      </van-nav-bar>
      <van-search v-model="name" placeholder="项目名称/编号"/>
      <van-dropdown-menu>
        <van-dropdown-item v-model="state.value1" :options="option1"/>
        <van-dropdown-item v-model="state.value2" :options="option2"/>
        <van-dropdown-item v-model="state.value3" :options="option3"/>
      </van-dropdown-menu>
      <zx-project-total-bar :total="total"/>
    </van-sticky>

    <ep-list/>
  </div>
</template>

<script>
// import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import ZxProjectTotalBar from '@/page/zxProject/ZxProjectTotalBar'
import EpList from '@/components/EpList'

export default {
  components: {
    ZxProjectTotalBar,
    EpList
  },
  setup () {
    const name = ''
    const total = '22'
    const state = reactive({
      value1: 0,
      value2: 'a',
      value3: 'b'
    })
    const option1 = [
      {
        text: '排序',
        value: 0
      },
      {
        text: '全部商品',
        value: 0
      },
      {
        text: '新款商品',
        value: 1
      },
      {
        text: '活动商品',
        value: 2
      }
    ]
    const option2 = [
      {
        text: '年份',
        value: 'a'
      },
      {
        text: '好评排序',
        value: 'b'
      },
      {
        text: '销量排序',
        value: 'c'
      }
    ]
    const option3 = [
      {
        text: '筛选',
        value: 'a'
      },
      {
        text: '好评排序',
        value: 'b'
      },
      {
        text: '销量排序',
        value: 'c'
      }
    ]
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
      state,
      option1,
      option2,
      option3,
      onClickLeft,
      onClickRight
    }
  }
}
</script>

<style></style>
