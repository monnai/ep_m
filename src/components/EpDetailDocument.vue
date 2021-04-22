<template>
  <div class="main-wrap">
    <van-tab title="文档">
      <template v-if="resArray.length===0">
        <van-empty image="default" description="未上传文档"/>
      </template>
      <template v-for="item in resArray" :key="item.name">
        <van-cell :title="item.v1" center>
          <template #icon>
            <ep-svg-icon class="icon" :icon-name="item.v3"></ep-svg-icon>
          </template>
          <template #label>
            {{item.v2}}
          </template>
          <template #right-icon>
            <div @click="selectedId=item.v0">
              <ep-pop-over :actions="actions" :on-select="callbackPopover"></ep-pop-over>
            </div>
          </template>
        </van-cell>
      </template>
    </van-tab>
  </div>
</template>

<script>
import { ref } from 'vue'
import EpSvgIcon from '@/components/EpSvgIcon'
import EpPopOver from '@/components/EpPopOver'
import { getFileServer } from '@/assets/js/common'

export default {
  components: {
    EpSvgIcon,
    EpPopOver
  },
  props: {
    request: {
      type: Function,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const resArray = ref([])
    const empty = ref(false)
    const load = () => {
      props.request().then(res => {
        props.callback(res, resArray.value, empty.value)
      })
    }
    const selectedId = ref()
    load()
    const actions = [
      {
        text: '下载',
        icon: 'down'
      }
      // {
      //   text: '转发',
      //   icon: 'share'
      // }
    ]
    const doDownLoad = (id) => {
      var a = document.createElement('a')
      a.id = 'test'
      a.href = getFileServer() + '?fId=' + id + '&token-key=' + sessionStorage.getItem('session_key')
      document.getElementsByTagName('body')[0].append(a) // 修复firefox中无法触发click
      a.click()
      document.getElementById('test').remove()
    }
    const doShare = () => {

    }
    const callbackPopover = (id) => {
      switch (id.text) {
        case '下载':
          doDownLoad(selectedId.value)
          break
        case '转发':
          doShare(selectedId.value)
          break
        default:
          break
      }
    }
    return {
      resArray,
      callbackPopover,
      actions,
      selectedId,
      empty
    }
  }
}
</script>

<style scoped>
::v-deep(.van-cell__title ) {
  margin-right: 20px;
}

svg.svg-icon.icon {
  width: 80px;
  height: 55px;
}
::v-deep(.van-tab__pane, .van-tab__pane-wrapper) {
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 55px;
}
</style>
