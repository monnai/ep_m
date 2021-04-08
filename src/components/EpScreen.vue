<!--筛选条件-->
<template>
  <van-dropdown-menu>
    <van-dropdown-item :title="state.beginText">
      <van-datetime-picker
        v-model="state.begin"
        type="date"
        :min-date="state.minDate"
        :max-date="state.maxDate"
        :showToolbar="false"
        @change="beginChange"
      />
    </van-dropdown-item>
    <van-dropdown-item :title="state.endText">
      <van-datetime-picker
        v-model="state.end"
        type="date"
        :min-date="state.minDate"
        :max-date="state.maxDate"
        :showToolbar="false"
        @change="endChange"
      />
    </van-dropdown-item>
    <van-dropdown-item title="筛选" ref="item">
      <div class="content">
        <div class="search-header"></div>
        <div class="search-detail-wrapper">
          <div v-for="(criteriaArray ,criteriaName ) in state.criteria" :key="criteriaName">
            <!--搜索项-->
            <div class="search-detail-title">{{formatCriteria(criteriaName)}}</div>
            <!--筛选项-->
            <div class="search-detail-content">
              <ul class="criteria">
                <li v-for="(item,index) in criteriaArray" :key="item.value" class="criteria_content">
                  <van-button :class="{ 'active': item.chosen }" @click="changeChosen(criteriaName,index)">{{item.text}}
                  </van-button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="search-footer">
          <van-button block @click="clearChosen()" class="clear">
            清空
          </van-button>
        </div>
      </div>
    </van-dropdown-item>
  </van-dropdown-menu>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { category } from '@/request/api'
import { dateFormat } from '@/util/formatUtil'

export default {
  computed: {
    formatCriteria () {
      return (criteriaCode) => {
        switch (criteriaCode) {
          case 'joinType':
            return '参与形式'
          case 'checkStatus':
            return '审核状态'
          default:
            return criteriaCode
        }
      }
    }
  },
  setup () {
    const state = reactive({
      // 开始时间数据绑定
      begin: null,
      // 结束时间数据绑定
      end: null,
      // 开始时间，默认状态显示
      beginText: '开始时间',
      // 结束时间，默认状态显示
      endText: '结束时间',
      // 存放筛选组件checkbox选中状态
      checkboxRefs: [],
      // 存放筛选组件当前选中结果
      criteria: {},
      checked: [],
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2025, 10, 1)
    })
    // 开始选择器change事件
    const beginChange = (value) => {
      debugger
      state.beginText = dateFormat(value)
    }
    // 结束选择器change事件
    const endChange = (value) => {
      state.endText = dateFormat(value)
    }
    // 筛选组件选中状态改变
    const changeChosen = (typeCode, index) => {
      state.criteria[typeCode][index].chosen = !state.criteria[typeCode][index].chosen
    }
    // 清空筛选条件
    const clearChosen = () => {
      state.begin = null
      state.end = null
      state.beginText = '开始时间'
      state.endText = '结束时间'
      const criteriaValue = state.criteria
      for (const k in criteriaValue) {
        criteriaValue[k + ''].filter((c) => {
          c.chosen = false
        })
      }
    }
    // 提供给父组件，用于获取时间和筛选项选中的对象，转换为查询用参数
    const getQueryParams = () => {
      return Object.assign(getCriteriaString(), getDateString())
    }
    const getDateString = () => {
      return {
        beginDate: dateFormat(state.begin),
        endDate: dateFormat(state.end)
      }
    }
    const getCriteriaString = () => {
      const result = {}
      for (const k in state.criteria) {
        const currentArray = []
        state.criteria[k + ''].filter((c) => {
          // 如果选中状态
          if (c.chosen) {
            currentArray.push(c.value)
          }
        })
        if (currentArray.length > 0) {
          result[k + ''] = currentArray.toLocaleString()
        }
      }
      return result
    }
    // dom加载后，调用接口，进行页面渲染
    onMounted(() => {
      category().then(res => {
        for (const k in res.body.data.item) {
          const flatValue = []
          for (let i = 0; i < res.body.data.item[k + ''].length; i++) {
            const flatNode = {}
            flatNode.text = res.body.data.item[k + ''][i].name
            flatNode.value = res.body.data.item[k + ''][i].code
            flatNode.chosen = false
            flatValue.push(flatNode)
          }
          state.criteria.checkStatus = flatValue
        }
        state.criteria.joinType = [{
          text: '主持',
          value: '0',
          chosen: false
        },
        {
          text: '参与',
          value: '1',
          chosen: false
        }]
      })
    })

    return {
      state,
      beginChange,
      endChange,
      changeChosen,
      clearChosen,
      getQueryParams
    }
  }
}
</script>
<style scoped>

.criteria {
  padding: 10px;
  text-align: left;
  display: table;
}
.criteria_content {
  float: left;
  display: table;
  padding: 5px;
}
.search-detail-title {
  padding: 6px 0 6px 0;
  background: #f7f8fa;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  color: #323233;
  width: 100%;
  text-indent: 12px;
}

.clear {
  float: left;
  background: rgb(36 148 242);
  color: white;
  font-weight: bold;
}

::v-deep(.van-button--normal) {
  font-size: 12px;
  padding: 12px;
  height: 26px;
}

::v-deep(.choose) {
  width: 50%;
  float: left;
  background: #1989fa;
  color: white;
  font-weight: bold;
}

::v-deep(.active) {
  color: white;
  background: #2494f2;
}

.search-footer {
  position: relative;
  display: inline-table;
}

::v-deep(.van-button--normal) {
  border-radius: 5px;
}

.content {
  background: #f7f7f7;
}

</style>
