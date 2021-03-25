<template>
  <svg :fill="iconColor" class="svg-icon">
    <use :xlink:href="iconNameCp"/>
  </svg>
</template>
<script>
export default {
  name: 'svgIcon',
  props: {
    iconName: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      default: '#ffffff'
    }
  },
  computed: {
    iconNameCp () {
      return `#icon-${this.iconName}`
    }
  }
}
</script>
