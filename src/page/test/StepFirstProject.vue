<template>
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
    <percent-bar/>
    <van-field label="入账信息" v-model="projectState.choose.availableFee" readonly/>
    <van-field label="所属单位" v-model="projectState.choose.unitId" readonly/>
  </van-cell-group>
  <van-popup v-model:show="projectState.show" teleport="body" :style="{ height: '70%', width: '80%' }">
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
</template>

<script>
import PercentBar from '@/page/test/PercentBar'
import { Toast } from 'vant'
import { incomeProject } from '@/request/api'
import { reactive } from 'vue'
import VueEvent from '@/model/event'
export default {
  components: {
    PercentBar
  },
  setup () {
    // 公司筛选列表状态
    const projectState = reactive({
      // 搜索条件
      searchKey: '',
      // 弹出层展示标识
      show: false,
      // 列表数据
      list: [],
      cwIncomeId: '',
      projectId: '',
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
      debugger
      if (!projectState.cwIncomeId) {
        Toast('请先选择入账')
        return false
      }
      projectState.show = !projectState.show
    }
    // 请求经费项目查询接口
    const loadProject = () => {
      incomeProject(projectState.cwIncomeId, projectState.searchKey).then(res => {
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
      projectState.projectId = item.id
      projectState.show = false
    }
    // 其他组件通知
    VueEvent.on('incomeChanged', (id) => {
      debugger
      projectState.cwIncomeId = id
    })
    return {
      projectState,
      openProjectSelector,
      loadProject,
      doProjectChoose
    }
  }
}
</script>

<style scoped>
</style>
