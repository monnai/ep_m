<template>
  <div class="ep-detail-panel-wrapper main-wrap">
    <van-tab title="基本">
      <template v-if="Object.keys(baseDataObject).length === 0">
        <van-empty image="default" description=""/>
      </template>
      <template v-for="(value, title) in baseDataObject" :key="title">
        <van-cell-group :title="title">
          <template v-for="item in value" :key="item.name">
            <van-cell :title="item.key" :value="item.value"></van-cell>
          </template>
        </van-cell-group>
      </template>
      <div>
      </div>
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
  setup (props) {
    const active = ref('1')
    const baseDataObject = ref({})
    const load = () => {
      props.request().then(res => {
        props.callback(res, baseDataObject.value)
      })
    }
    load()
    const refresh = () => {
      baseDataObject.value = {}
      load()
    }
    return {
      active,
      baseDataObject,
      refresh
    }
  }
}
</script>

<style scoped>
.custom-title {
  /*text-align: left;*/
  margin-right: 4px;
  vertical-align: middle;
}

.van-cell__title {
  font-size: 12px;
  color: #222222;
  text-align: left;
  margin-left: 33px;
  /* font-family: PingFang-SC-Bold; */
  width: 80px;
}

.van-cell__value {
  font-size: 14px;
  color: #222222;
  text-align: left;
  margin-left: 33px;
  /* font-family: PingFang-SC-Bold; */
  width: 223px;
}

.van-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0.266667rem 0.426667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.373333rem;
  line-height: 0.64rem;
  background-color: #fff;
}

.van-cell__title, .van-cell__value {
  flex: unset;
}

::v-deep(.van-tab__pane, .van-tab__pane-wrapper) {
  padding-bottom: 44px;
}
.van-cell-group__title {
  text-align: left;
  padding: 12px 25px 9px;
  background: #F7F7F7;
  color: #999999;
  font-size: 12px;
}
</style>
