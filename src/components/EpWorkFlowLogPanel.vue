<template>
  <van-popup teleport="body" v-model:show="state">
    <div class="ep-workflow-panel-wrapper">
      <div class="ep-workflow-panel-icon">
        <img src="xx"/>
        <div>{{学校通过}}</div>
      </div>
      <div class="ep-workflow-panel-content">
        <van-steps direction="vertical" :active="0">
          <van-step>
            <h3>【城市】物流状态1</h3>
            <p>2016-07-12 12:40</p>
          </van-step>
          <van-step>
            <h3>【城市】物流状态2</h3>
            <p>2016-07-11 10:00</p>
          </van-step>
          <van-step>
            <h3>快件已发货</h3>
            <p>2016-07-10 09:30</p>
          </van-step>
        </van-steps>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const state = ref(false)
    const show = () => {
      state.value = true
    }
    return {
      state,
      show
    }
  }
}
</script>

<style>
.ep-workflow-panel-wrapper {
  width: 297px;
  height: 475px;
}
</style>
