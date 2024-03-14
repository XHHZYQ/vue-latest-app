<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <RouterView #default="{ Component }">
    <keep-alive :include="['school', 'create']">
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>

<style scoped>
</style>
