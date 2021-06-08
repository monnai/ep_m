<template>
  <van-sticky offset-top="44px">
    <!--搜索条件-->
    <van-search v-model="state.name" :placeholder="placeholder" show-action>
      <!--搜索动作区域-->
      <template #action>
        <div>
          <span @click="doSearch">搜索</span>
        </div>
      </template>
    </van-search>
    <!--筛选：包括开始时间、结束时间、条件筛选-->
    <ep-screen ref="screen" v-model:begin="state.begin" v-model:end="state.end"/>
    <!--总计-->
    <ep-total-bar :total="state.total"/>
  </van-sticky>
  <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      :finished-text="state.list.length===0?'无数据':'没有更多了'"
      @load="onLoad">
      <div>
        <van-cell-group v-for="(dataObject) in state.list" :key="dataObject.id">
          <van-cell is-link @click="toDetail(dataObject.id)">
            <template #title>
              <div class="ep-list-wrapper">
                <div class="ep-list-title">
                  <van-tag :color="computeExtraColor(dataObject.checkStatus)" size="large" plain>
                    {{dataObject.checkStatus}}
                  </van-tag>
                  <span>{{dataObject.title}}</span>
                </div>
                <div class="ep-list-content">
                  <ul gutter="0" v-for="dataArray in dataObject.dataArray" :key="dataArray">
                    <li :span="24 / dataArray.length" v-for="(childData, index) in dataArray"
                        :class="index !== dataArray.length-1? 'right_border':''"
                        :key="childData">{{childData}}
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <template #icon>
            </template>
            <template #right-icon>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import EpScreen from '@/components/EpScreen'
import EpTotalBar from '@/components/EpTotalBar'
import { getListByModel } from '@/request/api'
import { dateFormat } from '@/util/formatUtil'
import { mobileResultCode } from '@/assets/js/common'

export default {
  components: {
    EpScreen,
    EpTotalBar
  },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: '请输入名称/编号'
    },
    /**
     * 列表数据请求方法，非必传，默认调用api中getListByModel
     */
    request: {
      type: Function,
      required: false,
      default: getListByModel
    },
    /**
     * 回调函数，用于不同接口数据集的个性化处理，必传
     */
    callback: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const router = useRouter()
    const screen = ref()
    const state = reactive({
      total: 0,
      list: [],
      pageNo: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      refreshing: false,
      name: '',
      begin: '',
      end: ''
    })

    const onLoad = () => {
      if (state.refreshing) {
        state.list = []
        state.refreshing = false
      }
      props.request(Object.assign({
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        name: state.name,
        beginDate: dateFormat(state.begin),
        endDate: dateFormat(state.end)
      }, screen.value.getQueryParams())).then(res => {
        if (res.body.code === mobileResultCode.SUCCESS) {
          state.total = parseInt(res.body.data.totals)
          state.pageNo++
          state.loading = false
          // 判断当前集合中数据，若等于最大值，停止加载更多
          props.callback(res.body.data.item, state.list)
          if (state.list.length >= state.total) {
            state.finished = true
          }
        }
      })
    }

    const onRefresh = () => {
      // 清空列表数据
      state.finished = false
      state.refreshing = true
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true
      state.pageNo = 1
      onLoad()
    }

    const toDetail = (itemId) => {
      sessionStorage.setItem('itemId', itemId)
      router.push(sessionStorage.getItem('detailRouter'))
    }

    const computeExtraColor = (checkStatus) => {
      switch (checkStatus) {
        case '科研处通过':
          return '#1dc791'
        case '科室通过':
          return '#1dc791'
        case '学校通过':
          return '#1dc791'
        case '学院通过':
          return '#1dc791'
        case '科研处退回':
          return '#ee3845'
        case '科室退回':
          return '#ee3845'
        case '已提交':
          return '#ffc24b'
        case '已作废':
          return '#999999'
        default :
          return '#999999'
      }
    }

    const doSearch = () => {
      onRefresh()
    }
    return {
      state,
      screen,
      onLoad,
      onRefresh,
      doSearch,
      toDetail,
      computeExtraColor
    }
  }
}
</script>

<style scoped>
.ep-list-title {
  text-align: left;
}

::v-deep(.van-cell) {
  padding: 0;
}

::v-deep(.van-cell-group) {
  background-color: #fff;
  margin: 7px 12px 7px 12px;
  box-shadow: 0 0 20px 0 rgb(211 211 211 / 30%);
  border-radius: 7px;
}

::v-deep(span.van-tag.van-tag--mark.van-tag--default ) {
  width: 14px;
  margin-right: 9px;
}

.ep-list-wrapper > div {
  padding: 4px;
}

.ep-list-wrapper > div:nth-child(1) {
  /*border-bottom: 1px solid #f1f1f1;*/
  font-size: 16px;
  color: #333333;
  font-weight: bold;
}

.ep-list-wrapper > div:nth-of-type(n+2) {
  font-size: 13px;
  color: #666666;
  font-weight: lighter;
}

li {
  display: table-cell;
  padding-right: 11px;
  padding-left: 11px;
}

.right_border {
  border-right: 1px solid #8080801a;
}

::v-deep(span.van-tag) {
  margin: 11px 8px 2px 0
}

.ep-list-title {
  margin-left: 11px;
}

::v-deep(.van-search) {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0.26667rem 0.32rem;
  background-color: #F7F7F7;
}

::v-deep(.van-search .van-cell) {
  flex: 1;
  padding: 0.13333rem 0.21333rem 0.13333rem 0;
  background-color: #EAEAEA;
}

::v-deep(.van-search__content) {
  display: flex;
  flex: 1;
  padding-left: 0;
  background-color: #f7f8fa;
  border-radius: 2px;
}

::v-deep(.van-search .van-cell) {
  flex: 1;
  padding: 4px 0 4px 10px;
  background-color: #EAEAEA;
}

::v-deep(.van-picker) {
  position: relative;
  background-color: #eaeaea;
  -webkit-user-select: none;
  user-select: none;
}

::v-deep(.van-dropdown-menu__title::after) {
  position: absolute;
  top: 50%;
  right: -0.10667rem;
  margin-top: -0.13333rem;
  border: 3px solid;
  border-color: transparent transparent #9C9C9C #9C9C9C;
  transform: rotate(
    -45deg
  );
  opacity: .8;
  content: '';
}

::v-deep(.van-sticky.van-sticky--fixed) {
  background: #f7f7f7;
}

/*搜索域*/
::v-deep(.van-dropdown-menu__bar) {
  height: 32px;
  background-color: #f7f7f7;
  box-shadow: unset;
}
</style>
