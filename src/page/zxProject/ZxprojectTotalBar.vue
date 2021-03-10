<template>
  <div class="total">
    共({{total}})条
  </div>
</template>

<script>
export default {
  props: {
    total: String
  },
  setup () {
  }
}
</script>

<style>
.total {
  font-size: 11px;
  color: #999999;
  text-align: left;
  margin-left: 12px;
}

</style>
