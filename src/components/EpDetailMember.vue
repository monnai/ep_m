<template>
  <div>
    <van-tab title="成员">
      <ul>
        <template v-for="item in dataArray" :key="item.name">
          <div class="van-cell van-cell--center van-cell--borderless van-contact-card van-contact-card--edit">
            <i class="van-badge__wrapper van-icon van-icon-contact van-cell__left-icon"></i>
            <div class="van-cell__value van-cell__value--alone van-contact-card__value">
              <div>{{item.v1}} ({{item.v2}})</div>
              <div>{{item.v3}} {{item.v4}}</div>
            </div>
          </div>
        </template>
      </ul>
    </van-tab>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
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
</style>
