<script setup lang="ts" name="Library">
import Experience from './Experience';
import { onMounted, onUnmounted, ref } from 'vue';

const threeContainer = ref<HTMLDivElement | null>(null)

let experience: Experience | null = null

onMounted(() => {
  if(!threeContainer.value) return
  experience = new Experience(threeContainer.value)
})

onUnmounted(() => {
  experience?.destroy()
  experience = null
})
</script>

<template>
  <div ref="threeContainer" class="container"></div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  overflow: hidden;
}

.container {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>
