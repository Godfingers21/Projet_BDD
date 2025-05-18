<template>
  <div class="header-image" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
</template>

<script>
export default {
  name: 'HeaderImage',
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.header-image {
  height: 300px;
  background-color: aqua;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
