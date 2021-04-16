<!--用户登录页面-->
<template>
  <div id="test">
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input/>xxxxx
    <input class="xxx"/>xxxxx
    <input class="xxx"/>xxxxx
  </div>
</template>
<script>
const inputUp = (ele) => {
  // 安卓机型，自动上滑露出输入框
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  if (isAndroid) {
    const domList = document.getElementsByClassName(ele)
    for (let i = 0; i < domList.length; i++) {
      domList[i].addEventListener('focusin', () => {
        document.getElementById('app').style.height = document.getElementById('app').offsetHeight + 300 + 'px'
        window.scrollTo(0, 999999)
      })
      domList[i].addEventListener('focusout', () => {
        document.getElementById('app').style.height = document.getElementById('app').offsetHeight - 300 + 'px'
      })
    }
  }
}
export default {
  mounted () {
    inputUp('xxx')
  },
  setup () {
    return {
    }
  }

}
</script>
