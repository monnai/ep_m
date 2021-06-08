<template>
  <!--来款信息-->
  <!--来款信息-->
  <van-cell-group title="来款信息">
    <van-cell title="来款单位" is-link :value="incomeState.choose.incomeUnit"
              @click="incomeState.show = !incomeState.show"/>
    <!--对冲号-->
    <van-field label="对冲号" v-model="incomeState.choose.dch" readonly/>
    <!--来款时间-->
    <van-field label="来款时间" v-model="incomeState.choose.incomeDate" readonly/>
    <!--来款金额-->
    <van-field label="来款金额" v-model="incomeState.choose.feeValue" readonly/>
    <!--可领金额-->
    <van-field label="可领金额" v-model="incomeState.choose.notClaimFee" readonly/>
  </van-cell-group>
  <van-popup v-model:show="incomeState.show" teleport="body" :style="{ height: '70%', width: '80%' }">
    <div class="incomeSelector-panel">
      <van-search :show-action="true" v-model="incomeState.searchKey" placeholder="请输入到账编号或名称" background="#FFFFFF">
        <template #action>
          <div class="van-search__action" role="button" @click="loadIncome">搜索</div>
        </template>
      </van-search>
      <van-list>
        <div class="search-list">
          <template v-for="(item) in incomeState.list" :key="item.id">
            <div class="van-cell-group van-hairline--top-bottom">
              <div class="van-cell van-cell--clickable ep-list-search-cell" role="button" tabindex="0"
                   @click="doIncomeChoose(item)">
                <div class="van-cell__title ">
                  <div class="search_list_wrap">
                    <div class="ep-cell__title">{{item.incomeUnit}}</div>
                    <div class="ep-cell__content">
                      <div><span>内冲号：</span><span> {{item.dch}}</span></div>
                      <div><span>总金额：</span><span>{{item.feeValue}}万元</span></div>
                      <div><span>可认领：</span><span>{{item.notClaimFee}}万元</span></div>
                      <div><span>来款时间:</span><span>{{item.incomeDate}}</span></div>
                    </div>
                  </div>
                </div>
                <i class="van-badge__wrapper van-icon van-icon-arrow van-cell__right-icon"></i>
              </div>
            </div>
          </template>
        </div>
      </van-list>
    </div>
  </van-popup>
</template>

<script>
import { reactive } from 'vue'
import { income } from '@/request/api'
import VueEvent from '@/model/event'

export default {
  setup () {
    // 公司筛选字段状态
    const incomeState = reactive({
      // 搜索是否展示
      show: false,
      // 搜索框条件
      searchKey: '',
      // 搜索结果
      list: [],
      // 被选中入账数据
      choose: {
        incomeUnit: '请选择',
        dch: '-',
        incomeDate: '-',
        feeValue: '-',
        notClaimFee: '-',
        unitId: '-',
        id: ''
      }
    })
    // 请求入账信息列表接口
    const loadIncome = () => {
      income(incomeState.searchKey).then(res => {
        incomeState.list = []
        const resData = res.body.data
        for (let i = 0; i < resData.length; i++) {
          incomeState.list.push({
            note: resData[i].note, // 摘要
            dch: resData[i].dch, // 内冲号
            incomeUnit: resData[i].incomeUnit, // 来款单位
            incomeDate: resData[i].incomeDate, // 来款时间
            feeValue: resData[i].feeValue, // 来款金额
            notClaimFee: resData[i].notClaimFee, // 可认金额
            id: resData[i].id // 到账id
          })
        }
      })
    }
    // 选择入账信息
    const doIncomeChoose = (item) => {
      debugger
      // 当次选中的是上次所选的入账
      if (item.id !== incomeState.choose.id) {
        incomeState.choose = item
        incomeState.show = !incomeState.show
        incomeChanged(item.id)
      }
    }
    const incomeChanged = (id) => {
      debugger
      VueEvent.emit('incomeChanged', id)
    }
    return {
      incomeState,
      loadIncome,
      doIncomeChoose
    }
  }
}
</script>

<style scoped>
::v-deep(.van-search.van-search--show-action) {
  position: sticky;
  top: -1px;
  z-index: 9999;
  background: rgb(255, 255, 255);
}
</style>
