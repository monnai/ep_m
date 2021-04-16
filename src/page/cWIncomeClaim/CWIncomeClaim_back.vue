<!--【经费认领】-添加页面-->
<template>
  <van-sticky>
    <!--页头-->
    <van-nav-bar :title="title" left-arrow @click-left="goBack" @click-right="toIndex">
      <!--右侧插槽-->
      <template #right>
        <van-icon name="wap-home-o" size="18"/>
      </template>
    </van-nav-bar>
  </van-sticky>
  <!--经费认领表单-->
  <div class="cwIncome-wrap">
    <!--来款信息-->
    <van-cell-group title="来款信息">
      <!--来款单位-->
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
    <!--项目信息-->
    <van-cell-group title="项目信息">
      <!--项目名称-->
      <van-cell title="项目名称" is-link :value="projectState.choose.name"
                @click="openProjectSelector"/>
      <!--负责人-->
      <van-field label="负责人" v-model="projectState.choose.chargerName" readonly/>
      <!--项目性质-->
      <van-field label="项目性质" v-model="projectState.choose.projectType" readonly/>
      <!--项目金额-->
      <van-field label="项目分类" v-model="projectState.choose.projectClass" readonly/>
      <!--可领金额-->
      <van-field label="合同金额" v-model="projectState.choose.feeValue" readonly/>
      <van-field label="入账信息" v-model="projectState.choose.availableFee" readonly/>
      <van-field label="所属单位" v-model="projectState.choose.unitId" readonly/>
    </van-cell-group>
    <!--认领信息-->
    <van-cell-group title="认领信息">
      <!--可认领限制-->
      <van-field label="认领金额" placeholder="输入认领金额（万元）" type="number" v-model="submitState.claimFee" required/>
      <!--来款类型-->
      <van-field label="来款类型">
        <template #input>
          <van-radio-group direction="horizontal" v-model="submitState.incomeType">
            <van-radio name="direct">直接经费</van-radio>
            <van-radio name="indirect">间接经费</van-radio>
            <van-radio name="mixed">混合经费</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!--是否外拨-->
      <van-field label="是否外拨">
        <template #input>
          <van-switch v-model="submitState.haveOutBoundFee" size="20px" active-value="1" inactive-value="0"/>{{submitState.haveOutBoundFee === '1'? '是': '否'}}
        </template>
      </van-field>
      <van-field label="经办人" placeholder="输入经办人" v-model="submitState.transactor" @focusin="upFrame" @focusout="rollBackFrame"/>
      <van-field label="经办人手机" placeholder="输入经办人手机" v-model="submitState.transactorPhone"/>
    </van-cell-group>
  </div>
  <!--经费认领表单结束-->
  <van-tabbar active-color="#000" inactive-color="#000">
    <van-tabbar-item>
      <van-button icon="checked" type="primary" block @mousedown="doSubmit()">
        提交
      </van-button>
    </van-tabbar-item>
  </van-tabbar>
  <!--入账信息选择弹出层-->
  <van-popup v-model:show="incomeState.show" teleport="body">
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
  <!--项目信息选择弹出层-->
  <van-popup v-model:show="projectState.show" teleport="body">
    <div class="projectSelector-panel">
      <van-search :show-action="true" v-model="projectState.searchKey" placeholder="请输入项目名称或编号" background="#FFFFFF">
        <template #action>
          <div class="van-search__action" role="button" @click="loadProject">搜索</div>
        </template>
      </van-search>
      <div class="search-list">
        <van-list>
          <div>
            <template v-for="(item) in projectState.list" :key="item.id">
              <div class="van-cell-group van-hairline--top-bottom">
                <div class="van-cell van-cell--clickable ep-list-search-cell" role="button" tabindex="0"
                     @click="doProjectChoose(item)">
                  <div class="van-cell__title">
                    <div class="search_list_wrap">
                      <div class="ep-cell__title">{{item.name}}</div>
                      <div><span>项目编号： {{item.code}}</span></div>
                      <div>
                        <span>负责人：{{item.chargerName}}</span>
                      </div>
                    </div>
                  </div>
                  <i class="van-badge__wrapper van-icon van-icon-arrow van-cell__right-icon">
                  </i></div>
              </div>
            </template>
          </div>
        </van-list>
      </div>
    </div>
  </van-popup>
  <!--提交结果弹出层-->
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { income, fundClaimFormSubmit, incomeProject } from '@/request/api'
import { Toast } from 'vant'
import { upFrame, rollBackFrame } from '@/assets/js/common'

let cwIncomeId = ''
let projectId = ''
export default {
  setup () {
    const router = useRouter()
    // 页头标题
    const title = sessionStorage.getItem('modelName')
    // 回退方法
    const goBack = () => {
      router.go(-1)
    }
    // 跳转首页
    const toIndex = () => {
      router.push('index')
    }
    // 入账相关
    const { incomeState, loadIncome, doIncomeChoose } = incomeSelector()
    // 项目相关
    const { projectState, openProjectSelector, loadProject, doProjectChoose } = projectSelector()
    // 表单相关
    const { submitState, doSubmit } = fundClaimForm()
    return {
      // 页头相关
      title,
      goBack,
      toIndex,
      // 入账相关
      incomeState,
      loadIncome,
      doIncomeChoose,
      // 项目相关
      projectState,
      openProjectSelector,
      loadProject,
      doProjectChoose,
      // 表单相关
      submitState,
      doSubmit,
      upFrame,
      rollBackFrame
    }
  }
}

