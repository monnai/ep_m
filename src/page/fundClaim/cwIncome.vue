<!--经费认领添加页面-->
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
    </van-sticky>
    <!--经费认领表单-->
    <div class="cwIncome-wrap">
      <!--来款信息-->
      <van-cell-group title="来款信息">
        <!--来款单位-->
        <van-cell title="来款单位" is-link :value="incomeState.choose.incomeUnit" @click="incomeState.show = !incomeState.show" />
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
        <van-cell title="项目名称" is-link :value="projectState.choose.name" @click="projectState.show = !projectState.show" />
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
        <van-field label="认领金额" placeholder="输入认领金额（万元）" v-model="incomeFormField.claimFee"/>
        <!--直接经费间接经费混合经费-->
        <!--来款类型-->
        <van-field label="来款类型">
          <template #input>
            <van-radio-group  v-model="incomeFormField.incomeType">
              <van-radio name="direct">直接经费</van-radio>
              <van-radio name="indirect">间接经费</van-radio>
              <van-radio name="mixed">混合经费</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!--是否外拨-->
        <van-field label="是否外拨">
          <template #input>
            <van-radio-group  v-model="incomeFormField.haveOutBoundFee">
              <van-radio name="1">是</van-radio>
              <van-radio name="0">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field label="经办人" placeholder="输入经办人" v-model="incomeFormField.transactor"/>
        <van-field label="经办人手机" placeholder="输入经办人手机" v-model="incomeFormField.transactorPhone"/>
      </van-cell-group>
    </div>
    <!--经费认领表单结束-->
    <van-tabbar active-color="#000" inactive-color="#000">
      <van-tabbar-item>
        <van-button icon="checked" type="primary" block @click="doIncomeFormSubmit()">
          提交
        </van-button>
      </van-tabbar-item>
    </van-tabbar>
    <!--入账信息选择弹出层-->
    <van-popup v-model:show="incomeState.show" teleport="body">
      <div class="incomeSelector-panel">
        <van-search :show-action="true" v-model="incomeState.searchKey">
          <template #action>
            <van-button @click="loadCompany">搜索</van-button>
          </template>
        </van-search>
        <van-list :finished="incomeState.finished" finished-text="">
          <div>
            <van-cell-group v-for="(item) in incomeState.list" :key="item.id">
              <van-cell is-link @click="doIncomeChoose(item)">
                <template #title>
                  <div>{{item.incomeUnit}}</div>
                  <div><span>摘要：{{item.note}}</span><span>内冲号： {{item.dch}}</span></div>
                  <div>
                    <span>来款金额：{{item.feeValue}}</span>
                    <span>可认金额：{{item.notClaimFee}}</span>
                  </div>
                  <div>
                    <span>来款时间:{{item.incomeDate}}</span>
                  </div>
                </template>
              </van-cell>
            </van-cell-group>
          </div>
        </van-list>
      </div>
    </van-popup>
    <!--项目信息选择弹出层-->
    <van-popup v-model:show="projectState.show" teleport="body">
      <div class="projectSelector-panel">
        <van-search :show-action="true" v-model="projectState.searchKey">
          <template #action>
            <van-button @click="loadProject">搜索</van-button>
          </template>
        </van-search>
        <van-list>
          <div>
            <van-cell-group v-for="(item) in projectState.list" :key="item.id">
              <van-cell is-link @click="doProjectChoose(item)">
                <template #title>
                  <div>{{item.name}}</div>
                  <div><span>{{item.name}}</span><span>内冲号： {{item.dch}}</span></div>
                  <div>
                    <span>来款金额：{{item.feeValue}}</span>
                    <span>可认金额：{{item.notClaimFee}}</span>
                  </div>
                  <div>
                    <span>来款时间:{{item.incomeDate}}</span>
                  </div>
                </template>
              </van-cell>
            </van-cell-group>
          </div>
        </van-list>
      </div>
    </van-popup>
    <!--提交结果弹出层-->
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { income, incomeFormSubmit, incomeProject } from '@/request/api'
// 公司名称选择器
export default {
  setup () {
    // 属性
    const router = useRouter()
    const title = sessionStorage.getItem('modelName')
    const projectSelectorShow = ref(false)
    // 方法
    const onClickLeft = () => {
      router.go(-1)
    }
    const onClickRight = () => {
      router.push('index')
    }
    const handleSubmit = () => {
    }
    const { incomeState, loadCompany, doIncomeChoose } = companySelector()
    const { projectState, loadProject, doProjectChoose } = projectSelector()
    const { incomeFormField, doIncomeFormSubmit } = incomeForm()
    return {
      title,
      projectSelectorShow,
      onClickLeft,
      onClickRight,
      handleSubmit,
      incomeState,
      loadCompany,
      doIncomeChoose,
      // 项目筛选
      projectState,
      loadProject,
      doProjectChoose,
      incomeFormField,
      doIncomeFormSubmit
    }
  }
}
let incomeId = ''
let projectId = ''

function companySelector () {
  // 公司筛选列表状态
  const incomeState = reactive({
    searchKey: '',
    companyName: '',
    show: false,
    list: [],
    choose: {
      incomeUnit: '',
      dch: '-',
      incomeDate: '-',
      feeValue: '-',
      notClaimFee: '-',
      unitId: '-'
    }
  })
  const loadCompany = () => {
    income(incomeState.searchKey).then(res => {
      incomeState.list = []
      incomeState.loading = false
      incomeState.finished = false
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
  const doIncomeChoose = (item) => {
    incomeState.choose = item
    incomeId = item.id
    incomeState.show = !incomeState.show
  }
  return {
    incomeState,
    loadCompany,
    doIncomeChoose
  }
}

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
      chargerName: '-',
      projectType: '-',
      projectClass: '-',
      feeValue: '-',
      availableFee: '-'
    }
  })
  // 请求项目查询接口
  const loadProject = () => {
    incomeProject(incomeId, projectState.searchKey).then(res => {
      projectState.list = []
      projectState.loading = false
      projectState.finished = false
      const resData = res.body.data
      for (let i = 0; i < resData.length; i++) {
        projectState.list.push({
          name: resData[i].name, // 项目名称
          projectCode: resData[i].name, // 项目编号
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
    loadProject,
    doProjectChoose
  }
}

// cwIncomeId & projectId & claimFee & incomeType & haveOutboundFee & transactor & transactorPhone
function incomeForm () {
  const incomeFormField = reactive({
    // 认领经费
    claimFee: '',
    // 入账类型
    incomeType: '',
    // 有无外拨经费
    haveOutBoundFee: '',
    // 经办人
    transactor: '',
    // 经办人手机号
    transactorPhone: ''
  })
  // 经费认领表单提交
  const doIncomeFormSubmit = () => {
    incomeFormSubmit(Object.assign(incomeFormField, {
      projectId: projectId,
      incomeId: incomeId
    })).then(res => {
      debugger
    })
  }
  return {
    incomeFormField,
    doIncomeFormSubmit
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
</style>
