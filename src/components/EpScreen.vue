<!--筛选条件-->
<template>
  <van-dropdown-menu>
    <!--    <van-button @click="test"></van-button>-->
    <van-dropdown-item :title="beginTitle">
      <van-datetime-picker
        v-model="begin"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :showToolbar="false"
        @change="beginChange"
      />
    </van-dropdown-item>
    <!--    :showToolbar="false"-->
    <van-dropdown-item :title="endTitle">
      <van-datetime-picker
        v-model="end"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :showToolbar="false"
        @change="endChange"
      />
    </van-dropdown-item>
    <van-dropdown-item title="筛选" ref="item">
      <div class="content">
        <div class="search-header"></div>
        <div class="search-detail-wrapper">
          <div v-for="(criteriaArray ,criteriaName ) in criteria" :key="criteriaName">
            <!--搜索项-->
            <!--            <div class="search-detail-title">{{criteriaName | formatCriteriaName}}</div>-->
            <div class="search-detail-title">{{formatCriteria(criteriaName)}}</div>
            <!--筛选项-->
            <div class="search-detail-content">
              <ul class="criteriaUl">
                <li v-for="(item,index) in criteriaArray" :key="item.value" class="criteriaLi">
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
import { ref, inject, onBeforeUpdate, onMounted } from 'vue'
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
    const beginTitle = ref('开始时间')
    const endTitle = ref('结束时间')
    const begin = inject('begin')
    const end = inject('end')
    const beginChange = (value) => {
      beginTitle.value = dateFormat(value)
    }
    const endChange = (value) => {
      endTitle.value = dateFormat(value)
    }
    const checked = ref([])
    const checkboxRefs = ref([])
    const checkboxGroup = ref(null)
    const toggle = (index) => {
      checkboxRefs.value[index].toggle()
    }
    onBeforeUpdate(() => {
      checkboxRefs.value = []
    })
    const checkAll = () => {
      checkboxGroup.value.toggleAll(true)
    }
    const toggleAll = () => {
      checkboxGroup.value.toggleAll()
    }
    const changeChosen = (typeCode, index) => {
      criteria.value[typeCode][index].chosen = !criteria.value[typeCode][index].chosen
    }
    const clearChosen = () => {
      const criteriaValue = criteria.value
      for (const k in criteriaValue) {
        criteriaValue[k + ''].filter((c) => {
          c.chosen = false
        })
      }
      begin.value = null
      end.value = null
      beginTitle.value = '开始时间'
      endTitle.value = '结束时间'
    }
    const criteria = ref({})
    const getCriteriaString = () => {
      debugger
      const result = {}
      for (const k in criteria.value) {
        const currentArray = []
        // criteriaCopy[k + ''] = criteriaCopy[k + ''].toLocaleString()
        criteria.value[k + ''].filter((c) => {
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
          criteria.value.checkStatus = flatValue
        }
        criteria.value.joinType = [{
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
      minDate: new Date(1999, 0, 1),
      maxDate: new Date(2025, 10, 1),
      beginTitle,
      endTitle,
      beginChange,
      endChange,
      changeChosen,
      begin,
      end,
      criteria,
      checkAll,
      toggleAll,
      clearChosen,
      toggle,
      checked,
      checkboxRefs,
      getCriteriaString
    }
  }
}
</script>
<style scoped>

.criteriaLi {
  float: left;
  display: contents;
}

.criteriaUl {
  padding: 10px;
  text-align: left;
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

::v-deep(.van-button--normal) {
  font-size: 12px;
  padding: 12px;
  height: 26px;
}

.clear {
  float: left;
  background: rgb(36 148 242);
  color: white;
  font-weight: bold;
}

.choose {
  width: 50%;
  float: left;
  background: #1989fa;
  color: white;
  font-weight: bold;
}

.active {
  color: white;
  background: #2494f2;
}
</style>