/**
 * 入账筛选
 */
function incomeSelector () {
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
      unitId: '-'
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
    incomeState.choose = item
    cwIncomeId = item.id
    incomeState.show = !incomeState.show
  }
  return {
    incomeState,
    loadIncome,
    doIncomeChoose
  }
}

/**
 * 项目筛选
 */
function projectSelector () {
  // 公司筛选列表状态
  const projectState = reactive({
    // 搜索条件
    searchKey: '',
    // 弹出层展示标识
    show: false,
    // 列表数据
    list: [],
    // 选中项目信息
    choose: {
      name: '请选择',
      chargerName: '-',
      projectType: '-',
      projectClass: '-',
      feeValue: '-',
      availableFee: '-'
    }
  })
  const openProjectSelector = () => {
    if (!cwIncomeId) {
      Toast('请先选择入账')
      return false
    }
    projectState.show = !projectState.show
  }
  // 请求经费项目查询接口
  const loadProject = () => {
    incomeProject(cwIncomeId, projectState.searchKey).then(res => {
      projectState.list = []
      const resData = res.body.data
      for (let i = 0; i < resData.length; i++) {
        projectState.list.push({
          name: resData[i].name, // 项目名称
          code: resData[i].code, // 项目编号
          chargerName: resData[i].chargerName, // 负责人
          projectClass: resData[i].projectClass, // 项目性质
          projectType: resData[i].projectType, // 项目分类
          feeValue: resData[i].feeAuthorize, // 合同金额 todo 少字段 220.0万元（其中计划外拨 20.0万元，已外拨0.74万元）
          availableFee: resData[i].availableFee, // 入账信息  已入账4笔，合计3.49万元。未入账216.51万元
          unitId: resData[i].unitId, // 所属单位
          id: resData[i].id // 到账id
        })
      }
    })
  }
  const doProjectChoose = (item) => {
    projectState.choose = item
    projectId = item.id
    projectState.show = false
  }
  return {
    projectState,
    openProjectSelector,
    loadProject,
    doProjectChoose
  }
}

/**
 * 经费认领表单
 */
function fundClaimForm () {
  const submitState = reactive({
    // 认领经费
    claimFee: '',
    // 入账类型
    incomeType: 'direct',
    // 有无外拨经费
    haveOutBoundFee: 0,
    // 经办人
    transactor: '',
    // 经办人手机号
    transactorPhone: ''
  })
  // 经费认领表单提交
  const doSubmit = () => {
    if (!cwIncomeId) {
      Toast('请选择来款信息')
      return false
    } else if (!projectId) {
      Toast('请选择项目信息')
      return false
    } else if (!submitState.claimFee) {
      Toast('请输入认领金额')
      return false
    }
    fundClaimFormSubmit(Object.assign(submitState, {
      projectId: projectId,
      cwIncomeId: cwIncomeId
    })).then(res => {
      if (res.body.code === '200') {
        Toast({
          message: '提交成功',
          icon: 'checked'
        })
      } else {
        Toast(res.body.message)
      }
    })
  }
  return {
    submitState,
    doSubmit
  }
}
</script>

<style scoped>
.incomeSelector-panel {
  width: 297px;
  height: 475px;
  box-sizing: border-box;
}

.projectSelector-panel {
  width: 297px;
  height: 475px;
  box-sizing: border-box;
}

.cwIncome-wrap {
  margin-bottom: 46px;
}

::v-deep(.van-cell-group__title) {
  color: #969799;
  font-size: 12px;
  text-align: left;
  background: #F7F7F7FF;
}

::v-deep(.van-field__label ) {
  font-size: 14px;
  color: #222222FF;
  font-weight: bold;
}

::v-deep(.van-field__control ) {
  color: #999999FF;
  font-size: 14px;
  text-align: right;
}

::v-deep(.van-tabbar-item__text) {
  width: 100%;
}

::v-deep(.van-button) {
  color: white;
  background: rgb(25 137 250);
  border-color: rgb(25 137 250);
}

::v-deep(.van-cell.van-cell--clickable) {
  text-align: left;
  font-size: 14px;
  font-weight: bold;
}

::v-deep(.van-radio) {
  margin-left: auto;
}

::v-deep(.van-switch) {
  margin-left: auto;
}

::v-deep(.van-cell__value.van-cell__value--alone.van-field__value > div >input) {
  text-align: left;
}

.search_list_wrap {
  color: #666666FF;
  font-size: 12px

}

::v-deep(.van-cell__value.van-cell__value--alone.van-field__value) > div > input {
  text-align: left;
  font-size: 13px;
}

.search-list {
  height: 421px;
  overflow: scroll;
}

.ep-list-search-cell {
  box-shadow: 0 0 5px 0px #eeeeeeff;
}

.ep-cell__title {
  font-size: 14px;
  font-weight: bold;
  color: #222222FF;
  border-bottom: 1px solid #F3F3F3FF;
}

.ep-cell__content > div {
  /*width: 50%;*/
  /*float: left;*/
  font-size: 12px;
  color: #666666FF;
}

.ep-cell__content > div > span {
  width: 50%;
}

.ep-cell__content > div > span:nth-child(2) {
  text-align: right;
}
</style>
