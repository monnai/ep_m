<template>
  <div class="total">
    共({{total}})条
  </div>
</template>

<script>
export default {
  props: {
    total: Number
  },
  setup () {
  }
}
</script>

<style scoped>
.total {
  font-size: 12px;
  color: #adadad;
  text-align: left;
  background: #f7f7f7;
  padding: 0 0 6px 12px;
}
</style>
