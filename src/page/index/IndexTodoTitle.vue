<template>
  <!--标题-->
  <div class="ep_todo_title_wrapper">
    <img class="ep_todo_icon" src="/static/image/icon_clock.png" alt="代办"/>
    <span class="ep_todo_title">代办事项</span>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.ep_todo_title_wrapper {
  height: 22px;
  text-align: left;
  background: white;
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
