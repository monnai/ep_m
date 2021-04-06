<!--首页代办标题显示-->
<template>
  <!--标题-->
  <div class="ep_todo_title_wrapper">
    <img class="ep_todo_icon" :src="require('../../../public/static/image/icon_clock.png')" alt="代办"/>
    <span class="ep_todo_title">{{title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {

  }
}
</script>

<style scoped>
.ep_todo_title_wrapper {
  padding: 3px;
  background: white;
  vertical-align: middle;
  display: flex;
}

.ep_todo_icon {
  height: 15px;
  width: 15px;
  margin-left: 12px;
  margin-right: 4px;
  vertical-align: middle;
}

.ep_todo_title {
  font-size: 13px;
  font-weight: bold;
  color: #2494F2;
  vertical-align: middle;
}
</style>
