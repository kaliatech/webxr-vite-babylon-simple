<script lang="ts" setup>
</script>
<template>
  <div class="container">
    <h1>WebXR Test 001</h1>
      <canvas ref="renderCanvas" class="renderCanvas"></canvas>
  </div>
</template>
<style scoped>
.container {
  align-content: center;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  left: 1rem;
  position: absolute;
  right: 1rem;
  top: 0;
}
.renderCanvas {
  flex: 1;
}
</style>
