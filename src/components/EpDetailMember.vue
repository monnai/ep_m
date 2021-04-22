<template>
  <div class="main-wrap">
    <van-tab title="成员">
      <template v-if="dataArray.length ===0">
        <van-empty image="default" description="未查询到成员信息"/>
      </template>
      <ul>
        <template v-for="item in dataArray" :key="item.name">
          <div class="van-cell">
            <div>
<!--              <ep-svg-icon :iconName="item.v5 === '女'? 'sex_woman' :'sex_man_professor'" icon-color="#2494f2"/>-->
              <ep-svg-icon iconName="member_message" icon-color="#2494f2"/>
            </div>
            <div>
              <div class="member-title">{{item.v1}} ({{item.v2}})</div>
              <div class="member-content">{{item.v3}} {{item.v4}}</div>
            </div>
          </div>
        </template>
      </ul>
    </van-tab>
  </div>
</template>

<script>
import { ref } from 'vue'
import EpSvgIcon from '@/components/EpSvgIcon'

export default {
  components: {
    EpSvgIcon
  },
  props: {
    request: Function,
    callback: Function
  },
  // v1: items[i].personName,
  // v2: items[i].personCode,
  // v3: items[i].titleId,
  // v4: items[i].bearTypeId
  setup (props) {
    const dataArray = ref([])
    const load = () => {
      props.request().then(res => {
        props.callback(res, dataArray.value)
      })
    }
    load()
    return {
      dataArray,
      load
    }
  }
}
</script>

<style scoped>
.van-cell__value.van-cell__value--alone.van-contact-card__value > div:nth-child(1) {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}

.van-cell__value.van-cell__value--alone.van-contact-card__value > div:nth-child(2) {
  font-size: 13px;
  font-weight: lighter;
  color: #666666;
}

.van-icon-contact::before {
  content: '\F03E';
  font-size: 25px;
  padding: 0 0 0 35px;
}

.van-contact-card::before {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 0.05333rem;
  background: repeating-linear-gradient(
    -45deg, #cecece 0, #e5e5e5 20%, transparent 0, transparent 25%, #eaeaea 0, #e2e2e2 45%, transparent 0, transparent 50%);
  background-size: 2.13333rem;
  content: '';
}

svg.svg-icon {
  height: 44px;
  width: 80px;
  margin-left: 35px;
}

.member-title {
  color: #333333FF;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
}

.member-content {
  color: #666666FF;
  font-size: 13px;
  font-weight: lighter;
  text-align: left;
}

::v-deep(.van-tab__pane, .van-tab__pane-wrapper){
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
}
::v-deep(.van-tab__pane, .van-tab__pane-wrapper) {
  padding-bottom: 44px;
}
</style>
